import { writeFile } from 'node:fs/promises'

const firstYear = 2000
const lastYear = 2100
const source = 'https://aa.usno.navy.mil/api/seasons'
const rows = []

for (let year = firstYear; year <= lastYear; year += 1) {
  const response = await fetch(`${source}?year=${year}`, { signal: globalThis.AbortSignal.timeout(30000) })
  if (!response.ok) {
    throw new Error(`USNO ${year}: HTTP ${response.status}`)
  }
  const json = await response.json()
  const events = json.data.filter(({ phenom }) => phenom === 'Equinox' || phenom === 'Solstice')
  if (json.tz !== 0 || json.dst !== false || events.length !== 4) {
    throw new Error(`Unexpected USNO data for ${year}`)
  }
  const minutes = events.map((event, index) => {
    if (event.year !== year || event.month !== (index + 1) * 3 || !/^\d{2}:\d{2}$/.test(event.time)) {
      throw new Error(`Invalid USNO event for ${year}`)
    }
    const [hour, minute] = event.time.split(':').map(Number)
    return (event.day - 1) * 1440 + hour * 60 + minute
  })
  rows.push(`  [${minutes.join(', ')}]`)
}

const header = `// USNO UT event times, ${firstYear}–${lastYear}; minutes from March/June/September/December 1.\n// Source: ${source}; regenerate with scripts/update-seasons.js.\n`
const output = `${header}const seasons = [\n${rows.join(',\n')}\n]\n\nexport default seasons\n`
await writeFile(new URL('../src/lib/season-data.js', import.meta.url), output)
process.stdout.write(`Updated seasons: ${firstYear}–${lastYear}\n`)
