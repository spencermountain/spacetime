//our conceptual 'break-points' for each unit
const qualifiers = {
  months: {
    almost: 10,
    over: 4
  },
  days: {
    almost: 25,
    over: 10
  },
  hours: {
    almost: 20,
    over: 8
  },
  minutes: {
    almost: 50,
    over: 20
  },
  seconds: {
    almost: 50,
    over: 20
  }
}

// Expects a plural unit arg
function pluralize(value, unit) {
  if (value === 1) {
    unit = unit.slice(0, -1)
  }
  return value + ' ' + unit
}

const toSoft = function (diff) {
  let rounded = null
  let qualified = null
  let abbreviated = []
  let englishValues = []
  //go through each value and create its text-representation
  Object.keys(diff).forEach((unit, i, units) => {
    const value = Math.abs(diff[unit])
    if (value === 0) {
      return
    }
    abbreviated.push(value + unit[0])
    const englishValue = pluralize(value, unit)
    englishValues.push(englishValue)
    if (!rounded) {
      rounded = qualified = englishValue
      if (i > 4) {
        return
      }
      //is it a 'almost' something, etc?
      const nextUnit = units[i + 1]
      const nextValue = Math.abs(diff[nextUnit])
      if (nextValue > qualifiers[nextUnit].almost) {
        rounded = pluralize(value + 1, unit)
        qualified = 'almost ' + rounded
      } else if (nextValue > qualifiers[nextUnit].over) {
        qualified = 'over ' + englishValue
      }
    }
  })
  return { qualified, rounded, abbreviated, englishValues }
}
export default toSoft