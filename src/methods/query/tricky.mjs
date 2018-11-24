'use strict';
import days from '../../data/days'
import months from '../../data/months'
import walkTo from '../set/walk'

//non-destructive getters/setters with fancy moves to do
const methods = {
  //like 'wednesday' (hard!)
  day: function(input) {
    if (input === undefined) {
      return this.d.getDay();
    }
    let original = this.clone();
    let want = input;
    // accept 'wednesday'
    if (typeof input === 'string') {
      input = input.toLowerCase();
      want = days.short().indexOf(input);
      if (want === -1) {
        want = days.long().indexOf(input);
      }
    }
    //move approx
    let day = this.d.getDay();
    let diff = day - want;
    let s = this.subtract(diff * 24, 'hours');
    //tighten it back up
    walkTo(s, {
      hour: original.hour(),
      minute: original.minute(),
      second: original.second()
    });
    return s;
  },

  ampm: function(input) {
    let which = 'am';
    let hour = this.hour();
    if (hour >= 12) {
      which = 'pm';
    }
    if (input === undefined) {
      return which;
    }
    let s = this.clone()
    if (input === which) {
      return s;
    }
    if (s === 'am') {
      s = s.subtract(12, 'hours');
    } else {
      s = s.add(12, 'hours');
    }
    return s;
  },

  //these are helpful name-wrappers
  dayName: function(input) {
    if (input === undefined) {
      return days.long()[this.day()];
    }
    let s = this.clone()
    s = s.day(input);
    return s;
  },

  monthName: function(input) {
    if (input === undefined) {
      return months.long()[this.month()];
    }
    let s = this.clone()
    s = s.month(input);
    return s
  }
};
export default methods
