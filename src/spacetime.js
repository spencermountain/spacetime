const getOffset = require('./gears/getOffset');
const fmt = require('./methods/lib/fmt');

// const isSame = require('./isSame');

//fake timezone-support, for fakers
class SpaceTime {
  constructor(epoch, tz) {
    //default to now
    this.epoch = epoch || new Date().getTime();
    this.d = new Date(epoch);
    this.myOffset = this.d.getTimezoneOffset() || 0;
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
    let offset = getOffset(tz);
    offset += this.myOffset;
    //apply offset
    this.epoch += offset * 60 * 1000;
    this.d = new Date(this.epoch);
    return this;
  }

  log() {
    console.log(fmt.daytime(this.d));
  }
  world() {
    world(this);
  }

}
SpaceTime = require('./methods/query')(SpaceTime);
module.exports = SpaceTime;

// let d = new Date('February 22, 2017 08:24:00');
// let d = new Date('February 22, 2017 3:42:00');
// var space = new SpaceTime(d.getTime()); //7am (back 3hrs)
// console.log(space.date());
// space.log();
// space.goto('Canada/Pacific');
// space.log();
// space.goto('Australia/Canberra');
// space.log();

// space.world();
// console.log(pst.myOffset());

// var aus = new SpaceTime(Date.now(), 'Australia/Canberra'); //2am tomorrow (frwd 14hrs)
// aus.log();
