// a smoke-test for our typescipt typings
// to run:
// npm install -g ts-node
// npm install --no-save @types/tape @types/node
// npm run test:type

import * as test from 'tape'
import { spacetime } from './spacetime-static'

test('typefile smoketest', (t: test.Test) => {
  t.ok(spacetime, 'import works')
  const d = spacetime('June 5th 2019')
  t.equal(d.format('iso-short'), '2019-06-05', 'basic-smoketest')
  t.end()
})

test('typefile static api exists', (t: test.Test) => {
  t.equal(typeof spacetime, 'function', 'default is a function')
  t.equal(typeof spacetime.now, 'function', '.now() is a function')
  t.equal(typeof spacetime.today, 'function', '.today() is a function')
  t.equal(typeof spacetime.tomorrow, 'function', '.tomorrow is a function')
  t.end()
})
