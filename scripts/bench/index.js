/* eslint-disable no-console */
import fs from 'node:fs'
import os from 'node:os'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import benchmark from './_lib.js'
import cases from './cases.js'

const root = fileURLToPath(new URL('../../', import.meta.url))
const resultsFile = new URL('./results.jsonl', import.meta.url)
const pkg = JSON.parse(fs.readFileSync(new URL('../../package.json', import.meta.url), 'utf8'))
const write = process.argv.includes('--write')
const useColor = Boolean(process.stdout.isTTY) && !Object.hasOwn(process.env, 'NO_COLOR')
const color = (code, text) => useColor ? `\u001b[${code}m${text}\u001b[0m` : text
// Increment when inputs, workloads, or scoring change.
const suiteVersion = 1
const environment = { node: process.version, platform: process.platform, arch: process.arch, cpu: os.cpus()[0]?.model }

const readPrevious = () => {
  if (!fs.existsSync(resultsFile)) {
    return null
  }
  const lines = fs.readFileSync(resultsFile, 'utf8').trim().split('\n').filter(Boolean)
  return lines.length ? JSON.parse(lines[lines.length - 1]) : null
}

const change = (before, after) => {
  const percent = 100 * (after / before - 1)
  if (Math.abs(percent) < 4) {
    return color(36, '● equal to last run')
  }
  if (percent > 0) {
    return color(32, `▲ ${percent.toFixed(2)}% faster`)
  }
  return color(31, `▼ ${Math.abs(percent).toFixed(2)}% slower`)
}

const metadata = async () => {
  const commit = execFileSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim()
  const dirty = Boolean(execFileSync('git', ['status', '--porcelain', '--untracked-files=normal'], {
    cwd: root, encoding: 'utf8',
  }).trim())
  // Match the min.js build without changing checked-in build artifacts.
  const { rollup } = await import('rollup')
  const { default: terser } = await import('@rollup/plugin-terser')
  const bundle = await rollup({ input: fileURLToPath(new URL('../../src/index.js', import.meta.url)) })
  const { output } = await bundle.generate({
    format: 'umd', name: 'spacetime', plugins: [terser()],
    banner: `/* spencermountain/${pkg.name} ${pkg.version} ${pkg.license} */`,
  })
  await bundle.close()
  return { commit, dirty, filesizeBytes: Buffer.byteLength(output[0].code) }
}

const previous = readPrevious()
const result = {
  timestamp: new Date().toISOString(), libraryVersion: pkg.version, suiteVersion, environment,
  ...benchmark(cases),
}
console.log(`${color(1, result.score.toFixed(2))} ${color(2, 'runs/sec')}`)
const comparable = previous?.suiteVersion === suiteVersion &&
  JSON.stringify(previous.environment) === JSON.stringify(environment)
if (!result.stable) {
  console.log(color(33, '◆ system too busy — try again'))
  console.log(color(2, 'not saved (unstable run)'))
  process.exitCode = 1
} else {
  if (comparable) {
    console.log(change(previous.score, result.score))
  } else {
    console.log(color(33, previous ? '◆ different environment or suite — comparison skipped' : '● baseline'))
  }
  if (write) {
    Object.assign(result, await metadata())
    fs.appendFileSync(resultsFile, `${JSON.stringify(result)}\n`)
    console.log(color(2, 'saved to scripts/bench/results.jsonl'))
  } else {
    console.log(color(2, 'not saved (use --write to profile and save)'))
  }
}
