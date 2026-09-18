/* eslint-disable no-console */
// Keep redirected output readable and respect standard terminal color settings.
const paint = (text, code, stream = process.stdout) => {
  const color = process.env.NO_COLOR === undefined && process.env.TERM !== 'dumb' &&
    (process.env.FORCE_COLOR === undefined ? stream.isTTY : process.env.FORCE_COLOR !== '0')
  return color ? `\u001b[${code}m${text}\u001b[0m` : String(text)
}

const offset = hours => {
  const seconds = Math.round(Math.abs(hours) * 3600)
  const hh = String(Math.floor(seconds / 3600)).padStart(2, '0')
  const mm = String(Math.floor(seconds / 60) % 60).padStart(2, '0')
  const ss = seconds % 60
  return `UTC${hours < 0 ? '-' : '+'}${hh}:${mm}${ss ? ':' + String(ss).padStart(2, '0') : ''}`
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

export const printReport = ({ changes, unsupported, total }) => {
  const lines = ['', paint(`Changes (${changes.length})`, '1;36')]
  if (!changes.length) lines.push('  No changes.')
  for (const { name, before, after } of changes) {
    lines.push(`  ${paint(name, '1')}`)
    for (const key of new Set([...Object.keys(before), ...Object.keys(after)])) {
      if (before[key] === after[key]) continue
      const label = (key === 'dst' ? 'DST' : key === 'hem' ? 'hemisphere' : key).padEnd(10)
      lines.push(`    ${label} ${paint(value(key, before[key]), '31')} → ${paint(value(key, after[key]), '32')}`)
    }
  }
  console.log(lines.join('\n'))
  if (unsupported.length) {
    const warnings = ['', paint(`Unsupported (${unsupported.length}) — existing records retained`, '1;33', process.stderr)]
    for (const { name, reason } of unsupported) {
      warnings.push(`  ${paint(name, '33', process.stderr)}`, `    ${reason}`)
    }
    console.error(warnings.join('\n'))
  }
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
