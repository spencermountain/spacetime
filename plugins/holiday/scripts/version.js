import fs from 'node:fs'

// Keep package metadata out of runtime imports.
const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
fs.writeFileSync(new URL('../src/_version.js', import.meta.url), `export default '${pkg.version}'\n`)
