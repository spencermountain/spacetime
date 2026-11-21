const MSEC_IN_HOUR = 60 * 60 * 1000

//convert our local date syntax, like '03/08:02', to a javascript UTC date
const toUtc = (dstChange: string, offset: number, year: number): number => {
  const [month, rest] = dstChange.split('/')
  const [day, hour, minute = '0'] = rest.split(':')
  return Date.UTC(year, Number(month) - 1, Number(day), Number(hour), Number(minute)) - (offset * MSEC_IN_HOUR)
}

// compare epoch with dst change events (in utc)
// a year with only one change leaves a side empty: '->11/07:01' is on from the start
// of the (utc) year, and '03/14:02->' stays on until the end of it
const inSummerTime = (epoch: number, start: string, end: string, summerOffset: number, winterOffset: number): boolean => {
  const year = new Date(epoch).getUTCFullYear()
  const startUtc = start ? toUtc(start, winterOffset, year) : -Infinity
  const endUtc = end ? toUtc(end, summerOffset, year) : Infinity
  // simple number comparison now
  return epoch >= startUtc && epoch < endUtc
}

export default inSummerTime
