'use strict';
//every computer is somewhere, and this effects their interpretation in the date object
//find the offset this computer has
const getBias = () => {
  //get it with the new es6 Intl method
  // if (typeof Intl !== 'undefined') {
  //   let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // }
  let d = new Date();
  return d.getTimezoneOffset() || 0;
};
module.exports = getBias;
