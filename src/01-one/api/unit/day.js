import tick from '../change/_tick.js'

const fromCal = function (s, cal) {
  let epoch = s.world.methods.getEpoch(cal, s.tz, s.world)
  return s._from(epoch, s.tz)
}

export default {

  // this one is tricky!
  day: function (input, fwd) {
    const { epoch, tz, world } = this
    const { getDay, getCal } = world.methods
    let cal = world.methods.getCal(epoch, tz, world)
    if (input !== undefined) {
      let day = getDay(cal.year, cal.month, cal.date)
      if (day === input) {
        return cal
      }
      let diff = input - day
      // go in a specific direction
      if (diff < 0 && fwd === true) {
        diff = 7 + diff
      } else if (diff > 0 && fwd === false) {
        diff = diff - 7
      }
      let obj = tick(cal, diff, 'date', world)//untested
      return fromCal(this, obj)
    }
    return world.methods.getDay(cal)
  },
  // wednesday/friday
  dayName: function (input) {
    const { world } = this
    if (input !== undefined) { }
    let n = this.day()
    return world.model.days[n].longForm
  },
}