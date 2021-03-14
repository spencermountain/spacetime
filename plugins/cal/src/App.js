const React = require('react')
const { Text, Box } = require('ink')
const spacetime = require('spacetime')
const importJsx = require('import-jsx')
const Month = importJsx('./Month')

const App = (input) => {
	let { str, opts } = input
	let s = spacetime(str)
	if (s.isValid() === false) {
		s = spacetime.now().month(str)
	}
	if (s.isValid() === false) {
		console.log(`Error: Couldn\'t parse input '${str}'\n`)
		s = spacetime.now()
	}
	return (
		<Box height={10} flexDirection="row">
			<Month start={s} />
		</Box>
	)
}

module.exports = App
