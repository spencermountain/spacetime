/* eslint-disable no-console */
const green = str => '\x1b[32m' + str + '\x1b[0m'
const red = str => '\x1b[31m' + str + '\x1b[0m'
const blue = str => '\x1b[34m' + str + '\x1b[0m'
const magenta = str => '\x1b[35m' + str + '\x1b[0m'
const cyan = str => '\x1b[36m' + str + '\x1b[0m'
const yellow = str => '\x1b[33m' + str + '\x1b[0m'
const black = str => '\x1b[30m' + str + '\x1b[0m'
const dim = str => '\x1b[2m' + str + '\x1b[0m'

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
  console.log(` ${dim(s.epoch)}  ${cyan(s.format('offset'))}\n`)
  console.log(`  │ ${dim('year' + ':').padEnd(14)}  ${cyan(s.year())}`)
  console.log(`  │ ${dim('month' + ':').padEnd(14)}  ${cyan(s.month())} (${cyan(s.monthName())})`)
  console.log(`  │ ${dim('date' + ':').padEnd(14)}  ${cyan(s.format('date-ordinal'))} `)//(${cyan(s.format('day-short'))})
  console.log(`  │ ${dim('time' + ':').padEnd(14)}  ${cyan(s.time())} `)
  console.log(`  │ ${dim('tz' + ':').padEnd(14)}  ${yellow(s.tz)} `)
  console.log('\n')
}


const debug = function () {
  // is client-side
  if (typeof window !== 'undefined' && window.document) {
    return clientSide(this)
  }
  return serverSide(this)
}

export default debug
