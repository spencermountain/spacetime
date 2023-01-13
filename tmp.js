
import metas from './zonefile/metas.js'
import iana from './zonefile/iana.js'
let zones = iana
// let all = {}
Object.keys(zones).forEach(k => {
  zones[k].shrt = (metas[k] || []).join('|')
  // console.log(str)
})
console.log(JSON.stringify(zones, null, 2))