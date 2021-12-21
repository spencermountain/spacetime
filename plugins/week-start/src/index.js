let weekStart = require('./input/weekStart')

export default {
  weekStart: function (input) {
    input = input || this.timezone().name
    return weekStart(input)
  }
}
