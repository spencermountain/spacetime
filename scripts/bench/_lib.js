import { performance } from 'node:perf_hooks'

const TARGET_MS = 100
const MIN_SAMPLES = 30
const MAX_SAMPLES = 60
const WINDOW = 30
const MAX_SPREAD = 5
const MAX_ITERATIONS = 1000000
let sink = 0

const median = values => {
  const sorted = [...values].sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)
  return (sorted[middle] + sorted[Math.floor((sorted.length - 1) / 2)]) / 2
}

const trimmedMean = values => {
  const sorted = [...values].sort((a, b) => a - b)
  const trim = Math.floor(sorted.length * 0.2)
  const kept = sorted.slice(trim, sorted.length - trim)
  return kept.reduce((total, value) => total + value, 0) / kept.length
}

const batch = (run, iterations) => {
  let checksum = 0
  const start = performance.now()
  for (let i = 0; i < iterations; i += 1) {
    checksum += run()
  }
  const elapsed = performance.now() - start
  sink = (sink + checksum) % 2147483647
  if (!Number.isFinite(sink)) {
    throw new Error('Benchmark produced an invalid checksum')
  }
  return elapsed
}

const calibrate = run => {
  for (let count = 1; count <= MAX_ITERATIONS; count *= 2) {
    const elapsed = batch(run, count)
    if (elapsed >= TARGET_MS / 2 || count * 2 > MAX_ITERATIONS) {
      return Math.min(MAX_ITERATIONS, Math.max(1, Math.ceil(count * TARGET_MS / elapsed)))
    }
  }
  return MAX_ITERATIONS
}

const spread = samples => {
  const recent = samples.slice(-WINDOW)
  const blocks = [0, 10, 20].map(start => median(recent.slice(start, start + 10)))
  return 100 * (Math.max(...blocks) - Math.min(...blocks)) / median(blocks)
}

const benchmark = cases => {
  const suite = cases.map(test => ({ ...test, iterations: calibrate(test.run), samples: [] }))
  for (let round = 0; round < 3; round += 1) {
    suite.forEach(test => batch(test.run, test.iterations))
  }
  let stable = false
  for (let round = 0; round < MAX_SAMPLES; round += 1) {
    // Rotate order to distribute thermal drift and background interruptions.
    for (let offset = 0; offset < suite.length; offset += 1) {
      const test = suite[(round + offset) % suite.length]
      test.samples.push(batch(test.run, test.iterations) / test.iterations)
    }
    if (round + 1 >= MIN_SAMPLES && (round + 1) % 6 === 0) {
      stable = suite.every(test => spread(test.samples) <= MAX_SPREAD)
      if (stable) {
        break
      }
    }
  }
  const results = suite.map(test => ({
    name: test.name,
    milliseconds: trimmedMean(test.samples),
    spreadPercent: spread(test.samples),
    iterations: test.iterations,
  }))
  return {
    stable,
    samples: suite[0].samples.length,
    score: 1000 / results.reduce((total, test) => total + test.milliseconds, 0),
    cases: results,
  }
}

export default benchmark
