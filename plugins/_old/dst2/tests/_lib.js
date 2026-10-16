import { formatDate } from '../src/lib/format.js'
// Convert our state object to JS Date
export const stateToDate = (state) => {
  return new Date(
    state.year,
    state.month - 1, // JS months are 0-based
    state.day,
    state.hour,
    state.minute,
    state.second
  )
}

// Convert JS Date to our state format
export const dateToState = (date) => ({
  year: date.getFullYear(),
  month: date.getMonth() + 1, // Convert back to 1-based
  day: date.getDate(),
  hour: date.getHours(),
  minute: date.getMinutes(),
  second: date.getSeconds()
})

// Apply duration changes to JS Date object
export const applyDurationToJsDate = (jsDate, duration) => {
  if (duration.year) jsDate.setFullYear(jsDate.getFullYear() + duration.year)
  if (duration.month) jsDate.setMonth(jsDate.getMonth() + duration.month)
  if (duration.day) jsDate.setDate(jsDate.getDate() + duration.day)
  if (duration.hour) jsDate.setHours(jsDate.getHours() + duration.hour)
  if (duration.minute) jsDate.setMinutes(jsDate.getMinutes() + duration.minute)
  if (duration.second) jsDate.setSeconds(jsDate.getSeconds() + duration.second)
  return jsDate
}

// Compare our result with JS Date behavior
export const compareWithJsDate = (result, jsDate) => {
  const jsResult = dateToState(jsDate)
  const matches = formatDate(result) === formatDate(jsResult)

  if (!matches) {
    console.log('Difference found:')
    Object.keys(result).forEach(key => {
      if (result[key] !== jsResult[key]) {
        console.log(`  ${key}: ${result[key]} vs ${jsResult[key]}`)
      }
    })
  }

  return matches
} 