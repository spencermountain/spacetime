'use strict';
const test = require('tape');
const spacetime = require('../src');
const tk = require('timekeeper');

test('now-is-now', (t) => {
  var time = new Date(1554092400000); // 4:20, april 1st 2019 GMT
  tk.travel(time);

  let d = spacetime(null, 'Etc/GMT');
  t.equal(d.format().nice.short, 'Apr 1st, 4:20am', 'date object mocked to 4:20');

  d = spacetime.now('Etc/GMT');
  t.equal(d.format().nice.short, 'Apr 1st, 4:20am', 'its 4:20 now');

  d = spacetime.now('Canada/Eastern');
  t.equal(d.format().nice.short, 'Apr 1st, 12:20am', 'its not 4:20 in toronto');

  tk.reset();
  t.end();
});


test('epoch-input', (t) => {
  let gmt420 = 1554092400000;
  var time = new Date(gmt420); // 4:20, april 1st 2019 GMT
  tk.travel(time);

  let moved = spacetime.now('Etc/GMT'); //4:20
  moved.goto('Canada/Eastern');

  let epoch = spacetime(gmt420, 'Canada/Eastern');
  t.equal(moved.format().nice.short, epoch.format().nice.short, 'epoch input moves with goto');

  let explicit = spacetime([2019, 3, 1, 0, 20], 'Canada/Eastern');
  t.ok(explicit.isSame(epoch, 'hour'), 'explicit inputs==epoch inputs');

  tk.reset();
  t.end();
});
