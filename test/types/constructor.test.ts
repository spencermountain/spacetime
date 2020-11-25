import * as test from 'tape'
import { spacetime } from './spacetime-static'
import { ParsableDate } from '../../types/types'

test('static api exists', (t: test.Test) => {
  t.equal(typeof spacetime, 'function', 'default is a function')
  t.equal(typeof spacetime.now, 'function', '.now() is a function')
  t.equal(typeof spacetime.today, 'function', '.today() is a function')
  t.equal(typeof spacetime.tomorrow, 'function', '.tomorrow is a function')
  t.equal(typeof spacetime.yesterday, 'function', '.yesterday is a function')
  t.equal(typeof spacetime.extend, 'function', '.extend is a function')
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
  t.equal(spacetime(<ParsableDate>'2017-04-03').isValid(), true, 'accepts datelike object')

  t.equal(spacetime('2017-04-03', 'America/Vancouver').isValid(), true, 'accepts timezone argument')

  t.equal(
    spacetime('2017-04-03', undefined, { silent: false }).isValid(),
    true,
    'accepts silent option'
  )
  t.equal(
    spacetime('2017-04-03', undefined, { weekStart: 0 }).isValid(),
    true,
    'accepts weekStart option'
  )

  t.end()
})

test('methods have the correct type', (t: test.Test) => {
  t.equal(typeof spacetime().set, 'function', 'set is a function')
  t.equal(typeof spacetime().timezone, 'function', 'timezone is a function')
  t.equal(typeof spacetime().isDST, 'function', 'inDST is a function')
  t.equal(typeof spacetime().hasDST, 'function', 'hasDST is a function')
  t.equal(typeof spacetime().offset, 'function', 'offset is a function')
  t.equal(typeof spacetime().hemisphere, 'function', 'hemisphere is a function')
  t.equal(typeof spacetime().format, 'function', 'format is a function')
  t.equal(typeof spacetime().unixFmt, 'function', 'unixFmt is a function')
  t.equal(typeof spacetime().startOf, 'function', 'startOf is a function')
  t.equal(typeof spacetime().endOf, 'function', 'endOf is a function')
  t.equal(typeof spacetime().leapYear, 'function', 'leapYear is a function')
  t.equal(typeof spacetime().progress, 'function', 'progress is a function')
  t.equal(typeof spacetime().nearest, 'function', 'nearest is a function')
  t.equal(typeof spacetime().diff, 'function', 'diff is a function')
  t.equal(typeof spacetime().since, 'function', 'since is a function')
  t.equal(typeof spacetime().next, 'function', 'next is a function')
  t.equal(typeof spacetime().last, 'function', 'last is a function')
  t.equal(typeof spacetime().isValid, 'function', 'isValid is a function')
  t.equal(typeof spacetime().goto, 'function', 'hasDST is a function')
  t.equal(typeof spacetime().every, 'function', 'goto is a function')
  t.equal(typeof spacetime().isAwake, 'function', 'isAwake is a function')
  t.equal(typeof spacetime().isAsleep, 'function', 'isAsleep is a function')
  t.equal(typeof spacetime().log, 'function', 'log is a function')
  t.equal(typeof spacetime().logYear, 'function', 'logYear is a function')
  t.equal(typeof spacetime().json, 'function', 'json is a function')
  t.equal(typeof spacetime().from, 'function', 'from is a function')
  t.equal(typeof spacetime().fromNow, 'function', 'fromNow is a function')
  t.equal(typeof spacetime().weekStart, 'function', 'weekStart is a function')
  t.equal(typeof spacetime().inDST, 'function', 'inDST is a function')
  t.equal(typeof spacetime().round, 'function', 'round is a function')
  t.equal(typeof spacetime().each, 'function', 'each is a function')

  t.end()
})
