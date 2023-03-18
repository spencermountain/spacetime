import parseOffset from '../text/units/offset.js'

const isNumber = val => {
  return typeof val === 'number' && isFinite(val)
}

// this method is replaced in /two
const parseTz = function (input, world) {
  let { zones, config } = world

  if (input === null || input === undefined) {
    return null
  }
  // parse something like '+05:00'
  let h = parseOffset(input)
  if (h || h === 0) {
    input = h
  }
  // shim-together a timezone from a numeric offset
  if (isNumber(input) === true) {
    let n = input
    if (n === 0) {
      return 'Etc/GMT'
    }
    if (n < 0) {
      return `Etc/GMT+${Math.abs(n)}`//reversed
    }
    return `Etc/GMT${n * -1}`
  }
  if (input === 'z' || input === 'Z') {
    return 'Etc/GMT'
  }
  if (zones.hasOwnProperty(input)) {
    return input // looks good
  }
  if (config.throwUnknownTz) {
    let err = new Error(`Spacetime: Unknown timezone: '${input}'`);
    err.type = 'UnknownTimezone'
    throw err
  }

  return null
}
export default parseTz