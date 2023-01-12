import test from 'tape'
import spacetime from './lib/index.js'

test('toNativeDate-is-epoch', (t) => {
  let d = spacetime(1554092400000, 'Australia/Brisbane') // 4:20, april 1st 2019 GMT
  d = d.hour('3').minute('14')

  let localDate = d.toNativeDate()
  let localDateSeconds = localDate.getTime()

  t.equal(localDateSeconds, d.epoch, 'toNativeDate is not epoch')
  t.end()
})
