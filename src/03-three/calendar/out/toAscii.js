const reset = '\x1b[0m'
//cheaper than requiring chalk
const cli = {
  blue: str => '\x1b[34m' + str + reset,
  dim: str => '\x1b[2m' + str + reset,
  italic: str => '\x1b[3m' + str + reset,
  grey: str => '\x1b[90m' + str + reset,
}

const pad = num => String(num).padStart(2, ' ')

const toCLI = function (res) {
  let s = res[0][6]
  let str = `\n    ${s.format('{month} {year}')}\n`
  str += cli.dim(' Mo Tu We Th Fr Sa Su\n')
  // print the days
  res.forEach(days => {
    days.forEach(obj => {
      if (obj.empty === true) {
        str += '   '
      } else if (obj.selected) {
        str += ' ' + cli.blue(pad(obj.date))
      } else {
        str += ' ' + pad(obj.date())
      }
    })
    str += '\n'
  })
  str += '\n'
  return str
}
export default toCLI