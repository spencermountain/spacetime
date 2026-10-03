import test from 'tape'
import spacetime from './lib/index.js'

test('titlecase', (t) => {
  const arr = [
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
  arr.forEach(tz => {
    const s = spacetime.now(tz)
    t.equal(s.timezone().name, tz, tz)
  })
  t.end()
})

test('whereIts returns titlecased names', (t) => {
  const tzs = spacetime.whereIts('12:00am', '11:59pm')
  t.ok(tzs.includes('Antarctica/Mawson'), 'Antarctica/Mawson')
  t.ok(tzs.includes('America/Port-au-Prince'), 'America/Port-au-Prince')
  const wrong = tzs.filter(tz => tz !== spacetime.now(tz).timezone().name)
  t.deepEqual(wrong, [], 'same name as timezone()')
  t.end()
})
