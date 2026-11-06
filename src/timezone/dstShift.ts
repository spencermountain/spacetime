// Keep metadata and the fast wall-clock calculation in agreement.
// most zones shift by 1hr on dst, but Lord Howe is a ½-hour shift,
// and Troll (Antarctica) makes a 2-hour jump between +00 and +02
const dstShift = (tz: string): number => {
  if (tz === 'australia/lord_howe' || tz === 'australia/lhi') {
    return 0.5
  }
  if (tz === 'antarctica/troll') {
    return 2
  }
  return 1
}
export default dstShift
