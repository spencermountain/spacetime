import { getWeekStart } from './input/weekStart.js'

export default {
  weekStart: function (input) {
    input = input || this.timezone().name
    return getWeekStart(input)
  }
}
