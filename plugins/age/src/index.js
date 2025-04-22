export default {
  age: function (unit = 'years') {
    const now = this.set()
    const diff = this.diff(now, unit)
    return diff
  }
}
