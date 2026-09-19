/* eslint-disable no-console -- This module owns the CLI console output. */
// Keep all presentation here; parsing and update decisions live in lib.js/update.js.
// Keep redirected output readable and respect standard terminal color settings.
const paint = (text, code, stream = process.stdout) => {
  const color = process.env.NO_COLOR === undefined && process.env.TERM !== 'dumb' &&
    (process.env.FORCE_COLOR === undefined ? stream.isTTY : process.env.FORCE_COLOR !== '0')
  return color ? `\u001b[${code}m${text}\u001b[0m` : String(text)
}

// Zone records store decimal hours; render minutes/seconds without losing fractional offsets.
const offset = hours => {
  const seconds = Math.round(Math.abs(hours) * 3600)
  const hh = String(Math.floor(seconds / 3600)).padStart(2, '0')
  const mm = String(Math.floor(seconds / 60) % 60).padStart(2, '0')
  const ss = seconds % 60
  return `UTC${hours < 0 ? '-' : '+'}${hh}:${mm}${ss ? ':' + String(ss).padStart(2, '0') : ''}`
}

const fieldLabel = key => {
  if (key === 'dst') return 'DST'
  if (key === 'hem') return 'hemisphere'
  return key
}

const value = (key, v) => {
  if (v === undefined) return key === 'dst' ? 'none (fixed offset)' : 'none'
  if (key === 'offset') return offset(v)
  if (key === 'hem') return v === 'n' ? 'North' : 'South'
  if (key === 'dst') return v.replace(/:(\d{2})/g, ' $1:00').replace('->', ' – ')
  return String(v)
}

export const printHeader = ({ year, version, zoneinfoDir, output, check, total }) => {
  console.log([
    '',
    paint(`Timezone build · ${year}`, '1;36'),
    `  tzdata   ${version}`,
    `  source   ${zoneinfoDir}`,
    `  output   ${check ? 'check only — no files written' : output}`,
    '',
    paint(`Reading ${total} zones…`, '2')
  ].join('\n'))
}

// Use one label width across zones; paired rows align even when fields differ.
const formatChanges = changes => {
  const lines = ['', paint(`Changes (${changes.length})`, '1;36')]
  if (!changes.length) lines.push('  No changes.')
  const groups = changes.map(({ name, before, after }) => ({
    name,
    rows: [...new Set([...Object.keys(before), ...Object.keys(after)])]
      .filter(key => before[key] !== after[key])
      .map(key => ({
        label: fieldLabel(key),
        before: value(key, before[key]),
        after: value(key, after[key])
      }))
  }))
  const allRows = groups.flatMap(group => group.rows)
  const labelWidth = Math.max(10, ...allRows.map(row => row.label.length))
  for (const { name, rows } of groups) {
    lines.push(`  ${paint(name, '1')}`)
    for (const row of rows) {
      // Pad plain text before coloring so ANSI escape sequences do not affect alignment.
      lines.push(
        `    ${row.label.padEnd(labelWidth)}  ${paint(`Before  ${row.before}`, '31')}`,
        `    ${''.padEnd(labelWidth)}  ${paint(`After   ${row.after}`, '32')}`
      )
    }
  }
  return lines.join('\n')
}

const dstFlag = state => state.dst ? 'on' : 'off'
const timestamp = epoch => new Date(epoch).toISOString().replace('T', ' ').replace('.000Z', '')

// Project an instant onto each side's wall clock using UTC formatting so the host
// timezone cannot affect the report. These local values must not be labeled UTC.
const formatTransitions = intervals => {
  let before = intervals.initial
  const lines = [
    `    Initial: ${offset(before.offset)} · DST ${dstFlag(before)}`,
    `    Transitions (${intervals.transitions.length}):`
  ]
  for (const after of intervals.transitions) {
    const delta = Math.round((after.offset - before.offset) * 3600) / 60
    const localBefore = timestamp(after.epoch + (before.offset * 3600000))
    const localAfter = timestamp(after.epoch + (after.offset * 3600000))
    lines.push(
      `      ${timestamp(after.epoch)} UTC`,
      `        Local   ${localBefore} → ${localAfter}`,
      `        Offset  ${offset(before.offset).padEnd(12)} → ${offset(after.offset)} (${delta > 0 ? '+' : ''}${delta} min)`,
      `        DST     ${dstFlag(before).padEnd(12)} → ${dstFlag(after)}`
    )
    before = after
  }
  return lines
}

// Show the retained record and source evidence together so failures can be diagnosed.
const formatUnsupported = unsupported => {
  const warnings = ['', paint(`Unsupported (${unsupported.length}) — existing records retained`, '1;33', process.stderr)]
  for (const { name, reason, previous, intervals, details = [] } of unsupported) {
    warnings.push(`  ${paint(name, '33', process.stderr)}`, `    ${reason}`)
    for (const detail of details) warnings.push(`      ${detail}`)
    if (previous) {
      warnings.push(`    Keeping: ${value('offset', previous.offset)} · ${value('hem', previous.hem)} · DST ${value('dst', previous.dst)}`)
    }
    if (intervals) {
      warnings.push(...formatTransitions(intervals))
    }
    warnings.push('')
  }
  return warnings.join('\n')
}

export const printReport = ({ changes, unsupported, total }) => {
  console.log(formatChanges(changes))
  // Diagnostics go to stderr; normal changes and the summary go to stdout.
  if (unsupported.length) console.error(formatUnsupported(unsupported))
  const unchanged = total - changes.length - unsupported.length
  console.log([
    '',
    paint('Summary', '1'),
    `  ${total} zones · ${changes.length} changed · ${unchanged} unchanged · ${unsupported.length} unsupported`,
    ''
  ].join('\n'))
}

export const printResult = (message, warning = false) => {
  console.log(paint(message, warning ? '33' : '32'))
}

export const printError = message => {
  console.error(`\n${paint('Error', '1;31', process.stderr)}: ${message}\n`)
}

export const printHelp = () => {
  console.log(`
Timezone build
  npm run build:tz -- [options]

Options
  --year YYYY           Target year (default: current UTC year)
  --zoneinfo-dir PATH   Compiled zoneinfo database (default: /usr/share/zoneinfo)
  --output FILE         Destination (default: zonefile.YYYY.js in repository root)
  --check               Report only; exit 1 for changes or unsupported zones
  --allow-unsupported   Keep unsupported records while writing supported changes
  --help                Show this help

To update the build input, use --output zonefile/iana.js.
Read and parse errors always fail. Set NO_COLOR=1 to disable terminal colors.
`)
}
