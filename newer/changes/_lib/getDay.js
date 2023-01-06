// determine current day (mon, tues)
// using 'Key-Value Method' from - https://artofmemory.com/blog/how-to-calculate-the-day-of-the-week/

// const DAYS = [
//   'Sunday',
//   'Monday',
//   'Tuesday',
//   'Wednesday',
//   'Thursday',
//   'Friday',
//   'Saturday',
// ];

const month_code = function (n) {
  let month_codes = [
    null,
    0, //January
    3, //February
    3, //March
    6, //April
    1, //May
    4, //June
    6, //July
    2, //August
    5, //September
    0, //October
    3, //November
    5, //December
  ];
  return month_codes[n]
}

const year_code = function (year) {
  let yy = year % 100;
  return (yy + parseInt(yy / 4, 10)) % 7;
}

const century_code = function (year) {
  //julian
  if (year < 1752) {
    let c = parseInt(year / 100, 10);
    return 18 - c % 7;
  }
  //gregorian
  let c = parseInt(year / 100, 10);
  let codes = {
    '17': 4, // 1700s = 4
    '18': 2, // 1800s = 2
    '19': 0, // 1900s = 0
    '20': 6, // 2000s = 6
    '21': 4, // 2100s = 4
    '22': 2, // 2200s = 2
    '23': 0, // 2300s = 0
  }
  return codes[String(c)] || 0
}

// https://www.timeanddate.com/date/leapyear.html
const leap_code = function (year) {
  let is_leap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  if (is_leap === true) {
    return -1
  } else {
    return 0
  }
}

// which day of the week is it?
const getDay = function (year, month, date) {
  let yc = year_code(year);
  let mc = month_code(month);
  let cc = century_code(year);
  let dc = date;
  let lc = leap_code(year);
  // (Year Code + Month Code + Century Code + Date Number - Leap Year Code) mod 7
  let day = (yc + mc + cc + dc + lc) % 7;
  return day
  // return DAYS[day]
}
export default getDay


// 1969-07-20 - sunday
// 1897-03-14 - sunday
//1066-10-14 -sat
// let cal = { year: 2022, month: 10, date: 13 }
// let cal = { year: 1066, month: 10, date: 14 }
// let cal = { year: 1897, month: 3, date: 14 }
// let cal = { year: 1969, month: 7, date: 20 }