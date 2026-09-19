import { spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { delimiter, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
const results = []
const env = {
  ...process.env,
  PATH: `${join(root, 'node_modules/.bin')}${delimiter}${process.env.PATH || ''}`,
  // npm's test scripts pipe TAP through a reporter. Preserve producer failures.
  SHELLOPTS: 'pipefail',
  npm_config_script_shell: '/bin/bash'
}
const log = (message) => process.stdout.write(`${message}\n`)
const color = process.env.NO_COLOR === undefined && (
  process.env.FORCE_COLOR !== undefined
    ? process.env.FORCE_COLOR !== '0'
    : process.stdout.isTTY && process.env.TERM !== 'dumb'
)

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: root,
    env,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    timeout: 10 * 60 * 1000,
    maxBuffer: 20 * 1024 * 1024
  })
  const output = [result.stdout, result.stderr].filter(Boolean).join('\n').trim()
  if (result.error) {
    throw new Error(`${command}: ${result.error.message}. This script installs nothing.\n${output}`)
  }
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} failed (${result.signal || result.status})\n${output}`)
  }
  return result.stdout
}

function check(name, action) {
  let passed = false
  try {
    action()
    passed = true
  } catch {
    // This is a compact smoke test; run the individual command for diagnostics.
  }
  results.push({ name, passed })
  const line = `${passed ? '✓' : '✗'} ${name}`
  log(color ? `\u001b[${passed ? 32 : 31}m${line}\u001b[0m` : line)
}

const registryArgs = ['--registry=https://registry.npmjs.org', '--fetch-retries=0', '--fetch-timeout=30000']
let latest

check('Version', () => {
  latest = JSON.parse(run('npm', ['view', pkg.name, 'version', '--json', ...registryArgs]))
  // This gate is for stable releases to master, not prerelease publishing.
  const stable = /^(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/
  if (!stable.test(pkg.version) || !stable.test(latest)) {
    throw new Error(`Expected stable major.minor.patch versions: local=${pkg.version}, npm=${latest}`)
  }
  const localParts = pkg.version.split('.').map(BigInt)
  const remoteParts = latest.split('.').map(BigInt)
  const difference = localParts.findIndex((part, i) => part !== remoteParts[i])
  if (difference === -1 || localParts[difference] < remoteParts[difference]) {
    throw new Error(`Bump package.json: local ${pkg.version} must be newer than npm ${latest}`)
  }
})

check('Audit', () => {
  run('npm', ['audit', '--include=dev', '--audit-level=low', ...registryArgs])
})
check('Lockfile', () => {
  const lock = JSON.parse(readFileSync(join(root, 'package-lock.json'), 'utf8'))
  const metadata = lock.packages?.['']
  if (lock.version !== pkg.version || metadata?.version !== pkg.version) {
    throw new Error(`Lockfile version must match package.json (${pkg.version})`)
  }
  for (const field of ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies']) {
    const expected = pkg[field] || {}
    const actual = metadata[field] || {}
    if (Object.keys(expected).length !== Object.keys(actual).length ||
        Object.keys(expected).some((key) => expected[key] !== actual[key])) {
      throw new Error(`Lockfile ${field} differ from package.json`)
    }
  }
})
check('Dependencies', () => {
  if (['dependencies', 'optionalDependencies', 'peerDependencies'].some((field) => Object.keys(pkg[field] || {}).length)) {
    throw new Error('spacetime should remain dependency-free')
  }
})
check('ESLint', () => { run('npm', ['run', 'lint']) })
check('Build', () => { run('npm', ['run', 'build']) })
check('Source tests', () => { run('npm', ['test']) })
check('Bundle tests', () => { run('npm', ['run', 'testb']) })
check('Type tests', () => { run('npm', ['run', 'test:types']) })
check('Git diff', () => {
  run('git', ['diff', '--check'])
  run('git', ['diff', '--cached', '--check'])
})

const temp = mkdtempSync(join(tmpdir(), 'spacetime-release-'))
try {
  let tarball
  let packed
  check('Package', () => {
    ;[packed] = JSON.parse(run('npm', [
      'pack', '--json', '--ignore-scripts', '--pack-destination', temp
    ]))
    tarball = join(temp, packed.filename)
    const files = new Set(packed.files.map((file) => file.path))
    const required = [
      'package.json', 'README.md', 'LICENSE', pkg.main, pkg.types, pkg.unpkg,
      pkg.exports['.'].import.types, pkg.exports['.'].import.default,
      pkg.exports['.'].require.types, pkg.exports['.'].require.default
    ]
    for (const path of required) {
      if (!files.has(path.replace(/^\.\//, ''))) {
        throw new Error(`Missing published file: ${path}`)
      }
    }
  })
  check('ESM / CJS', () => {
    if (!tarball) throw new Error('Cannot test entry points because npm pack failed')
    run('tar', ['-xzf', tarball, '-C', temp])
    const smoke = join(temp, 'package', 'release-smoke.mjs')
    writeFileSync(smoke, `
      import { strict as assert } from 'node:assert'
      import { createRequire } from 'node:module'
      import esm from 'spacetime'
      const cjs = createRequire(import.meta.url)('spacetime')
      for (const spacetime of [esm, cjs]) {
        assert.equal(spacetime.version, ${JSON.stringify(pkg.version)})
        const date = spacetime('2024-01-31', 'UTC')
        assert.equal(date.add(1, 'day').format('iso-short'), '2024-02-01')
        assert.equal(date.format('iso-short'), '2024-01-31')
      }
    `)
    run(process.execPath, [smoke])
  })
  check('ATTW', () => {
    if (!tarball) throw new Error('Cannot check types because npm pack failed')
    run('attw', ['--no-definitely-typed', tarball])
  })
  let previous
  check('Previous release', () => {
    if (!latest) throw new Error('npm latest version lookup failed')
    ;[previous] = JSON.parse(run('npm', [
      'pack', `${pkg.name}@${latest}`, '--json', '--ignore-scripts',
      '--pack-destination', temp, ...registryArgs
    ]))
  })
  const sizes = [
    ['Packed size', (info) => info.size],
    ['Unpacked size', (info) => info.unpackedSize],
    ...[['ESM size', 'builds/spacetime.mjs'], ['CJS size', 'builds/spacetime.cjs'], ['Minified size', 'builds/spacetime.min.js']].map(([name, path]) => [
      name, (info) => info.files.find((file) => file.path === path)?.size
    ])
  ]
  for (const [name, getSize] of sizes) {
    check(name, () => {
      if (!packed || !previous) throw new Error('Package size data unavailable')
      const limit = Number(process.env.RELEASE_MAX_SIZE_GROWTH_PERCENT || 10)
      if (!Number.isFinite(limit) || limit < 0) throw new Error('Size growth limit must be a nonnegative number')
      const before = getSize(previous)
      const after = getSize(packed)
      if (!(before > 0) || !(after > 0)) throw new Error('Missing or invalid file sizes')
      const growth = ((after / before) - 1) * 100
      const detail = `${(before / 1024).toFixed(1)} → ${(after / 1024).toFixed(1)} KiB, ${growth >= 0 ? '+' : ''}${growth.toFixed(1)}% vs ${latest}`
      if (growth > limit) throw new Error(`${detail}; exceeds ${limit}% growth limit`)
    })
  }
} finally {
  rmSync(temp, { recursive: true, force: true })
}

const failed = results.filter((result) => !result.passed).length
process.exitCode = failed ? 1 : 0
