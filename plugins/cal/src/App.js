const React = require('react')
const { Text, Box } = require('ink')
const importJsx = require('import-jsx')
const Month = importJsx('./Month')

const App = (input) => {
	let { start, opts } = input
	let s = start
	let months = [s]
	for (let i = 1; i < opts.months; i += 1) {
		s = s.add(1, 'month')
		months.push(s)
	}
	let quarters = [months.slice(0, 3), months.slice(3, 6), months.slice(6, 9), months.slice(9, 12)]
	quarters = quarters.filter((a) => a.length > 0)
	return (
		<Box minHeight={10} flexDirection="col">
			{quarters.map((q, k) => (
				<Box key={k} flexDirection="row">
					{q.map((m, i) => (
						<Month key={i} start={m} />
					))}
				</Box>
			))}
		</Box>
	)
}

module.exports = App
