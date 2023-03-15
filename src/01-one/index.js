import lib from '../index.js'
import model from './model.js'
import config from './config.js'
import zones from './zones.js'
import methods from './methods/index.js'
import api from './api/index.js'

// add method aliases
// const aliases = [
//   ['fmt', 'format'],
//   ['text', 'format'],
//   ['leapYear', 'isLeapYear'],
//   ['isLeap', 'isLeapYear'],
//   ['inDST', 'inDst'],
//   ['hasDST', 'hasDst'],
//   ['hours', 'hour'],
//   ['minutes', 'minute'],
//   ['seconds', 'second'],
//   ['minus', 'subtract'],
//   ['plus', 'add'],
//   ['isDst', 'inDst'],
//   // ['set', '_from'],
// ]
// aliases.forEach(a => {
//   methods[a[0]] = methods[a[1]]
// })

lib.plugin({
  model,
  config,
  zones,
  methods,
  api
})

export default lib
