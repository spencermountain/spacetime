const timezones = require('./timezones');
const fmt = require('./fmt');
const world = require('./world');
const dst = require('dst');

// const isSame = require('./isSame');

//fake timezone-support, for fakers
class SpaceTime {
  constructor(epoch, tz) {
    //default to now
    this.epoch = epoch || new Date().getTime();
    this.date = new Date(epoch);
    this.myOffset = this.date.getTimezoneOffset() || 0;
    //apply the offset of the timezone
    if (tz) {
      this.goto(tz);
    } else if (typeof Intl !== 'undefined') {
      this.tz = Intl.DateTimeFormat().resolvedOptions().timeZone; //be explicit about where we are, by default
    }
  }
  clone() {
    return new SpaceTime(this.epoch);
  }
  //travel to this timezone
  goto(tz) {
    this.tz = tz;
    let offset = timezones[tz];
    offset += this.myOffset;
    //apply offset
    this.epoch += offset * 60 * 1000;
    this.date = new Date(this.epoch);
    return this;
  }
  niceTime() {
    return fmt.time(this.date);
  }
  niceDate() {
    return fmt.day(this.date);
  }
  log() {
    console.log(fmt.daytime(this.date));
  }
  world() {
    world(this);
  }
  // here() {
  //   return this.date;
  // }
  // there() {
  //   let epoch = this.epoch();
  //   let minutes = -420 + 240;
  //   let ms = minutes * 60 * 1000;
  //   let d = new Date(epoch + ms);
  //   // console.log(this.offset);
  //   // d.setMinutes(d.getMinutes() + this.offset);
  //   return d;
  // }

}
module.exports = SpaceTime;

// let d = new Date('February 22, 2017 08:24:00');
let d = new Date('February 22, 2017 11:24:00');
var space = new SpaceTime(d.getTime()); //7am (back 3hrs)
// space.log();
// space.goto('Canada/Pacific');
// space.log();
// space.goto('Australia/Canberra');
// space.log();

space.world();
// console.log(pst.myOffset());

// var aus = new SpaceTime(Date.now(), 'Australia/Canberra'); //2am tomorrow (frwd 14hrs)
// aus.log();
