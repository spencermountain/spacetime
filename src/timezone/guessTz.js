//find the implicit iana code for this machine.
//safely query the Intl object
//based on - https://bitbucket.org/pellepim/jstimezonedetect/src
const fallbackTZ = 'Canada/Pacific'; //eeeek!

export default function guessTz() {
  if (
    typeof Intl === 'undefined' ||
    typeof Intl.DateTimeFormat === 'undefined'
  ) {
    return fallbackTZ;
  }
  let format = Intl.DateTimeFormat();
  if (
    typeof format === 'undefined' ||
    typeof format.resolvedOptions === 'undefined'
  ) {
    return fallbackTZ;
  }
  let timezone = format.resolvedOptions().timeZone;
  if (timezone && (timezone.indexOf('/') > -1 || timezone === 'UTC')) {
    return timezone;
  }
  return fallbackTZ;
};
