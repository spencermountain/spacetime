export default {
  //luxon: keepCalendarTime,  keepLocalTime
  goto: function (tz, opts = {}) {
    // if (opts.keepClock === true) { }
    return this._from(this.epoch, tz)
  }
}