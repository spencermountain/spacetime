# Spacetime 🌌🕟
## A lightweight way to manipulate, traverse, compare, and format dates and times across planet Earth
- *Get/set* dates and times in remote timezones
- Global support for *Daylight Savings Time*, *leap year*, and *hemispheres*
- Orient by quarter, season, and week
- Remote date comparison
- Written in *ES2015 JS*, published as *ES5*, tested for Node and the browser
- *Weighs in at just 35KB*
- Well tested, Apache2 licensed
- Made by your friendly friends at [Begin](https://begin.com)


# Install
`npm install spacetime --save`


# More information
## [Date formatting in Spacetime](https://github.com/smallwins/spacetime/wiki/Formatting)
## [Date inputs](https://github.com/smallwins/spacetime/wiki/Input)
## [More information, consideration, and caveats](https://github.com/smallwins/spacetime/wiki)


# Testing
In Node:
`npm test`


# API
```javascript
var spacetime=require('spacetime')

//couple helpers
s = spacetime.now()
s = spacetime.today() //this morning
s = spacetime.tomorrow() //tomorrow morning


//date inputs
s = spacetime(1489520157) //epoch
s = spacetime([2017, 5, 2]) //yyyy, m, d  (zero-based months, 1-based days)
s = spacetime('July 2, 2017 5:01:00')//iso-thing

//remotely-understood date
s = spacetime(1489520157, 'Canada/Pacific')

//misc fns
s.goto('Australia/Brisbane')  //roll-into a new timezone, at the same moment
s.clone()   // make a copy
s.isValid() // sept 32nd -> false

//get/set methods
s.date() //14
s.year() //2017
s.season() //spring
s.hour(5) //change to 5am
s.date(15) //change to the 15th
s.day('monday') //change to (this weeks) monday
s.month('march') //change to (this year's) march 1st
s.quarter(2) //change to april 1st

//add/subtract methods
s.add(1, 'week')
s.add(3, 'quarters')
s.subtract(2, 'months').add(1,'day')

//timezone meta-data
s.timezone().name //'Canada/Eastern' (either inferred or explicit)
s.timezone().hemisphere //north
s.timezone().current.offset //-240 (in minutes)
s.timezone().current.isDst //true

//comparisons
let d = spacetime([2017, 5, 2])
//gt/lt/equals
s.isAfter(d) //true
s.isEqual(d) //false
s.isBefore(d) //false

//comparison-by-unit
s.isSame(d, 'year') //true
s.isSame(d, 'date') //false
s.diff(d, 'day') // 5
s.diff(d, 'month') // 0

//formatting
s.format('time') //  '5:01am'
s.format('numeric-uk') //  02/03/2017
s.format('month') // 'April'
s.format('month-short') // 'Apr'

//calendar-sensitive movement
s.startOf('day')   // 12:01am
s.startOf('month') // 12:01am, april 1st
s.endOf('quarter') // 11:59:59pm, june 30th

//percentage-based information
s.progress().month = 0.23 //(we're a quarter-way through the month)
s.progress().day = 0.48   //almost noon!
s.progress().hour = 0.99  //8:59 and 59seconds
```