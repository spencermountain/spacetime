import metas from './zonefile/metas.js'
let all = {}
Object.keys(metas).forEach(k => {
  let str = metas[k].std[0] || ''
  if (metas[k].dst) {
    str += '|' + metas[k].dst[0]
  }
  if (all[str]) {
    console.log(str)
  }
  all[str] = true
  // console.log(str)
})