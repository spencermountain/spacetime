'use strict';
const test = require('tape');
const spacetime = require('./lib');

test('informal timezones', t => {
  var tz = 'Canada/Toronto'
  var s = spacetime('November 11, 1999', tz);
  s = s.startOf('day')
  t.equal(s.format('nice'), '', tz)


  // s = s.goto('Jamaica') // "America/Jamaica"
  // s = s.goto('Eastern Time') // "America/New_York"
  // s = s.goto('PST') // -8h (not the same as PDT!)
  // s = s.goto('GMT+8') // -8h!
  // s = s.goto('-7h') // -7h
  // s = s.goto('bst') //"British summer time" +1 (sorry Bougainville!)

})
