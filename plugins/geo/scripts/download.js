/* eslint-disable no-console */
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { createHash } from 'node:crypto'
import { selectRelease, packCollection } from './_lib.js'

const repository = 'evansiroky/timezone-boundary-builder'
const releaseTag = process.argv[2]
const releasePath = releaseTag ? `tags/${encodeURIComponent(releaseTag)}` : 'latest'
const releaseUrl = `https://api.github.com/repos/${repository}/releases/${releasePath}`
const outputFile = new URL('../src/geojson/packed.json', import.meta.url)
const metadataFile = new URL('../src/geojson/metadata.json', import.meta.url)
// Degrees; ~13km at the equator. Packing rounds to four decimal places.
const simplifyOptions = { tolerance: 0.12, highQuality: true, mutate: true }
const headers = { 'User-Agent': 'spacetime-geo' }
if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
}
const response = await fetch(releaseUrl, { headers })
if (!response.ok) {
  throw new Error(`Boundary release lookup failed: HTTP ${response.status}`)
}
const { tzdbVersion, source } = selectRelease(await response.json())
console.log(`Downloading timezone-boundary-builder: IANA ${tzdbVersion}`)

const workDir = fs.mkdtempSync(join(tmpdir(), 'spacetime-geo-'))
try {
  const archive = join(workDir, 'timezones.zip')
  const download = await fetch(source)
  if (!download.ok) {
    throw new Error(`Timezone download failed: HTTP ${download.status}`)
  }
  await pipeline(Readable.fromWeb(download.body), fs.createWriteStream(archive))
  execFileSync('unzip', ['-q', archive, 'combined-with-oceans.json', '-d', workDir])
  const collection = JSON.parse(fs.readFileSync(join(workDir, 'combined-with-oceans.json'), 'utf8'))
  const previous = JSON.parse(fs.readFileSync(outputFile, 'utf8'))
  const combined = packCollection(collection, previous, simplifyOptions)
  const licenseResponse = await fetch(`https://raw.githubusercontent.com/${repository}/${tzdbVersion}/DATA_LICENSE`)
  if (!licenseResponse.ok) {
    throw new Error(`Boundary license download failed: HTTP ${licenseResponse.status}`)
  }
  const license = await licenseResponse.text()
  const metadata = {
    tzdbVersion,
    source,
    downloadedAt: new Date().toISOString(),
    sha256: createHash('sha256').update(fs.readFileSync(archive)).digest('hex'),
    simplifyOptions,
    coordinateDecimals: 4,
    zones: Object.keys(combined).length,
    license: 'ODbL-1.0',
    attribution: 'Timezone Boundary Builder / OpenStreetMap contributors'
  }
  fs.writeFileSync(outputFile, JSON.stringify(combined, null, 2) + '\n')
  fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2) + '\n')
  fs.mkdirSync(new URL('../builds/', import.meta.url), { recursive: true })
  fs.writeFileSync(new URL('../builds/timezone-data.LICENSE', import.meta.url), license)
  console.log(`Updated polygon data: IANA ${tzdbVersion} (${metadata.zones} zones)`)
} finally {
  fs.rmSync(workDir, { recursive: true, force: true })
}
