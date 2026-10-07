import { readdir } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import { join } from 'node:path'

const findTests = async (directory) => {
  const files = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) {
      files.push(...await findTests(path))
    } else if (entry.name.endsWith('.test.js')) {
      files.push(path)
    }
  }
  return files.sort()
}

// Each file gets a fresh process, so a missing API does not hide other failures.
const audit = async (tape, env) => {
  const files = await findTests('tests')
  let passed = 0
  for (const file of files) {
    const result = await new Promise(resolve => {
      const child = spawn(process.execPath, [tape, file], { env })
      let output = ''
      child.stdout.on('data', data => { output += data })
      child.stderr.on('data', data => { output += data })
      const timeout = setTimeout(() => child.kill(), 30000)
      child.on('error', error => { output += error.message })
      child.on('close', code => {
        clearTimeout(timeout)
        resolve({ code, output })
      })
    })
    if (result.code === 0) {
      passed += 1
    } else {
      const details = result.output.split('\n').filter(line => /^(?:not ok |\w*Error:)/.test(line))
      console.log(`FAIL ${file}\n${details.join('\n') || 'Test process failed or timed out'}`) // eslint-disable-line no-console
    }
  }
  console.log(`\nTemporal compatibility audit: ${passed}/${files.length} files passed`) // eslint-disable-line no-console
  return passed === files.length ? 0 : 1
}

export default audit
