const React = require('react')
const { Text, Box } = require('ink')

/** add spaces to string */
const padStr = function (str, width) {
	str = str.toString()
	while (str.length < width) {
		str = ' ' + str
	}
	return str
}

const Week = function (input) {
	let days = input.days
	// let arr=days.map(obj => )
	// flexGrow={1}
	return (
		<Box alignItems="flex-start" flexDirection="row" alignItems="flex-end">
			{days.map((d, i) => (
				<Box key={i} width="14%">
					{!d.hide && <Text color="grey">{padStr(d.date(), 2)}</Text>}
				</Box>
			))}
		</Box>
	)
}
module.exports = Week
