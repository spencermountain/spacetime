import Spacetime from '../spacetime.js'

export default {
  year: (epoch, tz, year) => {
    return new Spacetime(epoch, tz)
  }
}