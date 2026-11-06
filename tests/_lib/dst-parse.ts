//local time of fall dst change-over
const dstParse = (dstChange: string, num: number) => {
  const fall = dstChange.split('->')[num]
  const [month, rest] = fall.split('/')
  const [dayStr, hourStr] = rest.split(':')
  let day = Number(dayStr)
  let hour = Number(hourStr)
  if (hourStr === '24') {
    hour = 0
    day += 1
  }
  if (hourStr === '00') {
    hour = 23
    day -= 1
  }
  return {
    year: new Date().getFullYear(),
    month: Number(month) - 1, //
    date: day,
    hour,
    minute: 2
  }
}
export default dstParse
