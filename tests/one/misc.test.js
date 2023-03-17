import test from 'tape'
import spacetime from './_lib.js'
let here = '[misc-one] '

test('.now() method', (t) => {
  let s = spacetime('june 1st').now()
  let now = spacetime.now()
  t.ok(s.isSame('day', now), '.now() method')
  t.end()
})
