import test from 'tape'
import spacetime from '../_lib/index.ts'

test('unixFmt year widths are minimum widths', t => {
  for (const [year, expected] of [
    [7, '7 07 007 0007 00007'],
    [123, '123 23 123 0123 00123'],
    [2026, '2026 26 2026 2026 02026'],
    [-7, '-7 07 -007 -0007 -00007']
  ] as [number, string][]) {
    const s = spacetime([year, 0, 1], 'UTC')
    t.equal(s.unixFmt('y yy yyy yyyy yyyyy'), expected, `year ${year}`)
    t.equal(s.unixFmt('YYY YYYY'), s.unixFmt('yyy yyyy'), 'existing aliases retain their widths')
    t.equal(s.year(), year, 'formatting preserves the date')
  }
  t.end()
})
