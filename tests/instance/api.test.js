import spacetime from '../_lib/index.js'
import test from 'tape'
import api from '../../api/index.js'

const instanceSections = ['main', 'getters', 'utils']

// methods that exist on the prototype but are intentionally left out of the docs
// (aliases, deprecated members, or internal helpers)
const undocumented = new Set([
  // add/subtract aliases
  'plus',
  'minus',
  'days',
  'hours',
  'minutes',
  'seconds',
  'milliseconds',
  // getter aliases
  'h12',
  'h24',
  'hour24',
  'millenium', // misspelled alias of millennium
  // deprecated
  'toLocalDate',
  // internal
  'debug'
])

const staticUndocumented = new Set([
  'plugin' // alias of extend
])

// every documented instance method should actually exist as a function
test('documented instance methods exist', (t) => {
  const s = spacetime('1998-03-28')
  instanceSections.forEach((section) => {
    Object.keys(api[section]).forEach((k) => {
      t.equal(typeof s[k], 'function', `${section}.${k} exists`)
    })
  })
  t.end()
})

// every documented static method should actually exist as a function
test('documented static methods exist', (t) => {
  Object.keys(api.statics).forEach((k) => {
    t.equal(typeof spacetime[k], 'function', `statics.${k} exists`)
  })
  t.end()
})

// every public instance method should be documented (catches docs falling behind the code)
test('public instance methods are documented', (t) => {
  const s = spacetime('1998-03-28')
  const documented = new Set(instanceSections.flatMap((section) => Object.keys(api[section])))
  const proto = Object.getPrototypeOf(s)
  Object.getOwnPropertyNames(proto)
    .filter((k) => k !== 'constructor' && typeof s[k] === 'function')
    .forEach((k) => {
      if (undocumented.has(k)) {
        return
      }
      t.ok(documented.has(k), `${k} is documented in api/index.js`)
    })
  t.end()
})

// every public static method should be documented
test('public static methods are documented', (t) => {
  const documented = new Set(Object.keys(api.statics))
  Object.getOwnPropertyNames(spacetime)
    .filter((k) => !['length', 'name', 'prototype'].includes(k) && typeof spacetime[k] === 'function')
    .forEach((k) => {
      if (staticUndocumented.has(k)) {
        return
      }
      t.ok(documented.has(k), `spacetime.${k} is documented in api/index.js`)
    })
  t.end()
})
