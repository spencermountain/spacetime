import test from 'tape'
import spacetime from '../_lib/index.ts'

const fmt = '{month-short} {date} {time}'

test('.set() reads its input in a given timezone', (t) => {
  const s = spacetime('2024-06-01T09:00:00', 'America/Los_Angeles')
  const str = '2024-01-01T22:00:00'
  // like spacetime(input, tz)
  let res = s.set(str, 'Asia/Tokyo')
  t.equal(res.format(fmt), 'Jan 1 10:00pm', 'string')
  t.equal(res.timezone().name, 'Asia/Tokyo', 'string timezone')
  t.equal(res.epoch, spacetime(str, 'Asia/Tokyo').epoch, 'same as the constructor')

  res = s.set([2024, 0, 1, 22], 'Asia/Tokyo')
  t.equal(res.format(fmt), 'Jan 1 10:00pm', 'array')

  // an input with its own moment is only shown there
  res = s.set(str + '-02:00', 'Asia/Tokyo')
  t.equal(res.format(fmt), 'Jan 2 9:00am', 'offset')
  res = s.set(str + '[Europe/Paris]', 'Asia/Tokyo')
  t.equal(res.format(fmt), 'Jan 2 6:00am', 'bracket')
  t.equal(res.timezone().name, 'Asia/Tokyo', 'bracket timezone')
  res = s.set(1704175200000, 'Asia/Tokyo')
  t.equal(res.format(fmt), 'Jan 2 3:00pm', 'epoch')
  t.end()
})

test('.set() with no timezone uses the input, then the instance', (t) => {
  const s = spacetime('2024-06-01T09:00:00', 'America/Los_Angeles')
  const str = '2024-01-01T22:00:00'
  t.equal(s.set(str).timezone().name, 'America/Los_Angeles', 'bare string')
  t.equal(s.set(str).format(fmt), 'Jan 1 10:00pm', 'bare string time')
  t.equal(s.set(str + 'Z').timezone().name, 'UTC', 'Z')
  t.equal(s.set(str + '-02:00').timezone().name, 'Etc/GMT+2', 'offset')
  t.equal(s.set(str + '[Europe/Paris]').timezone().name, 'Europe/Paris', 'bracket')
  t.equal(s.set(str + '[Europe/Paris]').format(fmt), 'Jan 1 10:00pm', 'bracket time')
  t.end()
})
