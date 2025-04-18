// Days in each month (non-leap year)
const monthDays = {
  1: 31,  // January
  2: 28,  // February (29 in leap years)
  3: 31,  // March
  4: 30,  // April
  5: 31,  // May
  6: 30,  // June
  7: 31,  // July
  8: 31,  // August
  9: 30,  // September
  10: 31, // October
  11: 30, // November
  12: 31  // December
}

// Leap year calculation
const isLeapYear = year => {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
}

// Calculate days in month considering leap years
const getDaysInMonth = (year, month) => {
  if (month === 2 && isLeapYear(year)) {
    return 29
  }
  return monthDays[month]
}

export const baseUnit = 'second'

export const units = {
  second: {
    max: () => 59,
    base: 0,
    next: 'minute',
    prev: null,
    normalize: (value) => value
  },
  minute: {
    max: () => 59,
    base: 0,
    next: 'hour',
    prev: 'second',
    normalize: (value) => value
  },
  hour: {
    max: () => 23,
    base: 0,
    next: 'day',
    prev: 'minute',
    normalize: (value) => value
  },
  day: {
    max: (state) => getDaysInMonth(state.year, state.month),
    base: 1,
    next: 'month',
    prev: 'hour',
    normalize: (value, state) => {
      const maxDays = monthDays[state.month] +
        (state.month === 2 && isLeapYear(state.year) ? 1 : 0)
      return Math.min(value, maxDays)
    }
  },
  month: {
    max: () => 12,
    base: 1,
    next: 'year',
    prev: 'day',
    normalize: (value, state) => {
      const normalizedMonth = ((value - 1) % 12) + 1

      // Adjust day if new month is shorter
      const maxDays = monthDays[normalizedMonth] +
        (normalizedMonth === 2 && isLeapYear(state.year) ? 1 : 0)
      state.day = Math.min(state.day, maxDays)

      return normalizedMonth
    }
  },
  year: {
    max: () => Number.MAX_SAFE_INTEGER,
    base: 0,
    next: null,
    prev: 'month',
    normalize: (value, state) => {
      // Only need to check February for leap year transitions
      if (state.month === 2) {
        const maxDays = monthDays[2] + (isLeapYear(value) ? 1 : 0)
        state.day = Math.min(state.day, maxDays)
      }
      return value
    }
  }
} 