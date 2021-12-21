import { writeFileSync } from 'fs'
import { version } from '../package.json'

//set new version number
writeFileSync('./_version.js', `export default  '${version}'`)
