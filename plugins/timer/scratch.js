import spacetime from '../../src/index.js'
import startPlugin from './src/index.js'

spacetime.extend(startPlugin)

// playback an arbitrary date at 1-hour-per-second
const s = spacetime('June 8th, 1998 11:00am', 'Canada/Eastern')
s.start({
  interval: 100,
  rate: 1,
  tick: (obj) => {
    console.log(obj.format('{nice} {time}:{second}:{millisecond}'))
  }
})

setTimeout(() => {
  s.stop()
  console.log('stopped at', s.format('nice'))
  process.exit(0)
}, 8500)
