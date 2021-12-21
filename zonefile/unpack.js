import data from './_build.js'
import prefixes from './_prefixes.js'

let all = {}
Object.keys(data).forEach((k) => {
  let split = k.split('|')
  let obj = {
    offset: Number(split[0]),
    hem: split[1]
  }
  if (split[2]) {
    obj.dst = split[2]
  }
  let names = data[k].split(',')
  names.forEach((str) => {
    str = str.replace(/(^[0-9]+)\//, (before, num) => {
      num = Number(num)
      return prefixes[num] + '/'
    })
    all[str] = obj
  })
})

all.utc = {
  offset: 0,
  hem: 'n' //default to northern hemisphere - (sorry!)
}

//add etc/gmt+n
for (let i = -14; i <= 14; i += 0.5) {
  let num = i
  if (num > 0) {
    num = '+' + num
  }
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
