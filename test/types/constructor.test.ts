import * as test from 'tape'
import { spacetime } from './spacetime-static'

test('static api exists', (t: test.Test) => {
  t.equal(typeof spacetime, 'function', 'default is a function')
  t.equal(typeof spacetime.now, 'function', '.now() is a function')
  t.equal(typeof spacetime.today, 'function', '.today() is a function')
  t.equal(typeof spacetime.tomorrow, 'function', '.tomorrow is a function')
  t.end()
})

test('constructor args work', (t: test.Test) => {
  t.equal(spacetime(90071992547409919007199254740991).isValid(), false, 'doesnt accept garbage')
  t.equal(spacetime(new Date('03/04/2017')).isValid(), true, 'accepts Date object')
  t.equal(spacetime(1488610800000).isValid(), true, 'accepts epoch')
  t.equal(spacetime([2017, 4, 3]).isValid(), true, 'accepts array')
  t.equal(
    spacetime({ year: '2017', month: 4, day: 3 }).isValid(),
    true,
    'accepts unit descriptor object'
  )
  t.equal(spacetime('2017-04-03').isValid(), true, 'accepts iso string')
  t.end()
})
