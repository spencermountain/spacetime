/* spencermountain/spacetime-week-of-month 0.1.0 Apache 2.0 */
// the first week of a month includes a thursday, in that month
// (leap days do not effect week-ordering!)
const getFirstWeek = function (s) {
  let month = s.month();
  let start = s.date(1);
  start = start.startOf('week');
  let thu = start.add(3, 'days');
  if (thu.month() !== month) {
    start = start.add(1, 'week');
  }
  return start
};

var index = {
  weekOfMonth: function (n) {
    let start = getFirstWeek(this.clone());
    // week-setter
    if (n !== undefined) {
      return start.add(n, 'weeks')
    }
    // week-getter
    let num = 0;
    let end = start.endOf('week');
    for (let i = 0; i < 5; i += 1) {
      if (end.isAfter(this)) {
        return num + 1
      }
      end = end.add(1, 'week');
      num += 1;
    }
    return num + 1
  },
  whichWeek: function () {
    let s = this.startOf('week');
    // it's always in the same month that it's thursday is...
    let thurs = s.add(3, 'days');
    let month = thurs.monthName();
    let num = thurs.weekOfMonth();

    return { num, month }
  },
  firstWeek: function () {
    return getFirstWeek(this.clone())
  },
  lastSunday: function () {
    let s = this.endOf('month'); //last day
    // if it's after thursday
    if (s.day() > 4) {
      return s.endOf('week')
    }
    // else, the previous sunday
    s = s.minus(1, 'week');
    return s.endOf('week')
  }
};

export { index as default };
