// 'z', 'zulu', 'etc/utc' ..
const isUtc = /^(?:z|(?:etc\/)?(?:utc|uct|universal|zulu))$/i

// Normalize offset shorthand without loading Spacetime's timezone database.
const timezone = (input: unknown, fallback: string): string => {
  if (input === undefined || input === null || input === '') {
    return fallback
  }
  const str = String(input).trim()
  // every name for utc is 'UTC', including the iso 'Z' designator
  if (isUtc.test(str)) {
    return 'UTC'
  }
  const match = str.match(/^(?:utc|gmt)?([+-]?[0-9]{1,2}(?:\.[0-9]+)?)(?::([0-9]{2}))?h?$/i)
  if (!match) {
    return str
  }
  const hours = Math.abs(Number(match[1]))
  const minutes = Number(match[2] || 0)
  const total = Math.round(hours * 60 + minutes)
  if (hours >= 24 || minutes >= 60 || total >= 1440) {
    throw new RangeError(`Invalid timezone offset: ${input}`)
  }
  // (there is no '-00:00')
  const sign = match[1].startsWith('-') && total ? '-' : '+'
  return `${sign}${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`
}

export default timezone
