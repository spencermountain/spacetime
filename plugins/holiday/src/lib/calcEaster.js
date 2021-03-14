// by John Dyer
// based on the algorithm by Oudin (1940) from http://www.tondering.dk/claus/cal/easter.php
const calcEaster = function(year) {
  let f = Math.floor,
    // Golden Number - 1
    G = year % 19,
    C = f(year / 100),
    // related to Epact
    H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
    // number of days from 21 March to the Paschal full moon
    I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
    // weekday for the Paschal full moon
    J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
    // number of days from 21 March to the Sunday on or before the Paschal full moon
    L = I - J,
    month = 3 + f((L + 40) / 44),
    date = L + 28 - 31 * f(month / 4)

  month = month === 4 ? 'April' : 'March'
  return month + ' ' + date
}

module.exports = calcEaster
