import lib from '../index.js'
// import api from './api/index.js'
import methods from './methods/index.js'
import config from './config.js'
import model from './model/index.js'
import zones from './zones.js'

lib.plugin({
  zones,
  model,
  methods,
  config,
  // api
})

export default lib
