'use strict'
const test = require('tape')
const weekStart = require('../src/input/weekStart')

test('week by country returns values, when no or falsy argument is supplied', t => {
  t.notEqual(weekStart(),null)
  t.notEqual(weekStart(),undefined)
  t.notEqual(weekStart(12),null)
  t.notEqual(weekStart(12),undefined)

  t.notEqual(weekStart(null),null)
  t.notEqual(weekStart(null),undefined)
  t.notEqual(weekStart(''),null)
  t.notEqual(weekStart(''),undefined)

  t.notEqual(weekStart(undefined),null)
  t.notEqual(weekStart(undefined),undefined)
  t.notEqual(weekStart('abc'),null)
  t.notEqual(weekStart('abc'),undefined)
  t.end()
})

test('JSON values are string and not empty', t => {
  t.equal(typeof weekStart().day,'string')
  t.notEqual(weekStart().day,'')
  t.equal(typeof weekStart().country,'string')
  t.notEqual(weekStart().country,'')
  t.end()
})

test('when supplied full coutry name returns day and country', t => {
  t.equal(weekStart('canada').day,'sunday')
  t.equal(weekStart('canada').country,'canada')
  t.end()
})

test('when supplied partial coutry name returns day and country', t => {
  t.equal(weekStart('united arab emirates').day,'sunday')
  t.equal(weekStart('emirates').country,'united arab emirates')
  t.end()
})

test('country name can be in lower case, upper case or camel case', t => {
  t.equal(weekStart('cana').day,'sunday')
  t.equal(weekStart('nada').country,'grenada')
  t.notEqual(weekStart('nada').country,'canada')
  // finds first occourance of string 'nada' in JSON
  t.equal(weekStart('CANADA').day,'sunday')
  t.equal(weekStart('Canada').country,'canada')
  // it's located in array under key "monday" for
  // grenada and after that appears located in 
  // canada under key "sunday"
  t.equal(weekStart('CaNa').day,'sunday')
  t.equal(weekStart('nAdA').country,'grenada')
  t.notEqual(weekStart('nAdA').country,'canada')
  t.end()
})
