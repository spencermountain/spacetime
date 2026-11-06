// Tiny replacement for the `tape` CLI, which can only dynamic-import .js/.mjs files.
// usage:  node --import tsx tests/_lib/run.ts <file-or-dir> [...more]
//   - a directory is searched recursively for *.test.ts files (skipping tests/types, which `test:types` runs)
//   - a file is loaded as given (eg. a setup file, like tests/temporal/_require.ts)
import test from 'tape'
import { readdirSync, statSync } from 'node:fs'
import { join, resolve, sep } from 'node:path'
import { pathToFileURL } from 'node:url'

const findTests = (dir: string): string[] =>
  readdirSync(dir, { recursive: true })
    .map(f => join(dir, String(f)))
    .filter(f => f.endsWith('.test.ts') && !f.includes(`${sep}types${sep}`))
    .sort()

const files = process.argv.slice(2).flatMap(arg => {
  const path = resolve(arg)
  return statSync(path).isDirectory() ? findTests(path) : [path]
})

test.wait()
for (const file of files) {
  await import(pathToFileURL(file).href)
}
test.run()
