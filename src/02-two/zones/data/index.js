import pckd from './_pckd.js'

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

//add etc/gmt+n
for (let i = -14; i <= 14; i += 0.5) {
  let num = i
  if (num > 0) {
    num = '+' + num
  }
  // Etc/GMT-5
  let name = 'Etc/GMT' + num
  zones[name] = {
    offset: i * -1, //they're negative!
    hem: 'n' //(sorry)
  }
  let alias = 'UTC/GMT' + num //this one too, why not.
  zones[alias] = zones[name]
}
// this appear sometimes
zones['Etc/GMT+0'] = zones['Etc/GMT']
zones['Etc/GMT-0'] = zones['Etc/GMT']
// add aliases
// Object.keys(aliases).forEach(k => {
//   zones[k] = zones[aliases[k]]
//   if (!zones[k]) {
//     console.log(k)
//   }
// })
export default zones
