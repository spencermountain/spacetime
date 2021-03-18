if (typeof process !== undefined && typeof module !== undefined) {
  let spacetimeHoliday
  if (process.env.TESTENV === 'prod') {
    console.warn('== production build test 🚀 ==')
    spacetimeHoliday = require('../')
  } else {
    spacetimeHoliday = require('../src')
  }

  module.exports = spacetimeHoliday
}
