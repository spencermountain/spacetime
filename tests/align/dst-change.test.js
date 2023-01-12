import test from 'tape'
import spacetime from '../../src/index.js'
import { toronto, lisbon, melbourne } from './times/dst-changes.js'


test('toronto spring dst ', (t) => {
  toronto.spring.forEach(a => {
    let [epoch, iso, tz] = a
    let str = spacetime(epoch, tz).fmt('iso-medium')
    t.equal(str, iso, `Toronto-spring-dst - ${iso}`)
  })
  t.end()
})

test('toronto fall dst ', (t) => {
  toronto.fall.forEach(a => {
    let [epoch, iso, tz] = a
    let str = spacetime(epoch, tz).fmt('iso-medium')
    t.equal(str, iso, `Toronto-fall-dst - ${iso}`)
  })
  t.end()
})

test('lisbon spring dst ', (t) => {
  lisbon.spring.forEach(a => {
    let [epoch, iso, tz] = a
    let str = spacetime(epoch, tz).fmt('iso-medium')
    t.equal(str, iso, `lisbon-spring-dst - ${iso}`)
  })
  t.end()
})

test('lisbon fall dst ', (t) => {
  lisbon.fall.forEach(a => {
    let [epoch, iso, tz] = a
    let str = spacetime(epoch, tz).fmt('iso-medium')
    t.equal(str, iso, `lisbon-fall-dst - ${iso}`)
  })
  t.end()
})
test('melbourne spring dst ', (t) => {
  melbourne.spring.forEach(a => {
    let [epoch, iso, tz] = a
    let str = spacetime(epoch, tz).fmt('iso-medium')
    t.equal(str, iso, `melbourne-spring-dst - ${iso}`)
  })
  t.end()
})

test('melbourne fall dst ', (t) => {
  melbourne.fall.forEach(a => {
    let [epoch, iso, tz] = a
    let str = spacetime(epoch, tz).fmt('iso-medium')
    t.equal(str, iso, `melbourne-fall-dst - ${iso}`)
  })
  t.end()
})