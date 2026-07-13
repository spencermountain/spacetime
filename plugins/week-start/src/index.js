import { getWeekStart } from './input/weekStart.js'

export default {
  weekStart: function (input) {
    return getWeekStart(input, this.tz)
  }
}
