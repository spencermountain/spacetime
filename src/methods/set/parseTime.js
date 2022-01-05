const parseTime = function (str) {
  str = str || ''
  str = str.toLowerCase()

  // 5:50pm
  let m = str.match(/([0-9]{1,2}):([0-9]{1,2}) ?(am|pm)?/)
  if (!m) {
  }

  //fallback to support just '2am'
  m = str.match(/([0-9]{1,2}) ?(am|pm)/)
  if (m) {
  }

  // 5 oclock
  m = str.match(/[0-9] o'?clock (am|pm)?/)
  if (m) {
    str = str.replace(/ ?o'?clock ?/, '')
    //is this an ambiguous hour, like '3 oclock'?
  }
}
export default parseTime
