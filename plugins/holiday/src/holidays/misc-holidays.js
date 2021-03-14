//yep,
const jan = 0
const feb = 1
const march = 2
const april = 3
const may = 4
// const june = 5
const july = 6
// const august = 7
const sep = 8
const oct = 9
const nov = 10
const dec = 11

// hardcoded dates for astronomical holidays
//   ----please change, every few years(!)---
let dates = {
  // Jewish
  'tu bishvat': [jan, 31],
  'tu bshevat': [jan, 31],
  purim: [march, 1],
  passover: [march, 31], // Ranged holiday [april, 7],
  'yom hashoah': [april, 11],
  'lag baomer': [may, 3],
  shavuot: [may, 20],
  'tisha bav': [july, 22],
  'rosh hashana': [sep, 10],
  'yom kippur': [sep, 19],
  sukkot: [sep, 24], // Ranged holiday [sep, 30],
  'shmini atzeret': [oct, 1],
  'simchat torah': [oct, 2],
  chanukah: [dec, 3], // Ranged holiday [dec, 30],
  hanukkah: [dec, 3], // Ranged holiday [dec, 30],

  // Additional important holidays
  'chinese new year': [feb, 16],
  diwali: [nov, 7]
}
module.exports = dates
