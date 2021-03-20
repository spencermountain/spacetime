const calc = require('./calc')

module.exports = {
  dst: function (year) {
    let id = this.timezone().name
    return calc(id, year)
  }
}
