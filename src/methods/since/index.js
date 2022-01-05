import { beADate } from '../../fns.js'
import toISO from './_iso.js'
import getDiff from './getDiff.js'
import soften from './soften.js'
//by spencermountain + Shaun Grady

//create the human-readable diff between the two dates
const since = (start, end) => {
  end = beADate(end, start)
  const diff = getDiff(start, end)
  const isNow = Object.keys(diff).every((u) => !diff[u])
  if (isNow === true) {
    return {
      diff,
      rounded: 'now',
      qualified: 'now',
      precise: 'now',
      abbreviated: [],
      iso: 'P0Y0M0DT0H0M0S',
      direction: 'present',
    }
  }
  let precise
  let direction = 'future'

  let { rounded, qualified, englishValues, abbreviated } = soften(diff)

  //make them into a string
  precise = englishValues.splice(0, 2).join(', ')
  //handle before/after logic
  if (start.isAfter(end) === true) {
    rounded += ' ago'
    qualified += ' ago'
    precise += ' ago'
    direction = 'past'
  } else {
    rounded = 'in ' + rounded
    qualified = 'in ' + qualified
    precise = 'in ' + precise
  }
  // https://en.wikipedia.org/wiki/ISO_8601#Durations
  // P[n]Y[n]M[n]DT[n]H[n]M[n]S 
  let iso = toISO(diff)
  return {
    diff,
    rounded,
    qualified,
    precise,
    abbreviated,
    iso,
    direction,
  }
}

export default since
