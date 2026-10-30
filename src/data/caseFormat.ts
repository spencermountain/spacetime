let titleCaseEnabled = true

export function useTitleCase(): boolean {
  return titleCaseEnabled
}

export function set(val: boolean): void {
  titleCaseEnabled = val
}
