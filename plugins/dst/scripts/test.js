import zones from './zonefile.2022.js'
import patterns from './patterns.js'
// import spacetime from '../../../src/index.js'


const calculate = function (obj, year) {
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
    d.setDate(d.getDate() + 7)
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
  return d
}

const pad = (num) => {
  return String(num).padStart(2, '0')
}

Object.keys(zones).forEach(k => {
  if (zones[k].dst) {
    let pattern = patterns[zones[k].pattern]
    let start = calculate(pattern.start, 2022)
    let end = calculate(pattern.end, 2022)
    let dst = `${pad(start.getMonth() + 1)}/${pad(start.getDate())}:${pad(pattern.start.hour)}->`
    dst += `${pad(end.getMonth() + 1)}/${pad(end.getDate())}:${pad(pattern.end.hour)}`



    // console.log(k, pattern)
    if (dst !== zones[k].dst) {
      console.log('\n', k)
      console.log(pattern)
      console.log('made', dst)
      console.log('want', zones[k].dst)
    }
    console.log(dst === zones[k].dst)
  }
})

// console.log(calculate({ num: 1, day: 0, month: 3, hour: 0 }, 2022))