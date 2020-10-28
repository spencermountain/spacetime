//local time of fall dst change-over
const dstParse = (dstChange, num) => {
  let fall = dstChange.split('->')[num]
  const [month, rest] = fall.split('/')
  let [day, hour] = rest.split(':')
  if (hour === '24') {
    hour = '0'
    day = Number(day) + 1
  }
  if (hour === '00') {
    hour = '23'
    day = Number(day) - 1
  }
  return {
    year: new Date().getFullYear(),
    month: Number(month) - 1, //
    date: Number(day),
    hour: Number(hour),
    minute: 2
  }
}
module.exports = dstParse
