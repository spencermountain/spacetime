import aliases from '/Users/spencer/mountain/spacetime/zonefile/aliases.js'
import zone from '../src/zonefile.2022.js'
Object.entries(aliases).forEach(a => {
  let [k, v] = a
  if (zone[k]) {
    console.log(k)
  }
  if (!zone[v]) {
    console.log(v)
  }
})

