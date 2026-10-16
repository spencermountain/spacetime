<div align="center">
  <div><b>spacetime-timer</b></div>
  <div>playback a spacetime object at real-rate, without drift</div>
  <div><code>npm install spacetime-timer</code></div>
  <div align="center">
    <sub>
      by
      <a href="https://github.com/spencermountain">Spencer Kelly</a>
    </sub>
  </div>
  <img height="25px" src="https://user-images.githubusercontent.com/399657/68221824-09809d80-ffb8-11e9-9ef0-6ed3574b0ce8.png"/>
</div>
<!--2nd row-->
<div align="center">
  <div>
    <a href="https://npmjs.org/package/spacetime-timer">
    <img src="https://img.shields.io/npm/v/spacetime-timer.svg?style=flat-square" />
  </a>
  <a href="https://bundlephobia.com/result?p=spacetime-timer">
    <img src="https://badgen.net/bundlejs/min/spacetime-timer" />
  </a>
  </div>
</div>

turn a spacetime object into a live-updating clock - from _any_ date, at _any_ speed.

```js
import spacetime from 'spacetime'
import spacetimeStart from 'spacetime-timer'
spacetime.extend(spacetimeStart)

const s = spacetime('June 8th, 1998 11:00am')
s.start({
  interval: 1000, // ms between updates
  rate: 1, // 1x real-time
  tick: (s) => {
    document.querySelector('#clock').innerHTML = s.format('nice')
  }
})

// ... whenever you're done
s.stop()
```

`npm i spacetime-timer`

### It doesn't drift

this plugin never does `epoch += interval` - accumulating little increments is how clocks drift.

instead, `.start()` records an anchor - the object's epoch, and the wall-clock time - and every tick _re-derives_ the epoch:

```js
epoch = anchorEpoch + wallClockElapsed * rate
```

so timer-jitter, background-tab throttling, even closing your laptop for the night - none of it accumulates error.
you can leave a page open for weeks, and the time stays honest.

### It's easy on the machine

it's one `setInterval`, at whatever interval you ask for.

browsers throttle background-tab timers (to ~1/minute in chrome) - that's fine, and good.
the epoch is exactly-correct at every tick, no matter how late it arrives,
and a `visibilitychange` listener snaps the time the instant the tab is shown again -
so nobody ever sees a stale clock.

### Options

| option     | default | description                                                                                 |
| ---------- | ------- | ------------------------------------------------------------------------------------------- |
| `interval` | `1000`  | milliseconds between updates                                                                |
| `rate`     | `1`     | playback speed - `2` is double-speed, `0.5` is half, `0` is paused, negative runs backwards |
| `tick`     | -       | callback, given the spacetime object, after each update                                     |

- `.start()` re-anchors from wherever the epoch currently is - so `.stop()` → `.start()` behaves like pause → resume.
- calling `.start()` on an already-running object restarts it cleanly - no orphaned timers.
- `.stop()` lands the epoch exactly on the stop-moment, not on the last tick.

### Notes

- the plugin mutates the object's epoch in-place - `s` is the same object, always at the current playback time.
- it anchors on `Date.now()` (not `performance.now()`), because the monotonic clock can pause during laptop-sleep on some platforms - the wall-clock doesn't.
- works in node too - the visibility listener is browser-only.

MIT
