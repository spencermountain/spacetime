import lib from '../index.js'
import model from './model.js'
import config from './config.js'
import zones from './zones.js'
import methods from './methods/index.js'
// import api from './api/index.js'

lib.plugin({
  model,
  config,
  zones,
  methods,
  // api
})

export default lib
