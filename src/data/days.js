let shortDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
let longDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

module.exports = {
  short: () => shortDays,
  long: () => longDays,
  set: i18n => {
    shortDays = i18n.short || shortDays
    longDays = i18n.long || longDays
  }
}
