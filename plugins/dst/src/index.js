const calc = require('./calc')

module.exports = {
  dst: function (year) {
    year = year || this.year()
    let id = this.timezone().name
    return calc(id, year)
  }
}
