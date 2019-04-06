const test = require('tape')
const spacetime = require('./lib')
test('add', t => {
  t.equal(
    spacetime('2012-10-28 00:00:00+01:00')
      .goto('Europe/London')
      .add(1, 'days')
      .format('iso'),
    '2012-10-29T00:00:00Z',
    'adding 1 day while crossing a DST boundary should not affect time (BST -> GMT).'
  )
  t.equal(
    spacetime('2013-11-03T00:00:00-07:00')
      .goto('America/Los_Angeles')
      .add(1, 'day')
      .format('iso'),
    '2013-11-04T00:00:00-08:00',
    'adding 1 day while crossing a DST boundary should not affect time (PDT-> PST).'
  )
  t.equal(
    spacetime('2014-03-09T00:00:00-08:00')
      .goto('America/Los_Angeles')
      .add(1, 'day')
      .format('iso'),
    '2014-03-10T00:00:00-07:00',
    'adding 1 day while crossing a DST boundary should not affect time (PST -> PDT).'
  )
  t.end()
})
//
// test('subtract', t => {
//   t.equal(
//     spacetime('2012-10-29T00:00:00+00:00').goto('Europe/London').subtract(1, 'days').format('iso'),
//     '2012-10-28T00:00:00+01:00',
//     "subtracting 1 day while crossing a DST boundary should not affect time (GMT -> BST)."
//   );
//   t.equal(
//     spacetime("2013-11-04T00:00:00-08:00").goto('America/Los_Angeles').subtract(1, 'day').format('iso'),
//     '2013-11-03T00:00:00-07:00',
//     "adding 1 day while crossing a DST boundary should not affect time (PST -> PDT)."
//   );
//   t.equal(
//     spacetime("2014-03-10T00:00:00-07:00").goto('America/Los_Angeles').subtract(1, 'day').format('iso'),
//     "2014-03-09T00:00:00-08:00",
//     "adding 1 day while crossing a DST boundary should not affect time (PDT -> PST)."
//   );
//   t.end();
// })
//
// test('month', t => {
//   t.equal(
//     spacetime("2014-03-09T00:00:00-08:00").goto('America/Los_Angeles').add(1, 'month').format('iso'),
//     "2014-04-09T00:00:00-07:00",
//     "adding 1 month while crossing a DST boundary should not affect time (PST -> PDT)."
//   );
//   t.equal(
//     spacetime("2014-03-09T00:00:00-08:00").goto('America/Los_Angeles').month(3).format('iso'),
//     "2014-04-09T00:00:00-07:00",
//     "setting month across a DST boundary should not affect time (PST -> PDT)."
//   );
//
//   t.end();
// })

// test('issame', t => {
//   let m1 = spacetime('2014-10-01T00:00:00', 'Europe/London');
//   let m2 = spacetime('2014-10-01T00:00:00', 'Europe/London');
//
//   let lastDayOfMonth = m1.clone().endOf('month').date();
//
//   for (let day1 = 1; day1 <= lastDayOfMonth; day1++) {
//     for (let day2 = 1; day2 <= lastDayOfMonth; day2++) {
//       m1.date(day1);
//       m2.date(day2);
//       t.ok(
//         m1.isSame(m2, 'month'),
//         'month should be the same for ' + m1.format('iso') + ' and ' + m2.format('iso')
//       );
//     }
//   }
//
//   let m3 = spacetime('2014-09-09T00:00:00', 'America/Chicago');
//   let m4 = spacetime('2014-09-09T01:00:00', 'America/Toronto');
//
//   for (let hour1 = 0; hour1 <= 22; hour1++) {
//     for (let hour2 = 1; hour2 <= 23; hour2++) {
//       m3.hour(hour1);
//       m4.hour(hour2);
//
//       t.ok(
//         m3.isSame(m4, 'day'),
//         'day should be the same for ' + m3.format('iso') + ' and ' + m4.format('iso')
//       );
//       t.ok(
//         m4.isSame(m3, 'day'),
//         'day should be the same for ' + m4.format('iso') + ' and ' + m3.format('iso')
//       );
//     }
//   }
//
//   t.end();
// })
