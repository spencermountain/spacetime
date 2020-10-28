const MSEC_IN_HOUR = 60 * 60 * 1000;

const toUtc = (dstChange, offset, year) => {
  const [month, rest] = dstChange.split('/');
  const [day, hour] = rest.split(':');
  return Date.UTC(year, month - 1, day, hour) - offset * MSEC_IN_HOUR;
};

const shouldChange = (epoch, start, end, summerOffset, winterOffset) => {
  const year = new Date(epoch).getUTCFullYear();
  const startUtc = toUtc(start, winterOffset, year);
  const endUtc = toUtc(end, summerOffset, year);

  return epoch >= startUtc && epoch < endUtc;
}

module.exports = shouldChange
