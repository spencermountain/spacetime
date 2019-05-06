// a smoke-test for our typescipt typings
// to run:
// npm install -g typescript
// npm install -g ts-node
// npm install --no-save @types/tape @types/node
// npm run test:types

import * as test from 'tape'
import { spacetime } from './spacetime-static'

test('typefile smoketest', (t: test.Test) => {
  t.ok(spacetime, 'import works')
  const d = spacetime('June 5th 2019')
  t.equal(d.format('iso-short'), '2019-06-05', 'basic-smoketest')
  t.end()
})

// Add reference to the other files so they included in the test build
import './constructor.test'
import './types.test'
