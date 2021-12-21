import test from 'tape'
import spacetime from '../../../src/index.js'
import dst from '../src.js'
spacetime.extend(dst)

let tz = 'Europe/Paris'
let arr = [
  [1980, 'April 6', 'September 28'],
  [1981, 'March 29', 'September 27'],
  [1982, 'March 28', 'September 26'],
  [1983, 'March 27', 'September 25'],
  [1984, 'March 25', 'September 30'],
  [1985, 'March 31', 'September 29'],
  [1986, 'March 30', 'September 28'],
  [1987, 'March 29', 'September 27'],
  [1988, 'March 27', 'September 25'],
  [1989, 'March 26', 'September 24'],
  [1990, 'March 25', 'September 30'],
  [1991, 'March 31', 'September 29'],
  [1992, 'March 29', 'September 27'],
  [1993, 'March 28', 'September 26'],
  [1994, 'March 27', 'September 25'],
  [1995, 'March 26', 'September 24'],
  [1996, 'March 31', 'October 27'],
  [1997, 'March 30', 'October 26'],
  [1998, 'March 29', 'October 25'],
  [1999, 'March 28', 'October 31'],
  [2000, 'March 26', 'October 29'],
  [2001, 'March 25', 'October 28'],
  [2002, 'March 31', 'October 27'],
  [2003, 'March 30', 'October 26'],
  [2004, 'March 28', 'October 31'],
  [2005, 'March 27', 'October 30'],
  [2006, 'March 26', 'October 29'],
  [2007, 'March 25', 'October 28'],
  [2008, 'March 30', 'October 26'],
  [2009, 'March 29', 'October 25'],
  [2010, 'March 28', 'October 31'],
  [2011, 'March 27', 'October 30'],
  [2012, 'March 25', 'October 28'],
  [2013, 'March 31', 'October 27'],
  [2014, 'March 30', 'October 26'],
  [2015, 'March 29', 'October 25'],
  [2016, 'March 27', 'October 30'],
  [2017, 'March 26', 'October 29'],
  [2018, 'March 25', 'October 28'],
  [2019, 'March 31', 'October 27']
]
test('test paris-time', function (t) {
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
