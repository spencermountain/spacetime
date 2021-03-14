/* spencermountain/spacetime-week-of-month 0.0.1 Apache 2.0 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.weekOfMonth = {}));
}(this, (function (exports) { 'use strict';

  // the first week of a month includes a thursday, in that month
  // (leap days do not effect week-ordering!)
  var getFirstWeek = function getFirstWeek(s) {
    var month = s.month();
    var start = s.date(1);
    start = start.startOf('week');
    var thu = start.add(3, 'days');

    if (thu.month() !== month) {
      start = start.add(1, 'week');
    }

    return start;
  };

  var src = {
    weekOfMonth: function weekOfMonth(n) {
      var start = getFirstWeek(this.clone()); // week-setter

      if (n !== undefined) {
        return start.add(n, 'weeks');
      } // week-getter


      var num = 0;
      var end = start.endOf('week');

      for (var i = 0; i < 5; i += 1) {
        if (end.isAfter(this)) {
          return num + 1;
        }

        end = end.add(1, 'week');
        num += 1;
      }

      return num + 1;
    },
    whichWeek: function whichWeek() {
      var s = this.startOf('week'); // it's always in the same month that it's thursday is...

      var thurs = s.add(3, 'days');
      var month = thurs.monthName();
      var num = thurs.weekOfMonth();
      return {
        num: num,
        month: month
      };
    }
  };
  var src_1 = src.weekOfMonth;
  var src_2 = src.whichWeek;

  exports.default = src;
  exports.weekOfMonth = src_1;
  exports.whichWeek = src_2;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
