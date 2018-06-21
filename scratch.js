const spacetime = require('./src/index')

spacetime.extend({
  isHappyHour: function() {
    return this.hour() === 16
  }
})

let s = spacetime.now('Australia/Adelaide')
s.isHappyHour()
//false

s.time('4:30pm')
s.isHappyHour()
//true
