const percent = (part, total) => {
  let num = (part / total) * 100;
  num = Math.round(num * 10) / 10;
  return num;
};

const units = ['year', 'month', 'date', 'hour', 'minute', 'second']
const progress = function (unit) {
  return units.reduce((h, u) => {
    let start = this.startOf(u)
    let end = this.next(u)
    let total = end.epoch - start.epoch
    let n = this.epoch - start.epoch
    h[u] = percent(n, total)
    return h
  }, {})
}
export default progress