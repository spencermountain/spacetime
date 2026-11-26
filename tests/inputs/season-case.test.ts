import test from 'tape'
import spacetime from '../_lib/index.ts'

test('season inputs accept the same letter cases in both hemispheres', (t) => {
  const starts = [
    ['spring', '03', '09'],
    ['summer', '06', '12'],
    ['fall', '09', '03'],
    ['autumn', '09', '03'],
    ['winter', '12', '06']
  ]
  for (const [season, north, south] of starts) {
    for (const [zone, month] of [['America/New_York', north], ['Australia/Sydney', south]]) {
      for (const name of [season, season.toUpperCase(), season[0].toUpperCase() + season.slice(1)]) {
        const input = `${name} of 2024`
        t.equal(spacetime('2024-01-20', zone).set(input).format('iso-short'), `2024-${month}-01`, `${zone}: ${input}`)
      }
    }
  }
  t.equal(spacetime('SUMMER', 'UTC', { today: { year: 2024 } }).format('iso-short'), '2024-06-01', 'season without an explicit year')
  t.end()
})
