import spacetime from './lib/index.js'
import test from 'tape'
import api from '../api/index.js'

test('test main methods', (t) => {
  Object.keys(api.main).forEach((k) => {
    let s = spacetime('1998-03-28')
    s[k]()
    t.ok(true, k)
  })
  t.end()
})

test('test getter methods', (t) => {
  Object.keys(api.getters).forEach((k) => {
    let s = spacetime('1998-03-28')
    s[k]()
    t.ok(true, k)
  })
  t.end()
})

test('test util methods', (t) => {
  Object.keys(api.utils).forEach((k) => {
    //skip these ones
    if (k === 'd' || k === 'log' || k === 'i18n' || k === 'weekStart') {
      t.ok(true, k)
      return
    }
    let s = spacetime('1998-03-28')
    s[k]()
    t.ok(true, k)
  })
  t.end()
})
