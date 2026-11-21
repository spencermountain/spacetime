import test from 'tape'
import spacetime from '../../src/temporal/index.ts'

const options = { skip: !globalThis.Temporal }
const fmt = '{month-short} {date} {time}'
const str = '2024-01-01T22:00:00'

test('Temporal entry: .set() reads its input in a given timezone', options, (t) => {
  const s = spacetime('2024-06-01T09:00:00', 'America/Los_Angeles')
  // like spacetime(input, tz)
  let res = s.set(str, 'Asia/Tokyo')
  t.equal(res.format(fmt), 'Jan 1 10:00pm', 'string')
  t.equal(res.tz, 'Asia/Tokyo', 'string timezone')
  t.equal(res.epoch, spacetime(str, 'Asia/Tokyo').epoch, 'same as the constructor')
  res = s.set([2024, 0, 1, 22], 'Asia/Tokyo')
  t.equal(res.format(fmt), 'Jan 1 10:00pm', 'array')

  // an input with its own moment is only shown there
  res = s.set(str + '-02:00', 'Asia/Tokyo')
  t.equal(res.format(fmt), 'Jan 2 9:00am', 'offset')
  res = s.set(str + '[Europe/Paris]', 'Asia/Tokyo')
  t.equal(res.format(fmt), 'Jan 2 6:00am', 'bracket')
  t.equal(res.tz, 'Asia/Tokyo', 'bracket timezone')
  res = s.set(spacetime(str, 'Europe/Paris'), 'Asia/Tokyo')
  t.equal(res.format(fmt), 'Jan 2 6:00am', 'spacetime')
  t.equal(res.tz, 'Asia/Tokyo', 'spacetime timezone')
  res = s.set(1704175200000, 'Asia/Tokyo')
  t.equal(res.format(fmt), 'Jan 2 3:00pm', 'epoch')
  t.end()
})

test('Temporal entry: .set() with no timezone uses the input, then the instance', options, (t) => {
  const s = spacetime('2024-06-01T09:00:00', 'America/Los_Angeles')
  t.equal(s.set(str).tz, 'America/Los_Angeles', 'bare string')
  t.equal(s.set(str).format(fmt), 'Jan 1 10:00pm', 'bare string time')
  t.equal(s.set(str + 'Z').tz, 'UTC', 'Z')
  t.equal(s.set(str + 'Z').format(fmt), 'Jan 1 10:00pm', 'Z time')
  t.equal(s.set(str + '-02:00').tz, '-02:00', 'offset')
  t.equal(s.set(str + '-02:00').format(fmt), 'Jan 1 10:00pm', 'offset time')
  t.equal(s.set(str + '[Europe/Paris]').tz, 'Europe/Paris', 'bracket')
  t.equal(s.set(str + '[Europe/Paris]').format(fmt), 'Jan 1 10:00pm', 'bracket time')
  t.equal(s.set(spacetime(str, 'Europe/Paris')).tz, 'Europe/Paris', 'spacetime')
  t.equal(s.set(1704175200000).tz, 'America/Los_Angeles', 'epoch')
  t.end()
})
