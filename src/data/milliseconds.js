let o = {
  millisecond: 1
}
o.second = 1000
o.minute = 60000
o.hour = 3.6e6 // dst is supported post-hoc
o.day = 8.64e7 //
o.date = o.day
o.month = 8.64e7 * 29.5 //(average)
o.week = 6.048e8
o.year = 3.154e10 // leap-years are supported post-hoc
//add plurals
Object.keys(o).forEach(k => {
  o[k + 's'] = o[k]
})
export default o
