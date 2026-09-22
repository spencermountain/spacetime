// fancy ray-casting algorithm to do this quickly
// from https://gist.github.com/bycoffe/5575904
// http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
const pointInPolygon = function (point, polygon) {
  const x = point[0]
  const y = point[1]
  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0]
    const yi = polygon[i][1]
    const xj = polygon[j][0]
    const yj = polygon[j][1]
    const intersect =
      yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
    if (intersect === true) {
      inside = !inside
    }
  }
  return inside
}
export default pointInPolygon