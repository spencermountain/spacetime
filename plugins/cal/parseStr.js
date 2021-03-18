const spacetime = require('spacetime')

const parseDate = function (str) {
	let s = spacetime(str)
	if (s.isValid() === false) {
		s = spacetime.now().month(str)
	}
	if (s.isValid() === false) {
		console.log(`Error: Couldn\'t parse input '${str}'\n`)
		s = spacetime.now()
	}
	return { start: s, end: null }
}
module.exports = parseDate
