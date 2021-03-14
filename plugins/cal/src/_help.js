const React = require('react')
const { Text, Box } = require('ink')

let examples = [
	{ cmd: '', desc: 'show current month' },
	{ cmd: 'june 2020', desc: 'show given month' },
	{ cmd: '--year', desc: 'show a year' },
	{ cmd: ' --quarter', desc: 'show the current quarter' },
	{ cmd: 'march 2020 -m=5', desc: 'show a given number of months, going forward' }
]

const Help = function () {
	return (
		<Box flexDirection="col" alignItems="flex-start" margin={1}>
			{examples.map((obj, i) => (
				<Box key={i} minHeight={4} width="100%" flexDirection="col">
					<Box flexDirection="row">
						<Text color="yellow"> &nbsp; spacetime-cal</Text>
						<Text color="yellow" italic>
							{' ' + obj.cmd}
						</Text>
					</Box>
					<Box>
						<Text color="grey">{'      ' + obj.desc}</Text>
					</Box>
				</Box>
			))}
		</Box>
	)
}
module.exports = Help
