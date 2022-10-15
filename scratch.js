import spacetime from './src/index.js'
import { now, fromEpoch } from './new-src/src/index.js'

// import getDst from './new-src/dst/index.js'
// import tzdb from './new-src/tzdb/index.js'
// import zones from './new-src/data/zonefile.2022.js'

// let tz = 'Pacific/Galapagos'
let tz = 'Europe/Oslo'
console.log(now(tz))
console.log(spacetime(tz).format('{nice-day} {time}'))