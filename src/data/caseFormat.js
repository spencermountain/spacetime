let titleCaseEnabled = true
export function useTitleCase() {
  return titleCaseEnabled
}

export function set(useTitleCase) {
  titleCaseEnabled = useTitleCase
}
