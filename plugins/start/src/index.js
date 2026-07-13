const defaults = {
  interval: 1000, // ms between ticks
  rate: 1 // speed, relative to real-time
}

// re-derive the epoch from the wall-clock, every time.
// we never do `epoch += interval`, so timer-jitter,
// background-tab throttling, or laptop-sleep cannot accumulate error.
const sync = function (s) {
  const state = s._ticker
  s.epoch = state.anchor + (Date.now() - state.wall) * state.rate
  if (typeof state.tick === 'function') {
    state.tick(s)
  }
}

const methods = {
  start: function (opts = {}) {
    this.stop()
    let interval = Number(opts.interval)
    if (isNaN(interval) || interval <= 0) {
      interval = defaults.interval
    }
    let rate = Number(opts.rate)
    if (isNaN(rate)) {
      rate = defaults.rate
    }
    const state = {
      anchor: this.epoch === null ? Date.now() : this.epoch,
      wall: Date.now(),
      rate: rate,
      tick: opts.tick || null
    }
    this._ticker = state
    state.timer = setInterval(() => sync(this), interval)
    // browsers throttle background timers - snap to the correct time
    // the moment the tab becomes visible again
    if (typeof document !== 'undefined' && document.addEventListener) {
      state.onVisible = () => {
        if (document.visibilityState === 'visible') {
          sync(this)
        }
      }
      document.addEventListener('visibilitychange', state.onVisible)
    }
    return this
  },
  stop: function () {
    if (this._ticker) {
      // land exactly on the stop-moment, not the last tick
      this.epoch = this._ticker.anchor + (Date.now() - this._ticker.wall) * this._ticker.rate
      clearInterval(this._ticker.timer)
      if (this._ticker.onVisible) {
        document.removeEventListener('visibilitychange', this._ticker.onVisible)
      }
      this._ticker = null
    }
    return this
  }
}

export default methods
