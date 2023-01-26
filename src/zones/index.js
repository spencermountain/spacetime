import pckd from './_pckd.js'
import aliases from '../../zonefile/aliases.js'

let zones = {}
let area = null
// unpack compressed iana file
pckd.split('\n').forEach(line => {
  if (!/^\t/.test(line)) {
    area = line.trim()
    return
  }
  let [name, offset, shrt, dst, hem] = line.split(/,/)
  let iana = `${area}/${name.trim()}`
  shrt = shrt.split(/\|/)
  offset = Number(offset)
  zones[iana] = { offset, shrt }
  if (dst) {
    zones[iana].dst = dst
  }
  zones[iana].hem = hem ? hem : 'n'
})

// add aliases
Object.keys(aliases).forEach(k => {
  zones[k] = zones[aliases[k]]
  if (!zones[k]) {
    console.log(k)
  }
})
export default zones
