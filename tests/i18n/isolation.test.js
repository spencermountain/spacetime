import test from 'tape'
import { spawnSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'

const require = createRequire(import.meta.url)
const tape = pathToFileURL(require.resolve('tape')).href
const library = new URL('../_lib/index.js', import.meta.url).href
const files = ['i18n.test.js', 'since.test.js', 'diff.test.js', 'week-start.test.js']
const orders = [...files.map(file => [file]), files, [...files].reverse()]

test('locale tests restore English defaults independently and in either order', t => {
  orders.forEach(order => {
    const urls = order.map(file => new URL(file, import.meta.url).href)
    const script = `
      import test from ${JSON.stringify(tape)}
      import spacetime from ${JSON.stringify(library)}
      test.wait()
      for (const url of ${JSON.stringify(urls)}) {
        await import(url)
        test('English defaults after ' + url.split('/').pop(), t => {
          const s = spacetime('2024-06-17T21:30:00', 'UTC')
          t.equal(s.format('day'), 'Monday', 'full weekday')
          t.equal(s.format('day-short'), 'Mon', 'short weekday')
          t.equal(s.format('month'), 'June', 'month name and capitalization')
          t.equal(s.time(), '9:30pm', 'AM/PM label')
          t.equal(s.startOf('week').dayName(), 'monday', 'week start')
          t.equal(s.since(s.add(1, 'day')).rounded, 'in 1 day', 'future distance and units')
          t.equal(s.add(1, 'day').since(s).rounded, '1 day ago', 'past distance and units')
          t.end()
        })
      }
      test.run()
    `
    const result = spawnSync(process.execPath, ['--input-type=module', '-e', script], {
      encoding: 'utf8', timeout: 10000, killSignal: 'SIGKILL'
    })
    t.equal(result.status, 0, `locale order: ${order.join(' → ')}`)
    if (result.status !== 0) {
      t.comment(result.error?.message || result.stderr || result.stdout.slice(-4000))
    }
  })
  t.end()
})
