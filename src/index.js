import Spacetime from './spacetime'
import {whereIts} from './findTz'
import pkg from '../package.json'

// primary constructor factory
const main = (input, tz)=> new Spacetime(input, tz)

// helpers
main.whereIts = whereIts; //find tz by time
main.version = pkg.version;

// alternate constructor factories
main.now = function(tz) {
  return new Spacetime(new Date().getTime(), tz);
};

main.today = function(tz) {
  let s = new Spacetime(new Date().getTime(), tz);
  return s.startOf('day');
};

main.tomorrow = function(tz) {
  let s = new Spacetime(new Date().getTime(), tz);
  return s.add(1, 'day').startOf('day');
};

main.yesterday = function(tz) {
  let s = new Spacetime(new Date().getTime(), tz);
  return s.subtract(1, 'day').startOf('day');
};


export default main
