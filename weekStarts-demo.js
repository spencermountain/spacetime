const weekStarts = require('./src/input/weekStarts');

// currently zou have to supply as an argument name of the state, further version will 
// find out the state itself. Name of the state can be in any case.
// It finds out index of the day and uses days.long() to return a string
// Can be used 3 letter short form of coutry name (ISO3166) or usual long name
// https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
console.log(`
First day of week in Canada is ${weekStarts('canada')}
`);

console.log(`
First day of week in United States is ${weekStarts('UniTed STATES')}
`);
console.log(`
First day of week in United Kingdom is ${weekStarts('gbr')}
`);
console.log(`
First day of week in United Arab Emirates is ${weekStarts('aRaB eM')}
`);