'use strict';

function zeroPad(n) {
  z = z || '0';
  n = n + '';
  return n.length >= 2 ? n : new Array(2 - n.length + 1).join(z) + n;
}

function titleCase(str){
  return str[0].toUpperCase() + str.substr(1).toLowerCase();
}

function ordinal(i) {
  let j = i % 10;
  let k = i % 100;
  if (j === 1 && k !== 11) {
    return i + 'st';
  }
  if (j === 2 && k !== 12) {
    return i + 'nd';
  }
  if (j === 3 && k !== 13) {
    return i + 'rd';
  }
  return i + 'th';
}

module.exports = {
  zeroPad: zeroPad,
  titleCase: titleCase,
  ordinal: ordinal,
};
