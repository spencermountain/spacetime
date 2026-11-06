 /* eslint-disable no-console */
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
  if (key === 'dst') {return 'DST'}
  if (key === 'hem') {return 'hemisphere'}
  return key
}

const value = (key, v) => {
  if (v === undefined) {return key === 'dst' ? 'none (fixed offset)' : 'none'}
  if (key === 'offset') {return offset(v)}
  if (key === 'hem') {return v === 'n' ? 'North' : 'South'}
  if (key === 'dst') {
    return v.replace(/:(\d{2})(?::(\d{2}))?/g, (_, hour, minute = '00') => ` ${hour}:${minute}`).replace('->', ' – ')
  }
  return String(v)
}

export const printHeader = ({ year, version, released, dataform, source, output, total }) => {
  console.log([
    '',
    paint(`Timezone build · ${year}`, '1;36'),
    `  tzdata   ${version} (released ${released}) · ${dataform} form`,
    `  source   ${source}`,
    `  output   ${output}`,
    '',
    paint(`Reading ${total} zones…`, '2')
  ].join('\n'))
}

// Use one label width across zones; paired rows align even when fields differ.
const formatChanges = changes => {
  const lines = ['', paint(`Changes (${changes.length})`, '1;36')]
  if (changes.length === 0) {lines.push('  No changes.')}
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
const formatTransitionsVerbose = intervals => {
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

// A single row per transition keeps the offset and DST sequence visible at a glance.
// Use stderr's color capability, since warnings can be redirected independently.
const warningColor = (text, code) => paint(text, code, process.stderr)
const formatTransitions = intervals => {
  let before = intervals.initial
  const lines = [`    ${warningColor('Transition (UTC)      Offset before → after      DST', '2')}`]
  for (const after of intervals.transitions) {
    const from = offset(before.offset)
    const to = offset(after.offset)
    const changed = before.offset !== after.offset
    const fromColor = changed ? '31' : '2'
    const toColor = changed ? '32' : '2'
    const offsets = `${warningColor(from, fromColor)} → ${warningColor(to, toColor)}`
    const padding = ' '.repeat(Math.max(0, 25 - (from.length + 3 + to.length)))
    lines.push(`    ${warningColor(timestamp(after.epoch), '36')}   ${offsets}${padding}  ${dstFlag(before)} → ${dstFlag(after)}`)
    before = after
  }
  return lines
}

// Keep the full evidence available with --verbose; default to the failure and its timeline.
const formatUnsupported = (unsupported, verbose) => {
  const warnings = ['', warningColor(`Unsupported (${unsupported.length}) · existing records kept`, '1;33')]
  for (const { name, reason, previous, intervals, details = [] } of unsupported) {
    let title = reason.replace(/^Unsupported (?:pattern|boundary): /, '')
    if (reason === 'Unsupported offset/DST cycle for runtime hemisphere and shift') {
      title = 'Offset/DST cycle does not match runtime rules'
    }
    if (!intervals && reason.startsWith('Zone name resolves to a directory')) {
      title = 'Directory, not a timezone — choose a zone or add an alias'
    }
    warnings.push('', `  ${warningColor(name, '1;33')}`, `    ${warningColor(title, '33')}`)
    const explanations = verbose ? details : details.filter(detail =>
      !detail.startsWith('The runtime supports') &&
      !detail.startsWith('Observed ') &&
      !detail.startsWith('Transition instant:') &&
      !detail.startsWith('Available entries:') &&
      !detail.startsWith('Choose a specific timezone')
    )
    for (const detail of explanations) {warnings.push(`    ${warningColor(detail, '2')}`)}
    if (verbose && previous) {
      warnings.push(`    Keeping: ${value('offset', previous.offset)} · ${value('hem', previous.hem)} · DST ${value('dst', previous.dst)}`)
    }
    if (intervals) {
      warnings.push(...(verbose ? formatTransitionsVerbose(intervals) : formatTransitions(intervals)))
    }
  }
  return warnings.join('\n')
}

// Attention items that are not zone-record changes: new tzdb zones, stale ignore entries.
const formatNotes = (missing, supported) => {
  const lines = []
  if (missing.length > 0) {
    lines.push('', warningColor(`Not in iana.js (${missing.length}) · tzdb zones with no record or alias`, '1;33'))
    for (const name of missing) {lines.push(`  ${name}`)}
  }
  if (supported.length > 0) {
    lines.push('', warningColor(`Ignored but now supported (${supported.length}) · remove from ignore`, '1;33'))
    for (const name of supported) {lines.push(`  ${name}`)}
  }
  return lines.join('\n')
}

export const printReport = ({ changes, unsupported, missing = [], supported = [], total, verbose = false }) => {
  console.log(formatChanges(changes))
  // Diagnostics go to stderr; normal changes and the summary go to stdout.
  if (unsupported.length > 0) {console.error(formatUnsupported(unsupported, verbose))}
  if (missing.length > 0 || supported.length > 0) {console.error(formatNotes(missing, supported))}
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
