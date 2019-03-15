'use strict';
//find the implicit iana code for this machine.
//safely query the Intl object
//based on - https://bitbucket.org/pellepim/jstimezonedetect/src
const fallbackTZ = 'asia/shanghai'; //

//this Intl object is not supported often, yet
const safeIntl = function() {
  if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
    return null;
  }
  let format = Intl.DateTimeFormat();
  if (typeof format === 'undefined' || typeof format.resolvedOptions === 'undefined') {
    return null;
  }
  let timezone = format.resolvedOptions().timeZone;
  if (!timezone || (!timezone.includes('/') && timezone === 'UTC')) {
    return null
  }
  return timezone;
}

const guessTz = () => {
  let timezone = safeIntl()
  if (timezone === null) {
    return fallbackTZ
  }
  return timezone.toLowerCase()
};
//do it once per computer
module.exports = guessTz;
