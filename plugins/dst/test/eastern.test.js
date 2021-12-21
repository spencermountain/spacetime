import test from 'tape'
import spacetime from 'spacetime'
import dst from '../src/index.js'
spacetime.extend(dst)

let tz = 'Canada/Eastern'
// eastern dst change dates
// from https://www.timeanddate.com/time/change/canada/toronto
// From 1987 to 2006, DST began on the first Sunday in April and ended on the last Sunday of October.
// Starting in 2007, the United States and Canada will on the second Sunday of March and end on the first Sunday of November.
let arr = [
  // [1980, 'April 27', 'October 26'],
  // [1981, 'April 26', 'October 25'],
  // [1982, 'April 25', 'October 31'],
  // [1983, 'April 24', 'October 30'],
  // [1984, 'April 29', 'October 28'],
  // [1985, 'April 28', 'October 27'],
  // [1986, 'April 27', 'October 26'],
  // [1987, 'April 5', 'October 25'],
  // [1988, 'April 3', 'October 30'],
  // [1989, 'April 2', 'October 29'],
  // [1990, 'April 1', 'October 28'],
  // [1991, 'April 7', 'October 27'],
  // [1992, 'April 5', 'October 25'],
  // [1993, 'April 4', 'October 31'],
  // [1994, 'April 3', 'October 30'],
  // [1995, 'April 2', 'October 29'],
  // [1996, 'April 7', 'October 27'],
  // [1997, 'April 6', 'October 26'],
  // [1998, 'April 5', 'October 25'],
  // [1999, 'April 4', 'October 31'],
  // [2000, 'April 2', 'October 29'],
  // [2001, 'April 1', 'October 28'],
  // [2002, 'April 7', 'October 27'],
  // [2003, 'April 6', 'October 26'],
  // [2004, 'April 4', 'October 31'],
  // [2005, 'April 3', 'October 30'],
  // [2006, 'April 2', 'October 29'],
  [2007, 'March 11', 'November 4'],
  [2008, 'March 9', 'November 2'],
  [2009, 'March 8', 'November 1'],
  [2010, 'March 14', 'November 7'],
  [2011, 'March 13', 'November 6'],
  [2012, 'March 11', 'November 4'],
  [2013, 'March 10', 'November 3'],
  [2014, 'March 9', 'November 2'],
  [2015, 'March 8', 'November 1'],
  [2016, 'March 13', 'November 6'],
  [2017, 'March 12', 'November 5'],
  [2018, 'March 11', 'November 4'],
  [2019, 'March 10', 'November 3']
]

test('test eastern-time', function (t) {
  arr.forEach((a) => {
    // let s=spacetime(a[1],tz).year(a[0])
    let have = spacetime.now(tz).year(a[0]).dst()
    let start = spacetime(have.start).format('{month} {date}')
    t.equal(start, a[1], '[start] ' + a[0])

    let end = spacetime(have.end).format('{month} {date}')
    t.equal(end, a[2], '[end] ' + a[0])
  })
  t.end()
})
