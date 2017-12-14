var Spacetime = require('.')

function clobber(instance) {
  // these methods return values
  let clobbers = ['add', 'subtract', 'hour', 'date', 'day', 'month', 'quarter', 'goto']
  // walk thee clobbers and clobber with immutablilitieeeees
  clobbers.forEach(prop=> {
    Object.defineProperty(instance, prop, {
      enumerable: false,
      value(...args) {
        var copy = instance.clone()
        return copy[prop].apply(copy, args)
      }
    })
  })
  return instance
}

// a new factory; this one with terrible powers!
function ImmutableSpacetime(...args) {
  return clobber(new Spacetime(...args))
}

// copy helper factory ctor thingos
ImmutableSpacetime.now = x=>clobber(Spacetime.now())
ImmutableSpacetime.today = x=>clobber(Spacetime.today())
ImmutableSpacetime.tomorrow = x=>clobber(Spacetime.tomorrow())

// coolest sounding exports ever
module.exports = ImmutableSpacetime
