
const monthLen = function (n, year, world) {
  const { isLeapYear } = world.methods
  const { months } = world.model
  if (n === 2 && isLeapYear(year)) {
    return 29
  }
  return months[n].len
}
export default monthLen
