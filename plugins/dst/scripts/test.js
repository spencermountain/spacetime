import zones from './zonefile.2022.js'
import patterns from './patterns.js'


const calculate = function (obj, year) {
  let d = new Date([2022, obj, 01]).getDay()
}

Object.keys(zones).forEach(k => {
  if (zones[k].dst) {
    let pattern = patterns[zones[k].pattern]

    //  `${}/${}:${}->`
    console.log(k, pattern)
  }
})