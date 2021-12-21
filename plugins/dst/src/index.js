const calc = require('./calc')

export default {
  dst: function (year) {
    year = year || this.year()
    let id = this.timezone().name
    return calc(id, year)
  }
}
