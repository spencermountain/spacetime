export default {
  "main": {
    "goto": {
      "doc": "move to a new timezone, but at this same moment. Accepts an IANA code or abbreviation",
      "out": "clone"
    },
    "clone": {
      "doc": "make a copy of this object, with no references to the original",
      "out": "clone"
    },
    "timezone": {
      "doc": "return a bunch of meta-data about your current timezone, or pass a name to swap the timezone while keeping the same date-time",
      "out": "Object/clone"
    },
    "toNativeDate": {
      "doc": "return the native javascript Date object at the same epoch (falls back to the local timezone)",
      "out": "Date"
    },
    "toTemporal": {
      "doc": "return a native Temporal.ZonedDateTime at the same instant and timezone with millisecond precision, or null for an invalid date. Throws an Error if globalThis.Temporal is unavailable, including for invalid dates",
      "out": "Temporal.ZonedDateTime/null"
    },
    "format": {
      "doc": "output nicely-formatted strings, using a named format or a {token} template",
      "out": "String/Object"
    },
    "unixFmt": {
      "doc": "output a formatted string using unix/moment formatting tokens, like 'yyyy.MM.dd h:mm a'",
      "out": "String"
    },
    "startOf": {
      "doc": "move to the first millisecond of the day, week, month, year, etc.",
      "out": "clone"
    },
    "endOf": {
      "doc": "move to the last millisecond of the day, week, month, year, etc.",
      "out": "clone"
    },
    "add": {
      "doc": "increment the time by a number and unit - like an hour, minute, day, or year",
      "out": "clone"
    },
    "subtract": {
      "doc": "decrease the time by a number and unit - like an hour, minute, day, or year",
      "out": "clone"
    },
    "next": {
      "doc": "go to the beginning of the next unit",
      "out": "clone"
    },
    "last": {
      "doc": "go to the beginning of the previous unit",
      "out": "clone"
    },
    "nearest": {
      "doc": "move forward/backward to the closest unit",
      "out": "clone"
    },
    "round": {
      "doc": "round to either the current, or +1 of this unit (alias of nearest)",
      "out": "clone"
    },
    "every": {
      "doc": "list all dates up to a certain time, by a given unit",
      "out": "Array"
    },
    "each": {
      "doc": "list all dates between this one and another, by a given unit",
      "out": "Array"
    },
    "isAfter": {
      "doc": "pass-in a spacetime object or date input and see if it takes-place after your spacetime date/time",
      "out": "Boolean"
    },
    "isBefore": {
      "doc": "pass-in a spacetime object or date input and see if it takes-place before your spacetime date/time",
      "out": "Boolean"
    },
    "isEqual": {
      "doc": "is this date on the exact same millisecond as another",
      "out": "Boolean"
    },
    "isBetween": {
      "doc": "is this date between these start and end dates? accepts an optional isInclusive flag",
      "out": "Boolean"
    },
    "isSame": {
      "doc": "detect if two date/times are the same day, week, or year, etc",
      "out": "Boolean"
    },
    "diff": {
      "doc": "given a date and a unit, count how many of them you'd need to make the dates equal. Without a unit, returns a count of every unit.",
      "out": "Number/Object"
    },
    "since": {
      "doc": "create a human-readable diff between the two dates, like 'in 5 months'",
      "out": "Object"
    },
    "from": {
      "doc": "create a human-readable diff between the two dates (alias of since)",
      "out": "Object"
    },
    "fromNow": {
      "doc": "create a human-readable diff between now and the given date",
      "out": "Object"
    }
  },
  "getters": {
    "millisecond": {
      "doc": "set or return the current number of milliseconds (0-999)",
      "out": "clone/Number"
    },
    "second": {
      "doc": "set or return the current number of seconds (0-59)",
      "out": "clone/Number"
    },
    "minute": {
      "doc": "set or return the current number of minutes (0-59)",
      "out": "clone/Number"
    },
    "hour": {
      "doc": "set or return the current hour, in 24 time (0-23). also accepts/parses '3pm'",
      "out": "clone/Number"
    },
    "hour12": {
      "doc": "set or return the current hour, in 12-hour format (0-11). also accepts/parses '3pm'",
      "out": "clone/Number"
    },
    "date": {
      "doc": "set or return the day-number of the month (1- max31)",
      "out": "clone/Number"
    },
    "month": {
      "doc": "set or return the zero-based month-number (0-11). Also accepts 'June', or 'oct'.",
      "out": "clone/Number"
    },
    "year": {
      "doc": "set or return the 4-digit year as an integer",
      "out": "clone/Number"
    },
    "decade": {
      "doc": "set or return the current decade, like 2020",
      "out": "clone/Number"
    },
    "century": {
      "doc": "set or return the current century, like 21",
      "out": "clone/Number"
    },
    "millennium": {
      "doc": "set or return the current millennium, like 3",
      "out": "clone/Number"
    },
    "dayOfYear": {
      "doc": "set or return the day of the year (1-366). Jan 1st is 1, Dec 31st is 366.",
      "out": "clone/Number"
    },
    "time": {
      "doc": "set or return a formatted, 12-hour time, like '11:30pm'",
      "out": "clone/String"
    },
    "week": {
      "doc": "set or return the week-number of the year (1-52).",
      "out": "clone/Number"
    },
    "quarter": {
      "doc": "set or return the fiscal-quarter (1-4)",
      "out": "clone/Number"
    },
    "season": {
      "doc": "set or return the name of the season, spring/summer/fall/autumn/winter",
      "out": "clone/String"
    },
    "era": {
      "doc": "set or return the era, 'BC' or 'AD'",
      "out": "clone/String"
    },
    "hourFloat": {
      "doc": "set or return the hour + minute in decimal form, so '3:30am' is 3.5",
      "out": "clone/Number"
    },
    "day": {
      "doc": "set or return the day of the week as an integer, starting on sunday (day-0). Also accepts names like 'wednesday', or 'thurs'",
      "out": "clone/Number"
    },
    "dayName": {
      "doc": "set or return the day of the week as a string, like 'wednesday'",
      "out": "clone/String"
    },
    "ampm": {
      "doc": "set or return whether the time is am or pm",
      "out": "clone/String"
    },
    "dayTime": {
      "doc": "set or return the general time-of-day, like 'afternoon'",
      "out": "clone/String"
    },
    "monthName": {
      "doc": "set or return the current month as a string, like 'april'",
      "out": "clone/String"
    },
    "epochSeconds": {
      "doc": "set or return the time in seconds since jan 1 1970",
      "out": "clone/Number"
    },
    "iso": {
      "doc": "set or return the traditional ISO 8601 datetime string",
      "out": "clone/String"
    },
    "isoFull": {
      "doc": "set or return the extended ISO datetime string (RFC 9557), with offset and [timezone]",
      "out": "clone/String"
    },
    "json": {
      "doc": "set or return all date units as a key-value object",
      "out": "clone/Object"
    }
  },
  "utils": {
    "set": {
      "doc": "change to a new date.",
      "out": "clone"
    },
    "isValid": {
      "doc": "does this time exist on the gregorian/javascript calendar?",
      "out": "Boolean"
    },
    "log": {
      "doc": "pretty-print the date to the console, for nicer debugging",
      "out": "clone"
    },
    "logYear": {
      "doc": "pretty-print the full date to the console, for nicer debugging",
      "out": "clone"
    },
    "progress": {
      "doc": "Between 0-1, how far the moment lands between the start and end of the day/week/month/year.",
      "out": "Object"
    },
    "leapYear": {
      "doc": "is the current year a leap year?",
      "out": "Boolean"
    },
    "isDST": {
      "doc": "is daylight-savings-time activated right now, for this timezone?",
      "out": "Boolean"
    },
    "inDST": {
      "doc": "is daylight-savings-time activated right now, for this timezone? (alias of isDST)",
      "out": "Boolean"
    },
    "hasDST": {
      "doc": "does this timezone ever use daylight-savings",
      "out": "Boolean"
    },
    "offset": {
      "doc": "the current, DST-aware time-difference from UTC, in hours",
      "out": "Number"
    },
    "hemisphere": {
      "doc": "which hemisphere is this timezone in, 'North' or 'South'",
      "out": "String"
    },
    "isAwake": {
      "doc": "checks if the current time is between 8am and 10pm",
      "out": "Boolean"
    },
    "isAsleep": {
      "doc": "checks if the current time is between 10pm and 8am",
      "out": "Boolean"
    },
    "i18n": {
      "doc": "changes the names of months and days, for non-english formatting",
      "out": "clone"
    },
    "weekStart": {
      "doc": "change the day the week starts on (0-6, default is monday)",
      "out": "clone"
    },
    "daysInMonth": {
      "doc": "returns the amount of days the current month has (December => 31, June => 30, ...)",
      "out": "Number"
    }
  },
  "statics": {
    "now": {
      "doc": "create a spacetime object at the current moment. Accepts a timezone as the first argument.",
      "out": "clone"
    },
    "today": {
      "doc": "create a spacetime object at the start of today (this morning)",
      "out": "clone"
    },
    "tomorrow": {
      "doc": "create a spacetime object at the start of tomorrow",
      "out": "clone"
    },
    "yesterday": {
      "doc": "create a spacetime object at the start of yesterday",
      "out": "clone"
    },
    "min": {
      "doc": "create a spacetime object at the earliest-possible date (271,821 bc)",
      "out": "clone"
    },
    "max": {
      "doc": "create a spacetime object at the furthest-possible future date",
      "out": "clone"
    },
    "fromUnixSeconds": {
      "doc": "create a spacetime object from an epoch in seconds (instead of milliseconds)",
      "out": "clone"
    },
    "extend": {
      "doc": "add custom methods (or a plugin) to the spacetime object",
      "out": "spacetime"
    },
    "timezones": {
      "doc": "get a list of all known timezones and their offsets",
      "out": "Object"
    },
    "whereIts": {
      "doc": "list the timezones where it's currently a given time, like '8:30pm'",
      "out": "Array"
    }
  }
}
