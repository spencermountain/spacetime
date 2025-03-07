import test from 'tape'
import spacetime from './lib/index.js'

test('swapTz', (t) => {
  let arr = [
    'Africa/Dar_es_Salaam',
    'Africa/Porto-Novo',
    'America/Blanc-Sablon',
    'America/Port-au-Prince',
    'America/Port_of_Spain',
    'Europe/Isle_of_Man',
    'Antarctica/DumontDUrville',
    'Antarctica/McMurdo',
    'Asia/Ust-Nera',
    'Europe/Zagreb',
    'America/Bahia_Banderas',
    'Asia/Kuching',
    'Etc/GMT+7',
  ]
  let s = spacetime('2011-12-03T10:15:30', 'america/montreal')
  t.equal(s.time(), '10:15am', 'first-time')
  arr.forEach(tz => {
    s = s.timezone(tz)
    t.equal(s.timezone().name, tz, 'swapped tz ', tz)
    t.equal(s.time(), '10:15am', 'swap time ' + tz)
  })
  t.end()
})
