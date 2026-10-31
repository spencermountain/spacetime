import type { I18n } from '../types/index.ts'

let past = 'past'
let future = 'future'
let present = 'present'
let now = 'now'
let almost = 'almost'
let over = 'over'
let pastDistance = (value: string): string => `${value} ago`
let futureDistance = (value: string): string => `in ${value}`

export function pastDistanceString(value: string): string { return pastDistance(value) }
export function futureDistanceString(value: string): string { return futureDistance(value) }
export function pastString(): string { return past }
export function futureString(): string { return future }
export function presentString(): string { return present }
export function nowString(): string { return now }
export function almostString(): string { return almost }
export function overString(): string { return over }

export function set(i18n: I18n['distance']): void {
  pastDistance = i18n.pastDistance || pastDistance
  futureDistance = i18n.futureDistance || futureDistance
  past = i18n.past || past
  future = i18n.future || future
  present = i18n.present || present
  now = i18n.now || now
  almost = i18n.almost || almost
  over = i18n.over || over
}
