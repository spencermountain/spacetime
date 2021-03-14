const React = require('react')
const calc = require('./_calc')
const { Text, Box, Newline } = require('ink')
const importJsx = require('import-jsx')
const Week = importJsx('./Week')

const Month = function (input) {
	let s = input.start
	let month = s.month()
	let weeks = calc(s)
	//hide non-days
	weeks[0].forEach((day) => {
		if (day.month() !== month) {
			day.hide = true
		}
	})
	weeks[weeks.length - 1].forEach((day) => {
		if (day.month() !== month) {
			day.hide = true
		}
	})
	// borderStyle="single"
	return (
		<Box width={22} flexDirection="col" margin={1}>
			{/* month title */}
			<Box alignSelf="center">
				<Text>{s.format('{month} {year}')}</Text>
			</Box>
			{/* day names */}
			<Box width="100%" alignItems="flex-start" flexDirection="row" alignItems="flex-end">
				{weeks[0].map((d, i) => (
					<Box key={i} width="14%">
						<Text key={i} width="14%" dimColor>
							{d.format('day-short').substr(0, 2)}
						</Text>
					</Box>
				))}
			</Box>
			{/* each week */}
			{weeks.map((arr, i) => (
				<Week key={i} days={arr} />
			))}
		</Box>
	)
}
module.exports = Month
