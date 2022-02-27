let morning = 'am'
let evening = 'pm'

export function am() { return morning }
export function pm() { return evening }
export function set(i18n) {
    morning = i18n.am || morning
    evening = i18n.pm || evening
}