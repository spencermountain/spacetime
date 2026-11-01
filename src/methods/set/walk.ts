import ms from '../../data/milliseconds.ts'
import { getUnit, type UnitKey } from '../../fns.ts'
import type { Spacetime, DateParts, TimeUnit } from '../../types/index.ts'

// the Date getters we step towards, eg 'getUTCHours'
type DateGetter = 'getUTCFullYear' | 'getUTCMonth' | 'getUTCDate' | 'getUTCHours' | 'getUTCMinutes'

//basically, step-forward/backward until js Date object says we're there.
const walk = (s: Spacetime, n: number, fn: DateGetter, unit: TimeUnit, previous: DateGetter | null): void => {
  const current = s.d[fn]()
  if (current === n) {
    return //already there
  }
  const startUnit = previous === null ? null : s.d[previous]()
  const original = s.epoch
  //try to get it as close as we can
  const diff = n - current
  s.epoch += ms[unit] * diff
  //DST edge-case: if we are going many days, be a little conservative
  if (unit === 'day') {
    // s.epoch -= ms.minute
    //but don't push it over a month
    if (Math.abs(diff) > 28 && n < 28) {
      s.epoch += ms.hour
    }
  }
  // 1st time: oops, did we change previous unit? revert it.
  if (previous !== null && startUnit !== s.d[previous]()) {
    s.epoch = original
    // s.epoch += ms[unit] * diff * 0.89 // maybe try and make it close...?
  }
  //repair it if we've gone too far or something
  //(go by half-steps, just in case)
  const halfStep = ms[unit] / 2
  while (s.d[fn]() < n) {
    s.epoch += halfStep
  }

  while (s.d[fn]() > n) {
    s.epoch -= halfStep
    // DST gap: n was skipped, like midnight in Santiago.
    // count from the clock time before the gap, so 00:00 lands on 01:00
    if (previous !== null && startUnit !== s.d[previous]()) {
      const before = s.d.getTime()
      s.epoch += halfStep
      const target = s.d
      ;(target as unknown as Record<string, (n: number) => number>)[fn.replace('get', 'set')](n)
      s.epoch += target.getTime() - before - halfStep
      break
    }
  }
  // 2nd time: did we change previous unit? revert it.
  if (previous !== null && startUnit !== s.d[previous]()) {
    // console.warn('spacetime warning: missed setting ' + unit)
    s.epoch = original
  }
}
//find the desired date by a increment/check while loop
interface Walker {
  valid: (n: number) => boolean
  walkTo: (s: Spacetime, n: number) => void
}
const units: Record<UnitKey, Walker> = {
  year: {
    valid: (n: number) => n > -4000 && n < 4000,
    walkTo: (s: Spacetime, n: number) => walk(s, n, 'getUTCFullYear', 'year', null)
  },
  month: {
    valid: (n: number) => n >= 0 && n <= 11,
    walkTo: (s: Spacetime, n: number) => {
      const d = s.d
      const current = d.getUTCMonth()
      const original = s.epoch
      const startUnit = d.getUTCFullYear()
      if (current === n) {
        return
      }
      //try to get it as close as we can..
      const diff = n - current
      s.epoch += ms.day * (diff * 28) //special case
      //oops, did we change the year? revert it.
      if (startUnit !== s.d.getUTCFullYear()) {
        s.epoch = original
      }
      //increment by day
      while (s.d.getUTCMonth() < n) {
        s.epoch += ms.day
      }
      while (s.d.getUTCMonth() > n) {
        s.epoch -= ms.day
      }
    }
  },
  date: {
    valid: (n: number) => n > 0 && n <= 31,
    walkTo: (s: Spacetime, n: number) => walk(s, n, 'getUTCDate', 'day', 'getUTCMonth')
  },
  hour: {
    valid: (n: number) => n >= 0 && n < 24,
    walkTo: (s: Spacetime, n: number) => walk(s, n, 'getUTCHours', 'hour', 'getUTCDate')
  },
  minute: {
    valid: (n: number) => n >= 0 && n < 60,
    walkTo: (s: Spacetime, n: number) => walk(s, n, 'getUTCMinutes', 'minute', 'getUTCHours')
  },
  second: {
    valid: (n: number) => n >= 0 && n < 60,
    walkTo: (s: Spacetime, n: number) => {
      //do this one directly
      s.epoch = s.seconds(n).epoch
    }
  },
  millisecond: {
    valid: (n: number) => n >= 0 && n < 1000,
    walkTo: (s: Spacetime, n: number) => {
      //do this one directly
      s.epoch = s.milliseconds(n).epoch
    }
  }
}

const walkTo = (s: Spacetime, wants: DateParts): void => {
  const keys = Object.keys(units) as UnitKey[]
  const old = s.clone()
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i]
    let n: number | string = wants[k]
    if (n === undefined) {
      n = getUnit(old, k)
    }
    if (typeof n === 'string') {
      n = parseInt(n, 10)
    }
    //make-sure it's valid
    if (!units[k].valid(n)) {
      s.epoch = null
      if (s.silent === false) {
        console.warn('invalid ' + k + ': ' + n) // eslint-disable-line no-console
      }
      return
    }
    units[k].walkTo(s, n)
  }
  return
}

export default walkTo
