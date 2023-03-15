export default {
  age: function (unit = 'years') {
    let now = this._from()
    let diff = this.diff(now, unit)
    return diff
  }
}
