import aliases from '../../../zonefile/aliases.js'

// Share spacetime's aliases without duplicating geometry or point data.
const indexData = (data) => {
  const index = Object.fromEntries(Object.entries(data).map(([key, value]) => [key.toLowerCase(), value]))
  Object.entries(aliases).forEach(([alias, target]) => {
    if (!Object.hasOwn(index, target) && Object.hasOwn(index, alias)) {
      index[target] = index[alias]
    }
  })
  Object.entries(aliases).forEach(([alias, target]) => {
    if (!Object.hasOwn(index, alias) && Object.hasOwn(index, target)) {
      index[alias] = index[target]
    }
  })
  return index
}

export default indexData
