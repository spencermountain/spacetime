/* eslint-disable no-console*/
import { execFileSync } from 'node:child_process'
import {
  existsSync,
  readFileSync,
  readdirSync,
  renameSync,
  statSync,
  unlinkSync,
  writeFileSync
} from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import data from '../../zonefile/iana.js'
import aliases from '../../zonefile/aliases.js'
import { parseIntervals, normalizeZone } from './lib.js'
import { printHeader, printReport, printResult, printError, printHelp } from './report.js'

const root = fileURLToPath(new URL('../../', import.meta.url))
export class UnsupportedZoneError extends Error {}

export const parseArgs = (args) => {
  const options = {
    year: new Date().getUTCFullYear(),
    zoneinfoDir: '/usr/share/zoneinfo',
    check: false,
    allowUnsupported: false
  }
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i]
    if (arg === '--check') options.check = true
    else if (arg === '--allow-unsupported') options.allowUnsupported = true
    else if (arg === '--help') options.help = true
    else if (['--year', '--zoneinfo-dir', '--output'].includes(arg)) {
      const value = args[++i]
      if (!value || value.startsWith('--')) throw new Error('Missing value for ' + arg)
      if (arg === '--year') {
        if (!/^\d{4}$/.test(value) || Number(value) < 1900 || Number(value) > 9998)
          throw new Error('Year must be 1900–9998')
        options.year = Number(value)
      } else options[arg === '--output' ? 'output' : 'zoneinfoDir'] = resolve(value)
    } else throw new Error('Unknown option: ' + arg)
  }
  options.output ||= join(root, `zonefile.${options.year}.js`)
  return options
}

// Resolve actual spelling on disk, including aliases and multi-component names.
export const resolveZone = (directory, name) => {
  name = aliases[name] || name
  let path = directory
  for (const component of name.split('/')) {
    if (!component || component === '.' || component === '..') throw new Error('Invalid zone name')
    const matches = readdirSync(path).filter(
      (entry) => entry.toLowerCase() === component.toLowerCase()
    )
    if (matches.length !== 1) throw new Error('Missing or ambiguous zone: ' + name)
    path = join(path, matches[0])
  }
  if (statSync(path).isDirectory()) {
    throw Object.assign(new UnsupportedZoneError('Zone name resolves to a directory, not a timezone: ' + name), {
      details: [
        `Resolved path: ${path}`,
        `Available entries: ${readdirSync(path).sort().join(', ')}`,
        'Choose a specific timezone or define an explicit library alias; a directory has no offset or transitions.'
      ]
    })
  }
  if (!statSync(path).isFile() || readFileSync(path).subarray(0, 4).toString() !== 'TZif') {
    throw new Error('Not a compiled TZif file: ' + name)
  }
  return path
}

const sourceVersion = (directory) => {
  for (const name of ['+VERSION', 'tzdata.zi']) {
    const path = join(directory, name)
    if (existsSync(path)) {
      const text = readFileSync(path, 'utf8')
      const version = name === '+VERSION' ? text.trim() : /^# version (\S+)/m.exec(text)?.[1]
      if (version) return version
    }
  }
  return 'unknown'
}

export const updateZones = (zones, year, readZone) => {
  const result = {}
  const changes = []
  const unsupported = []
  for (const [name, previous] of Object.entries(zones)) {
    // Acquisition and parsing errors must fail, even with --allow-unsupported.
    let intervals
    try {
      intervals = parseIntervals(readZone(name))
    } catch (error) {
      if (error instanceof UnsupportedZoneError) {
        unsupported.push({ name, reason: error.message, previous, details: error.details })
        result[name] = { ...previous }
        continue
      }
      throw new Error(`${name}: ${error.message}`)
    }
    try {
      result[name] = normalizeZone(intervals, previous, name, year)
    } catch (error) {
      unsupported.push({ name, reason: error.message, previous, intervals, details: error.details })
      result[name] = { ...previous }
      continue
    }
    if (JSON.stringify(previous) !== JSON.stringify(result[name])) {
      changes.push({ name, before: previous, after: result[name] })
    }
  }
  return { result, changes, unsupported }
}

export const main = (args = process.argv.slice(2)) => {
  const options = parseArgs(args)
  if (options.help) {
    printHelp()
    return
  }
  const { year, zoneinfoDir } = options
  const version = sourceVersion(zoneinfoDir)
  const total = Object.keys(data).length
  printHeader({ ...options, version, total })
  const { result, changes, unsupported } = updateZones(data, year, (name) => {
    const path = resolveZone(zoneinfoDir, name)
    return execFileSync('zdump', ['-i', '-c', `${year},${year + 1}`, path], {
      encoding: 'utf8',
      timeout: 10000,
      maxBuffer: 1024 * 1024,
      env: { ...process.env, LC_ALL: 'C' },
      stdio: ['ignore', 'pipe', 'pipe']
    })
  })
  printReport({ changes, unsupported, total })
  if (options.check) {
    if (changes.length || unsupported.length) process.exitCode = 1
    printResult(
      changes.length || unsupported.length ? 'Check needs attention. No files written.' : 'Check passed. No files written.',
      Boolean(changes.length || unsupported.length)
    )
    return
  }
  if (unsupported.length && !options.allowUnsupported)
    throw new Error(
      'No output written. Resolve unsupported zones or explicitly preserve them with --allow-unsupported.'
    )
  const source = JSON.stringify({
    year,
    tzdata: version,
    unsupported: unsupported.map((o) => o.name)
  })
  const text = `// Generated by scripts/tz/update.js: ${source}\nexport default ${JSON.stringify(result, null, 2)}\n`
  const temporary = join(dirname(options.output), `.zonefile-${process.pid}.tmp`)
  let created = false
  try {
    writeFileSync(temporary, text, { encoding: 'utf8', flag: 'wx' })
    created = true
    renameSync(temporary, options.output)
  } finally {
    if (created && existsSync(temporary)) unlinkSync(temporary)
  }
  printResult(`Wrote ${options.output}`)
}

try {
  main()
} catch (error) {
  printError(error.message)
  process.exitCode = 1
}
