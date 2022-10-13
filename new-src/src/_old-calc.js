
const byDateObj = function (obj, year, offset) {
  let d = new Date([year, obj.month, 1])
  let currentDay = d.getDay()
  // set to the right day eg 'monday'
  if (currentDay !== obj.day) {
    let distance = (obj.day + 7 - currentDay) % 7;
    d.setDate(1 + distance)
  }
  if (obj.num === 1) {
    return d
  }
  if (obj.num === 2) {
    d.setDate(d.getDate() + 7)
    return d
  }
  if (obj.num === 3) {
    d.setDate(d.getDate() + 14)
    return d
  }
  if (obj.num === 'last') {
    // get the last sunday in the month
    let m = d.getMonth()
    while (d.getMonth() === m) {
      d.setDate(d.getDate() + 7)
    }
    d.setDate(d.getDate() - 7)
  }

  return d //+ bias
}


const calcPattern = function (obj, year, offset) {
  let d = byDateObj(obj, year)
  // offset *= 60
  // console.log(d.getTimezoneOffset() / 60, offset)
  let bias = d.getTimezoneOffset() || 0
  bias *= 60 * 1000

  // offset = offset * 60 * 60 * 1000
  // console.log('offset', offset)
  let epoch = d.getTime()
  return epoch + bias
}

export default calcPattern