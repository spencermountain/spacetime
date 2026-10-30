import ymd from './01-ymd.ts'
import mdy from './02-mdy.ts'
import dmy from './03-dmy.ts'
import misc from './04-misc.ts'

import walkTo from '../../methods/set/walk.ts'
import parseOffset from './parseOffset.ts'

export default [].concat(ymd(walkTo, parseOffset), mdy(walkTo, parseOffset), dmy(walkTo), misc(walkTo))
