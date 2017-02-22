const timezones = require('./timezones');
const debug = require('./debug');
const world = require('./world');
// const isSame = require('./isSame');

//fake timezone-support, for fakers
class SpaceTime {
  constructor(epoch) {
    // this.date = new Date(epoch);
    // this.tz = tz || '';
    // this.offset = timezones[tz] || 0; //in minutes;
  }
  myOffset() {
    if (typeof Intl !== 'undefined') {
      let home = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return timezones[home];
    } else {
      return new Date().getTimezoneOffset();
    }
  }
  log() {
    debug(this);
  }
  in(tz) {}
  epoch() {
    return this.date.getTime();
  }
  world() {
    world(this.epoch());
  }
  here() {
    return this.date;
  }
  there() {
    let epoch = this.epoch();
    let minutes = -420 + 240;
    let ms = minutes * 60 * 1000;
    let d = new Date(epoch + ms);
    // console.log(this.offset);
    // d.setMinutes(d.getMinutes() + this.offset);
    return d;
  }

  //apply transforms to date
  addHours(n) {
    let d = this.date;
    d.setHours(d.getHours() + n);
    return d;
  }

  //return 'there' for all queries
  getDate() {
    return this.there().getDate();
  }
}
module.exports = SpaceTime;

var pst = new SpaceTime(Date.now(), 'Canada/Pacific'); //7am (back 3hrs)
// pst.log();

// pst.world();
console.log(pst.myOffset());

// var aus = new SpaceTime(Date.now(), 'Australia/Canberra'); //2am tomorrow (frwd 14hrs)
// aus.log();
