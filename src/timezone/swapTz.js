// change the timezone without changing the time
// goes from 4:20pm EST to 4:20pm CST
const swapTz = function (s, tz) {
  let json = s.json()
  return s.set(json, tz)
}

export default swapTz