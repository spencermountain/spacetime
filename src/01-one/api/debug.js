/* eslint-disable no-console */
const cyan = str => '\x1b[36m' + str + '\x1b[0m'
const yellow = str => '\x1b[33m' + str + '\x1b[0m'
const dim = str => '\x1b[2m' + str + '\x1b[0m'
const green = str => '\x1b[32m' + str + '\x1b[0m'
const red = str => '\x1b[31m' + str + '\x1b[0m'
const blue = str => '\x1b[34m' + str + '\x1b[0m'
const magenta = str => '\x1b[35m' + str + '\x1b[0m'
const black = str => '\x1b[30m' + str + '\x1b[0m'
const italic = str => '\x1b[3m' + str + '\x1b[0m'

const clientSide = function (s) {
  console.log('%c -=-=- ', 'background-color:#6699cc;')
  console.groupCollapsed(`${s.epoch}   ${s.tz}`)
  let out = {
    year: s.year(),
    month: `${s.monthName()} (${s.month()})`,
    date: `${s.format('date-ordinal')})`,
    time: `${s.time()})`,
    tz: `${s.tz})`
  }
  console.table(out)
  console.groupEnd();
}

const serverSide = function (s) {
  console.log('\n')
  console.log(`  │${dim(':')} ${cyan(s.monthName())} ${blue(s.format('date-ordinal'))} ${cyan(s.year())}`)// (${cyan(s.month())})
  console.log(`  │${dim(':')}      ${dim(blue('::'))}${blue(s.dayName())}${dim(blue('::'))}`)//(${cyan(s.format('day-short'))})
  console.log(`  │${dim(':')}    ${cyan(s.time())}  ${blue(dim(s.format('{second}s {millisecond}ms')))}`)
  console.log(`  │${dim(':')} ${yellow(s.tz)}  ${yellow(s.format('offset'))}`)
  console.log(`\n   ${blue(dim(s.epoch))} \n`)
  console.log('\n')
}


const debug = function () {
  // is client-side
  if (typeof window !== 'undefined' && window.document) {
    clientSide(this)
  } else {
    serverSide(this)
  }
  return this
}

export default debug
