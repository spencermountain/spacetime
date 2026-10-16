import { execFileSync } from 'node:child_process'
import { createWriteStream, copyFileSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'

const workDir = mkdtempSync(join(tmpdir(), 'spacetime-tzdb-'))
try {
  const archive = join(workDir, 'TimeZoneDB.csv.zip')
  const response = await fetch('https://timezonedb.com/files/TimeZoneDB.csv.zip')
  if (!response.ok) throw new Error(`Timezone download failed: HTTP ${response.status}`)
  await pipeline(Readable.fromWeb(response.body), createWriteStream(archive))
  execFileSync('bsdtar', ['-xf', archive, '-C', workDir, 'time_zone.csv'], { stdio: 'inherit' })
  copyFileSync(join(workDir, 'time_zone.csv'), fileURLToPath(new URL('./time_zone.csv', import.meta.url)))
} finally {
  rmSync(workDir, { recursive: true, force: true })
}
