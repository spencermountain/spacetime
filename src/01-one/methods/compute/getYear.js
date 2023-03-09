
// from a random epoch, get it's Jan 1st alignment
const getYear = function (target, tz, world) {
  console.log(world.model)
  let epoch = 0
  const isLeapYear = world.methods.isLeapYear
  // apply timezone offset to it
  epoch -= januaryOffset(tz, world)
  let year = 1970
  // count upwards from 1970
  if (target > MAXOFFSET) {
    while (epoch <= target) {
      let size = YEAR
      if (isLeapYear(year)) {
        size = LEAPYEAR
      }
      let tmp = epoch + size
      if (tmp > target) {
        break
      }
      epoch = tmp
      year += 1
    }
  } else {
    // count downwards from 1970
    while (epoch > target) {
      let size = YEAR
      if (isLeapYear(year)) {
        size = LEAPYEAR
      }
      epoch -= size
      year -= 1
    }
  }
  return { start: epoch, year }
}
export default getYear