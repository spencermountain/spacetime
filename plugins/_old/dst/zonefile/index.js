import metas from './metas.js'
import patterns from './dst-patterns.js'
import zones from './zones.js'

const parsePattern = function (str) {
  const a = str.split(/-/)
  return {
    nth: a[0],
    day: a[1],
    month: a[2],
    hour: a[3],
  }
}

Object.keys(zones).forEach(k => {
  const obj = zones[k]
  const meta = metas[obj.meta]
  zones[k].std = {
    abbr: meta.std[0],
    offset: meta.std[1]
  }
  if (obj.dst) {
    const pattern = patterns[obj.dst].split(/\|/)
    zones[k].dst = {
      abbr: meta.dst[0],
      offset: meta.dst[1],
      start: parsePattern(pattern[0]),
      end: parsePattern(pattern[1]),
    }
  }
  obj.name = obj.meta + ' Time'
  delete obj.meta
})
console.dir(zones, { depth: 5 })
