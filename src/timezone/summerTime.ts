const MSEC_IN_HOUR = 60 * 60 * 1000

//convert our local date syntax, like '03/08:02', to a javascript UTC date
const toUtc = (dstChange: string, offset: number, year: number): number => {
  const [month, rest] = dstChange.split('/')
  const [day, hour, minute = '0'] = rest.split(':')
  return Date.UTC(year, Number(month) - 1, Number(day), Number(hour), Number(minute)) - (offset * MSEC_IN_HOUR)
}

// compare epoch with dst change events (in utc)
const inSummerTime = (epoch: number, start: string, end: string, summerOffset: number, winterOffset: number): boolean => {
  const year = new Date(epoch).getUTCFullYear()
  const startUtc = toUtc(start, winterOffset, year)
  const endUtc = toUtc(end, summerOffset, year)
  // simple number comparison now
  return epoch >= startUtc && epoch < endUtc
}

export default inSummerTime
