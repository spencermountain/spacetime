// Use native compiler types when the consumer enables ESNext.Temporal.
// Keep the regular entry usable with older TypeScript standard libraries.
type NativeInstance<G, K extends string> = G extends {
  Temporal: Record<K, { prototype: infer T }>
} ? T : never

type Zoned = NativeInstance<typeof globalThis, 'ZonedDateTime'>
interface ZonedFallback {
  readonly epochMilliseconds: number
  readonly timeZoneId: string
  toString(): string
}

/** Native ZonedDateTime with ESNext.Temporal; a minimal shape otherwise. */
export type TemporalResult = [Zoned] extends [never] ? ZonedFallback : Zoned
/** Native date inputs supported by the main entry when ESNext.Temporal is enabled. */
export type TemporalInput = Zoned
  | NativeInstance<typeof globalThis, 'Instant'>
  | NativeInstance<typeof globalThis, 'PlainDate'>
  | NativeInstance<typeof globalThis, 'PlainDateTime'>
