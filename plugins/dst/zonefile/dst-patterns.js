const patterns = require('./patterns')

export default [
  // north america
  {
    name: 'Eastern Time',
    id: 'America/New_York',
    in_2021: '03/14:02->11/07:02',
    dates: patterns.america
  },
  {
    name: 'Mountain Time',
    id: 'America/Boise',
    in_2021: '03/14:02->11/07:02',
    dates: patterns.america
  },
  {
    name: 'Central Time',
    id: 'America/Chicago',
    in_2021: '03/14:02->11/07:02',
    dates: patterns.america
  },
  {
    name: 'Alaska Time',
    id: 'America/Anchorage',
    in_2021: '03/14:02->11/07:02',
    dates: patterns.america
  },
  {
    name: 'Atlantic Time',
    id: 'America/Halifax',
    in_2021: '03/14:02->11/07:02',
    dates: patterns.america
  },
  {
    name: 'Pacific Time',
    id: 'America/Los_Angeles',
    in_2021: '03/14:02->11/07:02',
    dates: patterns.america
  },
  {
    name: 'Newfoundland Time',
    id: 'America/St_Johns',
    in_2021: '03/14:02->11/07:02',
    dates: patterns.america
  },
  {
    name: 'Aleutian Standard Time',
    id: 'America/Adak',
    in_2021: '03/14:02->11/07:02',
    dates: patterns.america
  },
  {
    name: 'St. Pierre & Miquelon Time',
    id: 'America/Miquelon',
    in_2021: '03/14:02->11/07:02',
    dates: patterns.america
  },

  // europe
  {
    name: 'British Time',
    id: 'Europe/London',
    in_2021: '03/28:01->10/31:02',
    start: {},
    end: {}
  },
  {
    name: 'Central European Time',
    id: 'Europe/Paris',
    in_2021: '03/28:02->10/31:03',
    start: {},
    end: {}
  },
  {
    name: 'Eastern European Time',
    id: 'Asia/Beirut',
    in_2021: '03/28:00->10/30:24',
    start: {},
    end: {}
  },
  {
    name: 'Western European Time',
    id: 'Europe/Lisbon',
    in_2021: '03/28:01->10/31:02',
    start: {},
    end: {}
  },
  {
    name: 'Azores Time',
    id: 'Atlantic/Azores',
    in_2021: '03/28:00->10/31:01',
    start: {},
    end: {}
  },
  {
    name: 'East Greenland Time',
    id: 'America/Scoresbysund',
    in_2021: '03/28:00->10/31:01',
    start: {},
    end: {}
  },

  // south/central america
  {
    name: 'Central Mexico Time',
    id: 'America/Mexico_City',
    in_2021: '04/04:02->10/31:02',
    start: {},
    end: {}
  },

  {
    name: 'Northwest Mexico Time',
    id: 'America/Santa_Isabel',
    in_2021: '03/14:02->11/07:02',
    start: {},
    end: {}
  },
  {
    name: 'Cuba Time',
    id: 'America/Havana',
    in_2021: '03/14:00->11/07:01',
    start: {},
    end: {}
  },
  {
    name: 'Paraguay Time',
    id: 'America/Asuncion',
    in_2021: '03/27:24->10/03:00',
    start: {},
    end: {}
  },
  {
    name: 'West Greenland Time',
    id: 'America/Godthab',
    in_2021: '03/27:22->10/30:23',
    start: {},
    end: {}
  },
  {
    name: 'Chile Time',
    id: 'America/Santiago',
    in_2021: '04/03:24->09/05:00',
    start: {},
    end: {}
  },
  {
    name: 'Mexican Pacific Time',
    id: 'America/Chihuahua',
    in_2021: '04/04:02->10/31:02',
    start: {},
    end: {}
  },

  // africa/mideast
  {
    name: 'Morocco Standard Time',
    id: 'Africa/Casablanca',
    in_2021: '04/11:03->05/16:02',
    start: {},
    end: {}
  },
  {
    name: '',
    id: 'Africa/Algiers',
    start: {},
    end: {}
  },
  {
    name: 'Israel Time',
    id: 'Asia/Jerusalem',
    in_2021: '03/26:02->10/31:02',
    start: {},
    end: {}
  },
  {
    name: 'Iran Time',
    id: 'Asia/Tehran',
    in_2021: '03/22:00->09/21:24',
    start: {},
    end: {}
  },

  // pacific
  {
    name: 'Hawaii-Aleutian Time',
    id: 'Pacific/Honolulu',
    start: {},
    end: {}
  },
  {
    name: 'Easter Island Time',
    id: 'Pacific/Easter',
    in_2021: '04/03:22->09/04:22',
    start: {},
    end: {}
  },
  {
    name: 'New Caledonia Time',
    id: 'Pacific/Noumea',
    start: {},
    end: {}
  },
  {
    name: 'Fiji Time',
    id: 'Pacific/Fiji',
    in_2021: '01/17:03->11/14:02',
    start: {},
    end: {}
  },
  {
    name: 'Norfolk Island Time',
    id: 'Pacific/Norfolk',
    in_2021: '04/04:03->10/03:02',
    start: {},
    end: {}
  },
  {
    name: 'West Samoa Time',
    id: 'Pacific/Apia',
    in_2021: '04/04:04->09/26:03',
    start: {},
    end: {}
  },
  {
    name: 'Tonga Time',
    id: 'Pacific/Tongatapu',
    in_2021: '01/15:02->11/05:03',
    start: {},
    end: {}
  },
  {
    name: 'Chatham Time',
    id: 'Pacific/Chatham',
    in_2021: '04/04:03->04/04:02',
    start: {},
    end: {}
  },

  // australia
  {
    name: 'Eastern Australia Time',
    id: 'Australia/Sydney',
    in_2021: '04/04:03->10/03:02',
    start: {},
    end: {}
  },
  {
    name: 'Central Australia Time',
    id: 'Australia/Adelaide',
    in_2021: '04/04:03->10/03:02',
    start: {},
    end: {}
  },
  {
    name: 'New Zealand Time',
    id: 'Pacific/Auckland',
    in_2021: '04/04:03->09/26:02',
    start: {},
    end: {}
  },
  {
    name: 'Lord Howe Time',
    id: 'Australia/Lord_Howe',
    in_2021: '04/04:01->10/03:02',
    start: {},
    end: {}
  },
  {
    name: 'Casey Time',
    id: 'Antarctica/Casey',
    in_2021: '03/08:01->10/04:00',
    start: {},
    end: {}
  }
]
let arr = module.exports
console.log(arr.length)
console.log(arr.filter((s) => Object.keys(s).length > 0).length)
