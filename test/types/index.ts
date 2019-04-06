// a smoke-test for our typescipt typings
// to run:
// npm install -g ts-node
// npm install --no-save @types/tape @types/node
// npm run test:type
import * as test from 'tape'
import * as spacetime from '../../'

test('typefile smoketest', (t: test.Test) => {
  t.ok(true)

  const d = spacetime('June 5th 2019')
  t.equal(d.format('iso-short'), '2019-06-05', 'basic-smoketest')
  t.end()
})
