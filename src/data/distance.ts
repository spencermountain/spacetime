let past = 'past'
let future = 'future'
let present = 'present'
let now = 'now'
let almost = 'almost'
let over = 'over'
let pastDistance = (value) => `${value} ago`
let futureDistance = (value) => `in ${value}`

export function pastDistanceString(value) { return pastDistance(value) }
export function futureDistanceString(value) { return futureDistance(value) }
export function pastString() { return past }
export function futureString() { return future }
export function presentString() { return present }
export function nowString() { return now }
export function almostString() { return almost }
export function overString() { return over }

export function set(i18n) {
    pastDistance = i18n.pastDistance || pastDistance
    futureDistance = i18n.futureDistance || futureDistance
    past = i18n.past || past
    future = i18n.future || future
    present = i18n.present || present
    now = i18n.now || now
    almost = i18n.almost || almost
    over = i18n.over || over
}