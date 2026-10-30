import data from './_build.js'
import prefixes from './_prefixes.js'
import type { Zone, TimezoneSet } from '../src/types/index.ts'

const all: TimezoneSet = {}
Object.keys(data).forEach((k) => {
  const split = k.split('|')
  const obj: Zone = {
    offset: Number(split[0]),
    hem: split[1]
  }
  if (split[2]) {
    obj.dst = split[2]
  }
  const names: string[] = data[k].split(',')
  names.forEach((str) => {
    str = str.replace(/(^[0-9]+)\//, (_before, num) => {
      return prefixes[Number(num)] + '/'
    })
    all[str] = obj
  })
})

all.utc = {
  offset: 0,
  hem: 'n' //default to northern hemisphere - (sorry!)
}

//add fixed offsets in quarter-hour steps (including +05:45 and +12:45)
for (let i = -14; i <= 14; i += 0.25) {
  const num = i > 0 ? '+' + i : String(i)
  let name = 'etc/gmt' + num
  all[name] = {
    offset: i * -1, //they're negative!
    hem: 'n' //(sorry)
  }
  name = 'utc/gmt' + num //this one too, why not.
  all[name] = {
    offset: i * -1,
    hem: 'n'
  }
}

export default all
