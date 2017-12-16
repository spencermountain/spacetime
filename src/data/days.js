let shortDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
let longDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export default {
  short: () => shortDays,
  long: () => longDays,
  set: i18n => {
    shortDays = i18n.short;
    longDays = i18n.long;
  },
};
