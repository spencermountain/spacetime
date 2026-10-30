import ymd from './01-ymd.ts'
import mdy from './02-mdy.ts'
import dmy from './03-dmy.ts'
import misc from './04-misc.ts'
import type { Parser } from './_parsers.ts'

const parsers: Parser[] = [...ymd, ...mdy, ...dmy, ...misc]

export default parsers
