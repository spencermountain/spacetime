import ymd from './01-ymd.js'
import mdy from './02-mdy.js'
import dmy from './03-dmy.js'
import misc from './04-misc.js'

import walkTo from '../../methods/set/walk.js'
import parseOffset from './parseOffset.js'

export default [].concat(ymd(walkTo, parseOffset), mdy(walkTo, parseOffset), dmy(walkTo), misc(walkTo))
