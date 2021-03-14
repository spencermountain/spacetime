module.exports = {
  age: function (unit = 'years') {
    let now = this.set()
    let diff = this.diff(now, unit)
    return diff
  }
}
