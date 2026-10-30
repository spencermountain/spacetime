// Download tzdata, read every zone with zdump, report differences, then write zonefile/iana.js.
import { execFileSync } from 'node:child_process'
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import data from '../../zonefile/iana.js'
import aliases from '../../zonefile/aliases.js'
import { parseIntervals, normalizeZone } from './lib.js'
import { fetchRelease, dataform } from './source.js'
import { printHeader, printReport, printResult } from './report.js'

const year = 2026
// an IANA release name like '2026f', or 'latest'
const version = 'latest'
// zones we know the runtime cannot model in a given year; keep their current record quietly.
// Scoped by year so each decision is re-examined when the year advances.
const ignore = {
  2026: {
    'america/argentina': true, // a directory, not a zone
    'america/edmonton': true, // permanent 2026 dst
    'america/vancouver': true, // permanent 2026 dst
    'america/yellowknife': true, // permanent 2026 dst
    'america/winnipeg': true, // permanent 2026 dst
    'america/havana': true, // permanent 2026 dst
    'america/rainy_river': true, // permanent 2026 dst
    'america/inuvik': true, // permanent 2026 dst
    'africa/casablanca': true, // permanent 2026 utc
    'africa/el_aaiun': true, // permanent 2026 utc
  }
}
const ignored = ignore[year] || {}
const output = fileURLToPath(new URL('../../zonefile/iana.js', import.meta.url))

export class UnsupportedZoneError extends Error {}

// Library keys are lowercase; zoneinfo paths are case-sensitive on many systems.
// Apply known aliases, then resolve every component using its actual spelling.
export const resolveZone = (directory, name) => {
  name = aliases[name] || name
  let path = directory
  for (const component of name.split('/')) {
    const matches = readdirSync(path).filter((entry) => entry.toLowerCase() === component.toLowerCase())
    if (matches.length !== 1) {
      throw new Error('Missing or ambiguous zone: ' + name)
    }
    path = join(path, matches[0])
  }
  // zdump can silently report UTC for a directory. Reject it before invocation.
  if (statSync(path).isDirectory()) {
    throw Object.assign(new UnsupportedZoneError('Zone name resolves to a directory, not a timezone: ' + name), {
      details: [`Resolved path: ${path}`, 'Choose a specific timezone or define an explicit library alias.']
    })
  }
  if (readFileSync(path).subarray(0, 4).toString() !== 'TZif') {
    throw new Error('Not a compiled TZif file: ' + name)
  }
  return path
}

// Inject the reader so callers can supply fixtures without invoking zdump.
export const updateZones = (zones, targetYear, readZone) => {
  const result = {}
  const changes = []
  const unsupported = []
  const supported = [] // ignored zones that normalized cleanly, so the ignore entry is stale
  const keep = (name, previous, error, intervals) => {
    result[name] = { ...previous }
    if (!ignored[name]) {
      unsupported.push({ name, reason: error.message, previous, intervals, details: error.details })
    }
  }
  for (const [name, previous] of Object.entries(zones)) {
    // Read and parse failures are fatal; only modelling failures keep the old record.
    let intervals
    try {
      intervals = parseIntervals(readZone(name))
    } catch (error) {
      if (!(error instanceof UnsupportedZoneError)) {
        throw new Error(`${name}: ${error.message}`)
      }
      keep(name, previous, error)
      continue
    }
    try {
      result[name] = normalizeZone(intervals, previous, name, targetYear)
    } catch (error) {
      keep(name, previous, error, intervals)
      continue
    }
    if (ignored[name]) {
      supported.push(name)
    }
    if (JSON.stringify(previous) !== JSON.stringify(result[name])) {
      changes.push({ name, before: previous, after: result[name] })
    }
  }
  return { result, changes, unsupported, supported }
}

const main = async () => {
  if (year < new Date().getUTCFullYear()) {
    throw new Error(`year is ${year}; bump the constant before regenerating`)
  }
  const source = await fetchRelease(version)
  const total = Object.keys(data).length
  printHeader({ ...source, year, dataform, output, total })
  // tzdb zones we have neither a record nor an alias for
  const known = new Set([...Object.keys(data), ...Object.keys(aliases)])
  const missing = source.zones.filter((name) => !known.has(name.toLowerCase()))
  const { result, changes, unsupported, supported } = updateZones(data, year, (name) => {
    const path = resolveZone(source.zoneinfoDir, name)
    // Bound extraction to one UTC year; argument arrays avoid shell interpretation.
    return execFileSync('zdump', ['-i', '-c', `${year},${year + 1}`, path], {
      encoding: 'utf8',
      env: { ...process.env, LC_ALL: 'C' }
    })
  })
  printReport({ changes, unsupported, missing, supported, total: total - Object.keys(ignored).length })
  // Match the file's existing single-quote style so git diffs show only real changes.
  const zones = Object.entries(result).map(([name, zone]) => {
    const fields = Object.entries(zone).map(([k, v]) => `    ${k}: ${typeof v === 'string' ? `'${v}'` : v}`)
    return `  '${name}': {\n${fields.join(',\n')}\n  }`
  })
  const text = `// Generated by scripts/tz/index.js for ${year} \nexport const tzdbVersion = '${source.version}'\nexport default {\n${zones.join(',\n')}\n}\n`
  writeFileSync(output, text)
  printResult(`Wrote ${output}`)
}

main()
