import type { Spacetime } from '../../src/types/index.ts'
// Load only the implementation selected by the test command.
const implementations: Record<string, string> = {
  src: '../../src/index.ts',
  prod: '../../builds/spacetime.mjs'
}
const path = implementations[process.env.TESTENV] || implementations.src
// (both implementations share the public api, so type the loaded one as the source)
const { default: spacetime } = (await import(path)) as typeof import('../../src/index.ts')

/** call an instance method by name, for tests that iterate over the api */
export const call = (s: Spacetime, method: string, ...args: unknown[]): any =>
  (s as unknown as Record<string, (...a: unknown[]) => any>)[method](...args)

export default spacetime
