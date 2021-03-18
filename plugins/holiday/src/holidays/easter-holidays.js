// https://www.timeanddate.com/calendar/determining-easter-date.html

let dates = {
  easter: 0,
  'ash wednesday': -46, // (46 days before easter)
  'palm sunday': 7, // (1 week before easter)
  'maundy thursday': -3, // (3 days before easter)
  'good friday': -2, // (2 days before easter)
  'holy saturday': -1, // (1 days before easter)
  'easter saturday': -1, // (1 day before easter)
  'easter monday': 1, // (1 day after easter)
  'ascension day': 39, // (39 days after easter)
  'whit sunday': 49, // / pentecost (49 days after easter)
  'whit monday': 50, // (50 days after easter)
  'trinity sunday': 65, // (56 days after easter)
  'corpus christi': 60, // (60 days after easter)

  'mardi gras': -47 //(47 days before easter)
}
dates['easter sunday'] = dates.easter
dates['pentecost'] = dates['whit sunday']
dates['whitsun'] = dates['whit sunday']

module.exports = dates
