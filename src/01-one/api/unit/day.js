import tick from '../change/_tick.js'

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
      return tick(cal, diff, 'date', world)
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