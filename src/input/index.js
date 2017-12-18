import strFmt from './strParse'
import {isDate, isArray, isObject} from '../fns'
//we have to actually parse these inputs ourselves
//  -  can't use built-in js parser ;(
//=========================================
// ISO Date	  "2015-03-25"
// Short Date	"03/25/2015" or "2015/03/25"
// Long Date	"Mar 25 2015" or "25 Mar 2015"
// Full Date	"Wednesday March 25 2015"
//=========================================

//support [2016, 03, 01] format
const handleArray = function(s, arr) {
  let order = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'];
  for (let i = 0; i < arr.length; i++) {
    let num = arr[i] || 0;
    s[order[i]](num);
  }
  return s;
};
//support {year:2016, month:3} format
const handleObject = function(s, obj) {
  let keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    let unit = keys[i];
    if (s[unit] !== undefined) {
      let num = obj[unit] || 0;
      s[unit](num);
    }
  }
  return s;
};

//find the epoch from different input styles
export default function parseInput (s, input) {
  if (typeof input === 'number') {
    s.epoch = input;
    return;
  }
  //set tmp time
  s.epoch = Date.now();
  if (input === null || input === undefined) {
    return; //k, we're good.
  }
  //support input of Date() object
  if (isDate(input) === true) {
    s.epoch = input.getTime();
    return;
  }
  //support [2016, 03, 01] format
  if (isArray(input) === true) {
    handleArray(s, input);
    return;
  }
  //support {year:2016, month:3} format
  if (isObject(input) === true) {
    //support spacetime object as input
    if (input.epoch) {
      s.epoch = input.epoch;
      return;
    }
    handleObject(s, input);
    return;
  }
  if (typeof input !== 'string') {
    return;
  }
  for (let i = 0; i < strFmt.length; i++) {
    let m = input.match(strFmt[i].reg);
    if (m) {
      strFmt[i].parse(s, m);
      return;
    }
  }
  s.epoch = null;
  s.valid = false;
  return;
};
