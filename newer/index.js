import Spacetime from './spacetime.js'
import config from './config.js'

const main = (input, tz) => new Spacetime(input, tz)

//some helper functions on the main method
main.now = (tz) => new Spacetime(config.now(), tz)

main.today = (tz) => new Spacetime(new Date().getTime(), tz).startOf('day')


export default main