import test from 'tape'
import spacetime from 'spacetime'

const testExtension = (name, plugin) => {
  test(`${name}: extension preserves existing instances and works when registered twice`, t => {
    const before = spacetime('2024-02-29T23:45:12.345', 'Asia/Kathmandu')
    const epoch = before.epoch
    const iso = before.iso()
    spacetime.extend(plugin)
    spacetime.extend(plugin)

    t.equal(before.epoch, epoch, 'registration preserves an existing instant')
    t.equal(before.iso(), iso, 'registration preserves the local clock')
    const after = spacetime(epoch, 'Asia/Kathmandu')
    t.equal(after.iso(), iso, 'new instances agree with existing instances')
    t.equal(after.goto('UTC').epoch, epoch, 'timezone conversion preserves the instant')
    t.equal(after.goto('UTC').goto('Asia/Kathmandu').iso(), iso, 'fractional timezone round trip')
    t.equal(after.clone().iso(), iso, 'cloning preserves the datetime')
    t.equal(after.add(1, 'day').date(), 1, 'arithmetic crosses leap day')
    t.equal(after.iso(), iso, 'arithmetic leaves the original instance unchanged')
    t.end()
  })

  test(`${name}: extension preserves DST-aware calendar arithmetic`, t => {
    spacetime.extend(plugin)
    const spring = spacetime('2026-03-07T12:00:00', 'America/New_York')
    const autumn = spacetime('2026-10-31T12:00:00', 'America/New_York')
    const nextSpring = spring.add(1, 'day')
    const nextAutumn = autumn.add(1, 'day')

    t.equal(nextSpring.hour(), 12, 'spring calendar day keeps the local hour')
    t.equal(nextSpring.epoch - spring.epoch, 23 * 3600000, 'spring day spans 23 hours')
    t.equal(nextAutumn.hour(), 12, 'autumn calendar day keeps the local hour')
    t.equal(nextAutumn.epoch - autumn.epoch, 25 * 3600000, 'autumn day spans 25 hours')
    t.end()
  })
}

export default testExtension
