// recursive setTimeOut - not perfect, but does not drift
// https://stackoverflow.com/questions/29971898/how-to-create-an-accurate-timer-in-javascript
// see benchmarks at https://github.com/dbkaplun/driftless
class Ticker {

  constructor(hertz, callback) {
    this.target = performance.now();     // target time for the next frame
    this.interval = 1 / hertz * 1000;    // the milliseconds between ticks
    this.callback = callback;
    this.stopped = false;
    this.frame = 0;
    this.tick(this);
  }

  tick(self) {
    if (self.stopped) {
      return;
    }
    const currentTime = performance.now();
    const currentTarget = self.target;
    const currentInterval = (self.target += self.interval) - currentTime;

    setTimeout(self.tick, currentInterval, self);
    self.callback(self.frame++, currentTime, currentTarget, self);
  }

  stop() {
    this.stopped = true;
    return this.frame
  }

}

export default Ticker

// let c = new Ticker(2, () => { console.log('tick') })