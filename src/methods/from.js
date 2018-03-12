'use strict'

const secondInMs = 1000;
const minuteInMs = 60000;
const hourInMs = 3600000;
const dayInMs = 86400000;

const qualifiers = {
  months: { almost: 10, over: 4 },
  days: { almost: 25, over: 10 },
  hours: { almost: 20, over: 8 },
  minutes: { almost: 50, over: 20 },
  seconds: { almost: 50, over: 20 }
}

const diffUnits = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'];

function getDiff (a, b) {
  const { floor } = Math;
  const isBefore = a.isBefore(b);
  const earlier = isBefore ? a : b;
  const later = isBefore ? b : a;

  let totalMonths = later.month() - earlier.month() + (later.year() - earlier.year()) * 12;
  if (earlier.clone().add(totalMonths, 'months').isAfter(later)) --totalMonths;
  const milliseconds = +later.d - +(earlier.clone().add(totalMonths, 'months').d);

  const diff = {};

  diff.years = floor(totalMonths / 12);
  diff.months = totalMonths % 12;
  diff.days = floor(milliseconds / dayInMs);
  diff.hours = floor(milliseconds % dayInMs / hourInMs);
  diff.minutes = floor(milliseconds % dayInMs % hourInMs / minuteInMs);
  diff.seconds = floor(milliseconds % dayInMs % hourInMs % minuteInMs / secondInMs);

  if (isBefore) diffUnits.forEach(u => diff[u] *= -1);

  return diff;
}

// Expects a plural unit arg
function pluralize (value, unit) {
  if (value === 1) unit = unit.slice(0, -1);
  return value + ' ' + unit;
}

const from = (start, end) => {
  const { abs } = Math;
  const isStartBeforeEnd = start.isBefore(end);
  const diff = getDiff(start, end);
  const isSame = diffUnits.every(u => !diff[u]);

  let rounded;
  let qualified;
  let precise;
  let englishValues = [];

  if (isSame) {
    rounded = qualified = precise = 'now';
    return { diff, rounded, qualified, precise };
  }

  diffUnits.forEach((unit, i, units) => {
    const value = abs(diff[unit]);
    if (value === 0) return;

    const englishValue = pluralize(value, unit);
    englishValues.push(englishValue);

    if (!rounded) {
      rounded = qualified = englishValue;

      if (i > 4) return;
      const nextUnit = units[i + 1];
      const nextValue = abs(diff[nextUnit]);
      const { almost, over } = qualifiers[nextUnit];

      if (nextValue > almost) {
        rounded = pluralize(value + 1, unit);
        qualified = 'almost ' + rounded;
      }
      else if (nextValue > over) qualified = 'over ' + englishValue;
    }
  });

  precise = englishValues.splice(0, 2).join(', ');

  if (isStartBeforeEnd) {
    rounded += ' ago';
    qualified += ' ago';
    precise += ' ago';
  } else {
    rounded = 'in ' + rounded;
    qualified = 'in ' + qualified;
    precise = 'in ' + precise;
  }

  return { diff, rounded, qualified, precise };
}

module.exports = from;
