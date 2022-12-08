import spacetime from './src/index.js'
import { now, fromEpoch } from './new-src/src/index.js'

// import getDst from './new-src/dst/index.js'
// import tzdb from './new-src/tzdb/index.js'
// import zones from './new-src/data/zonefile.2022.js'

let s = spacetime.now('Etc/GMT+7')
console.log(s.timezone()) //'Sábado'