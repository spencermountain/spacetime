//https://www.timeanddate.com/date/leapyear.html
const isLeapYear = function (year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
};
export default isLeapYear