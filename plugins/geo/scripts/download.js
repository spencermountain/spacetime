/* eslint-disable no-console */
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { simplify } from '@turf/simplify'
import { createHash } from 'node:crypto'
import zonefile from '../../../zonefile/iana.js'

const sourceUrl = 'https://www.geoapify.com/data-share/timezones/timezone-geojson.zip'
const outputFile = fileURLToPath(new URL('../src/geojson/data.json', import.meta.url))
// degrees; ~11km at equator — tune for world-map vs boundary accuracy
const simplifyOptions = {
  tolerance: 0.1,
  highQuality: true,
  mutate: true
}
const workDir = fs.mkdtempSync(join(tmpdir(), 'spacetime-geo-'))
try {
  const archive = join(workDir, 'timezone-geojson.zip')
  const response = await fetch(sourceUrl)
  if (!response.ok) {
    throw new Error(`Timezone download failed: HTTP ${response.status}`)
  }
  await pipeline(Readable.fromWeb(response.body), fs.createWriteStream(archive))
  execFileSync('unzip', ['-o', archive, '-d', workDir], { stdio: 'inherit' })

  const sourceDir = join(workDir, 'timezone-geojson')
  const files = new Map(
    fs
      .readdirSync(sourceDir)
      .filter((file) => file.endsWith('.geojson'))
      .map((file) => [file.toLowerCase(), join(sourceDir, file)])
  )
  const combined = {}
  Object.keys(zonefile).forEach((tz) => {
    const filename = tz.replaceAll('/', '__')
    const file = files.get(`${filename}.geojson`)
    if (file) {
      const tzData = JSON.parse(fs.readFileSync(file, 'utf8'))
      if (tzData.type !== 'Feature' || !['Polygon', 'MultiPolygon'].includes(tzData.geometry?.type) || !tzData.geometry.coordinates.length) {
        throw new Error(`Invalid timezone geometry: ${tz}`)
      }
      combined[tz] = simplify(tzData, simplifyOptions)
    } else {
      console.log(`${filename}.geojson not found`)
    }
  })

  // Reject incomplete downloads before replacing the checked-in dataset.
  const previous = JSON.parse(fs.readFileSync(outputFile, 'utf8'))
  const missing = Object.keys(previous).filter((tz) => !Object.hasOwn(combined, tz))
  if (!Object.keys(combined).length || missing.length) {
    throw new Error(`Timezone coverage decreased; missing: ${missing.join(', ')}`)
  }
  fs.writeFileSync(outputFile, JSON.stringify(combined, null, 2))
  const metadata = {
    source: sourceUrl,
    downloadedAt: new Date().toISOString(),
    sha256: createHash('sha256').update(fs.readFileSync(archive)).digest('hex'),
    simplifyOptions,
    zones: Object.keys(combined).length
  }
  fs.writeFileSync(new URL('../src/geojson/metadata.json', import.meta.url), JSON.stringify(metadata, null, 2) + '\n')
  const { size } = fs.statSync(outputFile)
  console.log(`wrote ${outputFile} (${(size / 1024 / 1024).toFixed(2)} MB)`)
} finally {
  fs.rmSync(workDir, { recursive: true, force: true })
}
