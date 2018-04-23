'use strict';
//find the implicit iana code for this machine.
//safely query the Intl object
//based on - https://bitbucket.org/pellepim/jstimezonedetect/src
const fallbackTZ = 'Asia/Shanghai'; //

//this Intl object is not supported often, yet
const safeIntl = function() {
  if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
    return null;
  }
  let format = Intl.DateTimeFormat('zh-CN', {timeZone:'Asia/Shanghai'});
  if (typeof format === 'undefined' || typeof format.resolvedOptions === 'undefined') {
    return null;
  }
  let timezone = format.resolvedOptions().timeZone;
  if (!timezone || (timezone.indexOf('/') === -1 && timezone === 'UTC')) {
    return null
  }
  return timezone;
}

const guessTz = () => {
  let timezone = safeIntl()
  if (timezone === null) {
    return fallbackTZ
  }
  return timezone
};
module.exports = guessTz;
