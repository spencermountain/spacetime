// fancy ray-casting algorithm to do this quickly
// from https://gist.github.com/bycoffe/5575904
// http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
const pointInPolygon = function (point, polygon) {
  let x = point[0]
  let y = point[1]
  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    let xi = polygon[i][0]
    let yi = polygon[i][1]
    let xj = polygon[j][0]
    let yj = polygon[j][1]
    let intersect =
      yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
    if (intersect === true) {
      inside = !inside
    }
  }
  return inside
}
export default pointInPolygon