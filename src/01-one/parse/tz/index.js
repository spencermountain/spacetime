import zones from '../../../02-two/zones/data/index.js'
import aliases from './aliases.js'
import world from '../../../world.js'
import guessTz from '../../../02-two/zones/guessTz.js'

let mapping = { z: 'Etc/GMT' }
Object.keys(zones).forEach(k => {
  mapping[k.toLowerCase()] = k
})

const findTz = function (str) {
  str = str || ''
  if (zones.hasOwnProperty(str)) {
    return str
  }
  str = str.toLowerCase().trim()
  if (aliases.hasOwnProperty(str)) {
    return aliases[str]
  }
  if (mapping.hasOwnProperty(str)) {
    return mapping[str]
  }
  return guessTz() || world.config.fallbackTz
}
export default findTz