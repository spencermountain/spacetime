import test from 'tape'
import spacetime from '../_lib/index.ts'
import type { Spacetime } from '../../src/types/index.ts'

// Every way of handing spacetime a timezone should follow the same three rules:
//  1. alone, the input's own timezone is used - in any spelling - and an unknown one throws
//  2. beside a timezone argument, the input only sets the moment, and the argument is where it is shown
//  3. beside a timezone argument, an unknown input timezone still throws

// 9:00am on June 1st 2024 in Kolkata
const moment = 1717212600000
const parts = { year: 2024, month: 5, date: 1, hour: 9, minute: 0, second: 0, millisecond: 0 }
const base = spacetime(0, 'UTC')

// each input that names its own timezone, built from a timezone name and an optional timezone argument
type Form = (zone: string, given?: string) => Spacetime
const inputs: Record<string, Form> = {
  'spacetime({ epoch, tz })': (zone, given) => spacetime({ epoch: moment, tz: zone }, given),
  'spacetime({ epoch, timezone })': (zone, given) => spacetime({ epoch: moment, timezone: zone }, given),
  'spacetime({ year.., timezone })': (zone, given) => spacetime({ ...parts, timezone: zone }, given),
  'spacetime({ year.., tz })': (zone, given) => spacetime({ ...parts, tz: zone }, given),
  "spacetime('iso[tz]')": (zone, given) => spacetime(`2024-06-01T09:00:00[${zone}]`, given),
  "spacetime('iso+offset[tz]')": (zone, given) => spacetime(`2024-06-01T09:00:00+05:30[${zone}]`, given),
  '.set({ epoch, tz })': (zone, given) => base.set({ epoch: moment, tz: zone }, given),
  '.set({ epoch, timezone })': (zone, given) => base.set({ epoch: moment, timezone: zone }, given),
  '.set({ year.., timezone })': (zone, given) => base.set({ ...parts, timezone: zone }, given),
  '.set({ year.., tz })': (zone, given) => base.set({ ...parts, tz: zone }, given),
  ".set('iso[tz]')": (zone, given) => base.set(`2024-06-01T09:00:00[${zone}]`, given)
}

// methods that are given a timezone directly
const methods: Record<string, Form> = {
  'spacetime(epoch, tz)': (zone) => spacetime(moment, zone),
  '.goto(tz)': (zone) => spacetime(moment, 'UTC').goto(zone),
  '.timezone(tz)': (zone) => spacetime(moment, 'UTC').timezone(zone),
  '.json({ timezone })': (zone) => spacetime(moment, 'UTC').json({ timezone: zone })
}

const spellings = ['Asia/Kolkata', 'asia/kolkata', 'ASIA/KOLKATA', 'kolkata', ' Asia/Kolkata ']
const unknown = 'flagbarg'
const notFound = /Cannot find timezone/

test('rule 1: a timezone is resolved in any spelling', (t) => {
  for (const [name, form] of Object.entries({ ...inputs, ...methods })) {
    for (const zone of spellings) {
      t.equal(form(zone).tz, 'asia/kolkata', `${name} resolves '${zone}'`)
    }
  }
  t.end()
})

test('rule 1: an input in its own timezone is the right moment', (t) => {
  for (const [name, form] of Object.entries(inputs)) {
    const s = form('Asia/Kolkata')
    t.equal(s.epoch, moment, `${name} moment`)
    t.equal(s.format('iso'), '2024-06-01T09:00:00.000+05:30', `${name} wall-clock`)
  }
  t.end()
})

test('rule 1: an unknown timezone throws', (t) => {
  for (const [name, form] of Object.entries({ ...inputs, ...methods })) {
    t.throws(() => form(unknown), notFound, `${name} rejects '${unknown}'`)
  }
  t.end()
})

test('rule 2: a timezone argument is where the moment is shown', (t) => {
  for (const [name, form] of Object.entries(inputs)) {
    const s = form('Asia/Kolkata', 'UTC')
    t.equal(s.tz, 'utc', `${name} keeps the timezone argument`)
    t.equal(s.epoch, moment, `${name} keeps the input's moment`)
  }
  t.end()
})

test('rule 3: an unknown input timezone throws beside a timezone argument', (t) => {
  for (const [name, form] of Object.entries(inputs)) {
    t.throws(() => form(unknown, 'UTC'), notFound, `${name} rejects '${unknown}'`)
  }
  t.end()
})

test('objects compared against follow the same rules', (t) => {
  const start = spacetime(moment, 'UTC')
  for (const key of ['tz', 'timezone']) {
    for (const zone of spellings) {
      const other = { epoch: moment + 3600000, [key]: zone }
      t.equal(start.diff(other, 'hour'), 1, `.diff({ epoch, ${key} }) resolves '${zone}'`)
      t.equal(start.isSame({ epoch: moment, [key]: zone }, 'hour'), true, `.isSame({ epoch, ${key} }) resolves '${zone}'`)
    }
    t.throws(() => start.diff({ epoch: moment, [key]: unknown }, 'hour'), notFound, `.diff({ epoch, ${key} }) rejects '${unknown}'`)
    t.throws(() => start.isSame({ epoch: moment, [key]: unknown }, 'hour'), notFound, `.isSame({ epoch, ${key} }) rejects '${unknown}'`)
  }
  t.end()
})
