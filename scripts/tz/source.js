/* global AbortSignal */
// Download a tzdata release from IANA and compile it into a zoneinfo directory for zdump.
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

// The zic inputs the tz Makefile uses (TDATA). Rearguard form keeps positive DST flags
// for Ireland, Morocco, etc, matching system zoneinfo and the runtime's hemisphere model.
const TDATA = ['africa', 'antarctica', 'asia', 'australasia', 'europe', 'northamerica',
  'southamerica', 'etcetera', 'factory', 'backward']
export const dataform = 'rearguard'

export const releaseUrl = (release) => release === 'latest'
  ? 'https://data.iana.org/time-zones/tzdata-latest.tar.gz'
  : `https://data.iana.org/time-zones/releases/tzdata${release}.tar.gz`

// NEWS begins each entry with 'Release 2026f - 2026-10-27 ...'.
export const parseReleaseDate = (news, release) => {
  const match = new RegExp(`^Release ${release} - (\\d{4}-\\d{2}-\\d{2})`, 'm').exec(news || '')
  return match ? match[1] : 'unknown'
}

const run = (file, args, cwd) => execFileSync(file, args, {
  cwd,
  encoding: 'utf8',
  maxBuffer: 64 * 1024 * 1024,
  env: { ...process.env, LC_ALL: 'C' },
  stdio: ['ignore', 'pipe', 'inherit']
})

// Returns the compiled zoneinfo directory plus the release actually inside the tarball.
export const fetchRelease = async (release) => {
  const source = releaseUrl(release)
  const response = await fetch(source, { signal: AbortSignal.timeout(60000) })
  if (!response.ok) {
    throw new Error(`Download failed (${response.status}) for ${source}`)
  }
  const dir = mkdtempSync(join(tmpdir(), 'spacetime-tzdata-'))
  const src = join(dir, 'src')
  mkdirSync(src)
  writeFileSync(join(dir, 'tzdata.tar.gz'), Buffer.from(await response.arrayBuffer()))
  run('tar', ['-xzf', join(dir, 'tzdata.tar.gz'), '-C', src])
  // The 'version' file holds the release name, even when we asked for 'latest'.
  const version = readFileSync(join(src, 'version'), 'utf8').trim()
  const released = parseReleaseDate(readFileSync(join(src, 'NEWS'), 'utf8'), version)
  // Same TZif files 'make DATAFORM=rearguard' would install.
  const zi = run('awk', ['-v', `DATAFORM=${dataform}`, '-f', 'ziguard.awk', ...TDATA], src)
  writeFileSync(join(src, `${dataform}.zi`), zi)
  const zoneinfoDir = join(dir, 'zoneinfo')
  run('zic', ['-d', zoneinfoDir, join(src, `${dataform}.zi`)])
  return { zoneinfoDir, version, released, source }
}
