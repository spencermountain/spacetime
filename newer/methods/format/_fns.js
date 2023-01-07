
export function titleCase(str) {
  if (!str) {
    return ''
  }
  return str[0].toUpperCase() + str.substr(1)
}

export function ordinal(i) {
  let j = i % 10
  let k = i % 100
  if (j === 1 && k !== 11) {
    return i + 'st'
  }
  if (j === 2 && k !== 12) {
    return i + 'nd'
  }
  if (j === 3 && k !== 13) {
    return i + 'rd'
  }
  return i + 'th'
}

export function zeroPad(str, len = 2) {
  let pad = '0'
  str = str + ''
  return str.length >= len ? str : new Array(len - str.length + 1).join(pad) + str
}