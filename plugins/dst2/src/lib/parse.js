// Parse ISO duration string (e.g. P1Y2M3DT4H5M6S)
export const parseDuration = (iso) => {
  const matches = iso.match(/P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?/)
  if (!matches) return null

  return {
    year: parseInt(matches[1]) || 0,
    month: parseInt(matches[2]) || 0,
    day: parseInt(matches[3]) || 0,
    hour: parseInt(matches[4]) || 0,
    minute: parseInt(matches[5]) || 0,
    second: parseInt(matches[6]) || 0
  }
}

// Parse ISO date string (e.g. 2024-03-15T14:30:45)
export const parseDateTime = (iso) => {
  const [date, time] = iso.split('T')
  const [year, month, day] = date.split('-')
  const [hour, minute, second] = (time || '00:00:00').split(':')

  return {
    year: parseInt(year),
    month: parseInt(month),
    day: parseInt(day),
    hour: parseInt(hour),
    minute: parseInt(minute),
    second: parseInt(second)
  }
} 