// Keep metadata and the fast wall-clock calculation in agreement.
export default tz => {
  if (tz === 'australia/lord_howe') return 0.5
  if (tz === 'antarctica/troll') return 2
  return 1
}
