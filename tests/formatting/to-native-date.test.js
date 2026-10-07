import test from 'tape'
import spacetime from '../_lib/index.js'

test('toNativeDate-is-epoch', (t) => {
  let d = spacetime(1554092400000, 'Australia/Brisbane') // 4:20, april 1st 2019 GMT
  d = d.hour('3').minute('14')

  const localDate = d.toNativeDate()
  const localDateSeconds = localDate.getTime()

  t.equal(localDateSeconds, d.epoch, 'toNativeDate is not epoch')
  t.end()
})


test('toNativeDate preserves zero, negative epochs, and milliseconds', (t) => {
  const epochs = [0, -1, -86400001, 1, 1700000000123]
  const zones = ['UTC', 'Asia/Kathmandu', 'America/New_York']
  epochs.forEach(epoch => {
    zones.forEach(zone => {
      const s = spacetime(epoch, zone)
      const date = s.toNativeDate()
      const label = `${epoch} ${zone}: toNativeDate()`
      t.ok(date instanceof Date, `${label} returns a Date`)
      t.equal(date.getTime(), epoch, `${label} preserves the instant`)
      date.setTime(123456789)
      t.equal(s.epoch, epoch, `${label} is independent of the source`)
      t.equal(s.toNativeDate().getTime(), epoch, `${label} returns an unaffected subsequent Date`)
    })
  })
  t.end()
})

test('toNativeDate preserves invalid input', (t) => {
  const inputs = ['not a date', NaN, new Date(NaN)]
  inputs.forEach(input => {
    const s = spacetime(input, 'UTC')
    const label = `${String(input)} UTC: toNativeDate()`
    t.equal(s.isValid(), false, `${label} starts invalid`)
    const date = s.toNativeDate()
    t.ok(date instanceof Date, `${label} returns a Date`)
    t.ok(Number.isNaN(date.getTime()), `${label} returns an invalid Date`)
  })
  t.end()
})
