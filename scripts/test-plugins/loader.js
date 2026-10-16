import fs from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = fileURLToPath(new URL('../../plugins/', import.meta.url))
const extensions = { esm: 'mjs', cjs: 'cjs', umd: 'min.js' }
const extension = extensions[process.env.PLUGIN_FORMAT]

const resolve = async (specifier, context, nextResolve) => {
  const resolved = await nextResolve(specifier, context)
  if (!resolved.url.startsWith('file:')) {
    return resolved
  }
  const path = fileURLToPath(resolved.url)
  if (!path.startsWith(root)) {
    return resolved
  }
  const relative = path.slice(root.length).replaceAll('\\', '/')
  const match = relative.match(/^([^/]+)\/(?:src\/index\.js|builds\/spacetime-[^/]+\.(?:mjs|cjs|min\.js))$/)
  if (!match) {
    return resolved
  }
  const dir = `${root}${match[1]}`
  const pkg = JSON.parse(fs.readFileSync(`${dir}/package.json`, 'utf8'))
  if (!pkg.scripts.build) {
    return resolved
  }
  return { url: pathToFileURL(`${dir}/builds/${pkg.name}.${extension}`).href, shortCircuit: true }
}

const load = async (url, context, nextLoad) => {
  if (process.env.PLUGIN_FORMAT !== 'umd' || !url.startsWith(pathToFileURL(root).href) || !url.endsWith('.min.js')) {
    return nextLoad(url, context)
  }
  // Omit CommonJS globals so UMD executes its browser branch.
  const bundle = fs.readFileSync(new URL(url), 'utf8')
  const source = `
    import vm from 'node:vm'
    import spacetime from 'spacetime'
    const context = { spacetime }
    const keys = new Set(Object.keys(context))
    vm.compileFunction(${JSON.stringify(bundle)}, ['globalThis', 'self', 'module', 'exports', 'define'])(context, context)
    const name = Object.keys(context).find(key => !keys.has(key))
    export default context[name]
  `
  return { format: 'module', source, shortCircuit: true }
}

export { resolve, load }
