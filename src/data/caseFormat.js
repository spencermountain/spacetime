let titleCaseEnabled = true

export function useTitleCase() {
  return titleCaseEnabled
}

export function set(val) {
  titleCaseEnabled = val
}
