import test from 'tape'
import { rollup } from 'rollup'
import { resolve } from 'node:path'
import guard from '../../scripts/_lib/temporal-build-guard.js'

const rejects = async (t, operation, pattern) => {
  try {
    await operation()
    t.fail('expected build rejection')
  } catch (error) {
    t.match(error.message, pattern)
  }
}

test('Temporal build guard rejects the legacy engine', async t => {
  await rejects(t, () => rollup({ input: 'src/index.js', plugins: [guard()] }), /Temporal bundle.*module/)
  t.end()
})

test('Temporal build guard rejects external runtime dependencies', async t => {
  const input = resolve('src/temporal/__external-test.js')
  await rejects(t, () => rollup({
    input,
    external: ['example-runtime-dependency'],
    plugins: [{
      name: 'external-fixture',
      resolveId(id) { return id === input ? input : null },
      load(id) { return id === input ? "export { default } from 'example-runtime-dependency'" : null }
    }, guard()]
  }), /Temporal bundle.*external/)
  t.end()
})

test('Temporal build guard enforces both size budgets', async t => {
  for (const limits of [{ maxBytes: 1 }, { maxBytes: 1000000, maxGzipBytes: 1 }]) {
    const bundle = await rollup({ input: 'src/temporal/index.js', plugins: [guard(limits)] })
    try {
      await rejects(t, () => bundle.generate({ format: 'esm' }), /Temporal bundle.*size/)
    } finally {
      await bundle.close()
    }
  }
  t.end()
})
