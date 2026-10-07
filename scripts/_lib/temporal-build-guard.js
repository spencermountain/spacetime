import { relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { gzipSync } from 'node:zlib'

const root = fileURLToPath(new URL('../../', import.meta.url))
const maxBytes = 32 * 1024
const maxGzipBytes = 10 * 1024
const sharedFiles = ['src/fns.js', 'src/_version.js', 'src/methods/_lib/fractional.js']
const allowedDirectories = ['src/temporal/', 'src/input/', 'src/data/', 'src/methods/format/']

// Check all loaded modules, including imports later removed by tree shaking.
const guard = (limits = {}) => ({
  name: 'temporal-build-guard',
  buildEnd(error) {
    if (error) {
      return
    }
    for (const id of this.getModuleIds()) {
      if (this.getModuleInfo(id).isExternal) {
        this.error(`Temporal bundle cannot have external runtime dependencies: ${id}`)
      }
      const path = relative(root, resolve(id)).replaceAll('\\', '/')
      if (!sharedFiles.includes(path) && !allowedDirectories.some(directory => path.startsWith(directory))) {
        this.error(`Temporal bundle cannot include module: ${path}`)
      }
    }
  },
  generateBundle(_options, bundle) {
    const chunks = Object.values(bundle).filter(output => output.type === 'chunk')
    const bytes = chunks.reduce((total, output) => total + Buffer.byteLength(output.code), 0)
    const gzipBytes = chunks.reduce((total, output) => total + gzipSync(output.code).length, 0)
    const byteLimit = limits.maxBytes ?? maxBytes
    const gzipLimit = limits.maxGzipBytes ?? maxGzipBytes
    if (bytes > byteLimit || gzipBytes > gzipLimit) {
      this.error(`Temporal bundle size exceeded: ${bytes}/${byteLimit} bytes, ${gzipBytes}/${gzipLimit} gzip bytes`)
    }
  }
})

export default guard
