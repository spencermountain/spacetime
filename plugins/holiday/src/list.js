import { catalog } from './_lib.js'
import lookup from './lookup.js'

const list = (options = {}) => {
  return Object.keys(catalog).sort().map((name) => {
    const entry = { name, aliases: [...catalog[name].aliases].sort() }
    if (options.year !== undefined) {
      entry.date = lookup(name, options.year, options.timezone)
    }
    return entry
  })
}

export default list
