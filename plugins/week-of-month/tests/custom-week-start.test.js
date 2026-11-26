import test from 'tape'
import spacetime from 'spacetime'
import plugin from '../src/index.js'

spacetime.extend(plugin)

test('Thursday determines the month for each configured week start', t => {
  const starts = [
    ['sunday', '2021-06-27'],
    ['monday', '2021-06-28'],
    ['tuesday', '2021-06-29'],
    ['wednesday', '2021-06-30'],
    ['thursday', '2021-07-01'],
    ['friday', '2021-06-25'],
    ['saturday', '2021-06-26']
  ]
  for (const [day, expected] of starts) {
    const s = spacetime('2021-07-01T12:30:00', 'UTC').weekStart(day)
    t.equal(s.firstWeek().format('iso-short'), expected, `${day}: the first week contains July 1`)
    t.deepEqual(s.whichWeek(), { num: 1, month: 'july' }, `${day}: Thursday belongs to July`)
    t.equal(s.hour(), 12, 'the input remains unchanged')
  }
  t.end()
})
