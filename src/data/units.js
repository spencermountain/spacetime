let units = {
    second: 'second',
    seconds: 'seconds',
    minute: 'minute',
    minutes: 'minutes',
    hour: 'hour',
    hours: 'hours',
    day: 'day',
    days: 'days',
    month: 'month',
    months: 'months',
    year: 'year',
    years: 'years',
};

export function unitsString(unit) {
    return units[unit] || '';
}

export function set(i18n = {}) {
    units = {
        second: i18n.second || units.second,
        seconds: i18n.seconds || units.seconds,
        minute: i18n.minute || units.minute,
        minutes: i18n.minutes || units.minutes,
        hour: i18n.hour || units.hour,
        hours: i18n.hours || units.hours,
        day: i18n.day || units.day,
        days: i18n.days || units.days,
        month: i18n.month || units.month,
        months: i18n.months || units.months,
        year: i18n.year || units.year,
        years: i18n.years || units.years,
    };
}