import test from 'tape'
import spacetime from '../../src/index.js'
import { toronto, lisbon } from './times/dst-changes.js'


test('toronto spring dst ', (t) => {
  toronto.spring.forEach(a => {
    let [epoch, iso, tz] = a
    let str = spacetime(epoch, tz).iso()
    t.equal(str, iso, `Toronto-spring-dst - ${iso}`)
  })
  t.end()
})

test('toronto fall dst ', (t) => {
  toronto.fall.forEach(a => {
    let [epoch, iso, tz] = a
    let str = spacetime(epoch, tz).iso()
    t.equal(str, iso, `Toronto-fall-dst - ${iso}`)
  })
  t.end()
})

test('lisbon spring dst ', (t) => {
  lisbon.spring.forEach(a => {
    let [epoch, iso, tz] = a
    let str = spacetime(epoch, tz).iso()
    t.equal(str, iso, `lisbon-spring-dst - ${iso}`)
  })
  t.end()
})

test('lisbon fall dst ', (t) => {
  lisbon.fall.forEach(a => {
    let [epoch, iso, tz] = a
    let str = spacetime(epoch, tz).iso()
    t.equal(str, iso, `lisbon-fall-dst - ${iso}`)
  })
  t.end()
})