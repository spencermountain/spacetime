const MSEC_IN_HOUR = 60 * 60 * 1000

//convert our local date syntax a javascript UTC date
const toUtc = (dstChange, offset, year) => {
  const [month, rest] = dstChange.split('/')
  const [day, hour] = rest.split(':')
  return Date.UTC(year, month - 1, day, hour) - (offset * MSEC_IN_HOUR)
}

// compare epoch with dst change events (in utc)
const inSummerTime = (epoch, start, end, summerOffset, winterOffset) => {
  const year = new Date(epoch).getUTCFullYear()
  const startUtc = toUtc(start, winterOffset, year)
  const endUtc = toUtc(end, summerOffset, year)
  // simple number comparison now
  return epoch >= startUtc && epoch < endUtc
}

export default inSummerTime
