// create all day objects
const calculate = function (date) {
	let start = date.startOf('month')
	let monday = start.startOf('week') //.minus(1, 'second')

	let weeks = []
	let d = monday
	for (let w = 0; w < 6; w += 1) {
		let week = []
		for (let i = 0; i < 7; i += 1) {
			week.push(d)
			d = d.add(1, 'day')
		}
		weeks.push(week)
		let sunday = week[week.length - 1]
		if (sunday.isSame(start, 'month') === false) {
			return weeks
		}
	}
	// // format them
	// weeks = weeks.map((arr) => {
	// 	return arr.map((d) => {
	// 		return {
	// 			date: d.date(),
	// 			isWeekend: false
	// 		}
	// 	})
	// })
	return weeks
}
module.exports = calculate
