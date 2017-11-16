'use strict';
var test = require('tape');
var spacetime = require('../src');

test('to-from utc-format', t => {
  [
    '1998-05-01T08:00:00:000Z',
    '1998-05-30T22:00:00:000Z',
    '2017-01-01T08:00:00:000Z',
    '2017-01-30T22:00:00:000Z',
    '2016-02-02T08:00:00:000Z',
    '2016-02-02T09:00:00:100Z',
    '2016-11-02T08:01:22:023Z',
    '2016-11-04T09:00:59:122Z',
    '2015-01-02T20:01:22:023Z',
    '2016-03-28T09:01:00:999Z',
  ].forEach(str => {
    var s = spacetime(str, 'Asia/Taipei');
    var out = s.format('iso');
    t.equal(str, out, 'equal - ' + str);
  });

  var str = '2016-01-01T09:00:00:122Z';
  var s = spacetime(str, 'Canada/Eastern');
  t.equal(s.format('iso'), str, 'input matches output');

  t.end();
});


test('unix-formatting', t => {
  let epoch = 1510850065194
  let s = spacetime(epoch, 'Canada/Eastern')
  let arr = [
    ['h:mm a', '11:34 am'],
  // ['', ''],
  // ['', ''],
  // ['', ''],
  // ['', ''],
  // ['', ''],
  // ['', ''],
  // ['', ''],
  ]
  arr.forEach((a) => {
    t.equal(s.format(a[0]), a[1], a[0])
  })
  t.end();
});
