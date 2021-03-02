let shortDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
let longDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

module.exports = {
  short: () => shortDays,
  long: () => longDays,
  set: (i18n) => {
    shortDays = i18n.short || shortDays
    longDays = i18n.long || longDays
  },
  aliases: {
    mo: 1,
    tu: 2,
    we: 3,
    th: 4,
    fr: 5,
    sa: 6,
    su: 7,
    tues: 2,
    weds: 3,
    wedn: 3,
    thur: 4,
    thurs: 4
  }
}
