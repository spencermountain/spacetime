import zones from '../../../02-two/zones/index.js'
import aliases from './aliases.js'
import config from '../../../config.js'

let mapping = { z: 'Etc/GMT' }
Object.keys(zones).forEach(k => {
  mapping[k.toLowerCase()] = k
})

const findTz = function (str = '') {
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
  return config.fallbackTz
}
export default findTz