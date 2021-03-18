const weekStart = require('./src/input/weekStart');

console.log('#1: ', weekStart());
console.log('#2: ', weekStart(12));
console.log('#3: ', weekStart(null));
console.log('#4: ', weekStart(''));
console.log('#5: ', weekStart(undefined));
console.log('#6: ', weekStart('abc'));
// all returns results for current tz, f.e.
// { day: 'sunday', country: 'canada' }

console.log('#7: ', weekStart('slovakia'));
// tz: europe/bratislava
// { day: 'monday', country: 'slovakia' }

console.log('#8: ', weekStart('iran'));
//tz: asia/tehran
// { day: 'saturday', country: 'iran' }

console.log('#9: ', weekStart('canAda'));
//tz: f.e. america/montreal
// { day: 'sunday', country: 'canada' }

console.log('#10: ', weekStart('lize'));
// tz: america/belize
// { day: 'monday', country: 'belize' }

console.log('#11: ', weekStart('el salvador'));
// tz: america/el_salvador
// { day: 'monday', country: 'el salvador' }

console.log('#12: ', weekStart('zulu'));
// tz: etc/zulu
// { day: 'monday', location: 'zulu' }

console.log('#13: ', weekStart('gmt'));
// tz: f.e. etc/gmt
// { day: 'monday', location: 'gmt' }

console.log('#14: ', weekStart('antarctica'));
// tz: f.e. antarctica/south_pole
// { day: 'monday', location: 'antarctica' }

console.log('#15: ', weekStart('arctic'));
// tz: f.e. arctic/longyearbyen
// { day: 'monday', location: 'arctic' }

