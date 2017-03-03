'use strict';
// const dst = require('dst');
const timezones = require('./timezones');

const getOffset = (tz) => {
  if (!tz) {
    return 0;
  }
  //get offset from timezone file
  let offset = timezones[tz] || 0;

  //add another hour to offset if dst is currently off (in winter)
  //this is not perfect, but it handles us + europe mostly.
  const inDst = false; //dst(new Date());
  if (inDst === false) {
    offset -= 60;
  }
  return offset;
};
module.exports = getOffset;
