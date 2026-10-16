import fs from 'node:fs'
import { createRequire } from 'node:module'

// Keep package metadata out of runtime imports.
const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
const require = createRequire(import.meta.url)
const lookup = require('@photostructure/tz-lookup/package.json')
const source = `const lookupVersion = '${lookup.version}'\nexport { lookupVersion }\nexport default '${pkg.version}'\n`
fs.writeFileSync(new URL('../src/_version.js', import.meta.url), source)
