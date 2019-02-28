const spacetime = require('./src/index')

console.log(spacetime('March 10, 2019 23:01:00', 'Canada/Pacific').isDST());
console.log(spacetime('March 11, 2019 00:01:00', 'Canada/Pacific').isDST());
console.log(spacetime('March 11, 2019 01:01:00', 'Canada/Pacific').isDST());
console.log(spacetime('March 11, 2019 02:01:00', 'Canada/Pacific').isDST());
console.log(spacetime('March 11, 2019 03:01:00', 'Canada/Pacific').isDST());
