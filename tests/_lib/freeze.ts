// optional setup-file for run.ts - travels the system clock to $FAKE_DATE
// usage:  FAKE_DATE='2024-02-29T12:00:00' node --import tsx tests/_lib/run.ts tests/_lib/freeze.ts tests
import timekeeper from 'timekeeper'

const when = process.env.FAKE_DATE
if (when) {
  const d = new Date(when) // no 'Z' means local wall-clock time
  if (isNaN(d.getTime())) {
    throw new Error(`bad FAKE_DATE: '${when}'`)
  }
  // time keeps flowing from here; only no-arg `new Date()` / `Date.now()` are affected
  timekeeper.travel(d)
  // a test's own tk.reset() teardown would restore the real clock -
  // make it return to the traveled date instead, so the rest of the suite stays on it
  const reset = timekeeper.reset.bind(timekeeper)
  timekeeper.reset = () => {
    reset()
    timekeeper.travel(d)
  }
  // eslint-disable-next-line no-console
  console.error(`# clock traveled to: ${new Date().toString()}`)
}
