const React = require('react')
const { Text, Box } = require('ink')
const spacetime = require('spacetime')
const calc = require('./_calc')
const importJsx = require('import-jsx')
const Month = importJsx('./Month')

const App = (input) => {
	let { str, opts } = input
	let s = spacetime(str)
	s = s.startOf('month')
	console.log()
	return (
		<Box height={10} flexDirection="row">
			<Box borderStyle="single" width={20} flexDirection="col">
				<Month start={s} />
			</Box>
		</Box>
	)
}

module.exports = App
