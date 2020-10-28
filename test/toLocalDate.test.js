const test = require('tape')
const spacetime = require('./lib')

test('toLocalDate-is-epoch', (t) => {
  let d = spacetime(1554092400000, 'Australia/Brisbane') // 4:20, april 1st 2019 GMT
  d = d.hour('3').minute('14')

  let localDate = d.toLocalDate()
  let localDateSeconds = localDate.getTime()

  t.equal(localDateSeconds, d.epoch, 'toLocalDate is not epoch')
  t.end()
})
