import zones from '../zonefile/iana.js'

import fs from 'fs'
let last = null


let out = ''
Object.keys(zones).sort().forEach(k => {
  let z = zones[k]
  let names = k.split('/')
  let area = names.shift()
  if (area !== last) {
    last = area
    out += area + '\n'
  }
  let name = names.join('/')
  let str = `\t${name},${z.offset},${z.shrt}`
  if (z.dst) {
    str += ',' + z.dst
  }
  if (z.hem !== 'n') {
    str += ',' + z.hem
  }
  out += str + '\n'
})

fs.writeFileSync('./src/zones/_pckd.js', `export default \`${out}\``)
