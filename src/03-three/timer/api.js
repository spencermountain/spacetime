// import Spacetime from '../../spacetime.js'
import Ticker from './ticker.js'



export default {
  start: function () {
    this.ticker = new Ticker()
    return this
  },
  pause: function () {
    return this
  },
  alarm: async function () {
    return this
  },
}


var start = +new Date();
var count = 0;
setInterval(function () {
  console.log((new Date() - start) % 1000, ++count, Math.round((new Date() - start) / 1000))
}, 1000);