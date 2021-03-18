const reduceTo = function(arr, n) {
  if (arr.length <= n || arr.length <= 5) {
    return arr
  }
  while (arr.length > n) {
    //remove every other one
    arr = arr.filter((o, i) => {
      return i % 2 === 0
    })
    if (arr.length <= n || arr.length <= 5) {
      return arr
    }
  }
  return arr
}
module.exports = reduceTo
