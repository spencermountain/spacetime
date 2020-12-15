let titleCaseEnabled = true
module.exports = {
  useTitleCase: () => titleCaseEnabled,
  set: useTitleCase => {
    titleCaseEnabled = useTitleCase
  }
}
