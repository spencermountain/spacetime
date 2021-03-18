let weekStart = require('./input/weekStart')

module.exports = {
  weekStart: function(input) {
    input = input || this.timezone().name
    return weekStart(input)
  }
}
