'use strict'
//use the old dst changes, from 2017, when we made the tests
const changeTz = function(s) {
  let timezones = s.timezones
  timezones['Canada/Eastern'].dst = '03/12:03->11/05:01'
  timezones['Australia/Canberra'].dst = '04/02:02->10/01:03'
  timezones['Pacific/Fiji'].dst = '01/15:02->11/05:03'
  s.timezones = timezones
  return s
}
module.exports = changeTz
