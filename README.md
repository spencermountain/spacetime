<p align="center">
  <img width="800px" src=https://cloud.githubusercontent.com/assets/200964/25362769/e553c17a-290a-11e7-938d-ef2f12ec4c4c.jpg>
</p>

<!--
[ ![Codeship Status for smallwins/spacetime](https://app.codeship.com/projects/6e9dace0-f88b-0134-515a-7e4075ae1ca2/status?branch=master)](https://app.codeship.com/projects/211003)
-->

# Spacetime 🌌🕟
### A lightweight way to manipulate, traverse, compare, and format dates and times across planet Earth
- **Get/set** dates and times in remote timezones
- Global support for **Daylight Savings Time**, **leap years + seconds**, and **hemispheres**
- Orient by quarter, season, month, and week
- Remote date comparison
- Written in **ES2015 JS**, published as **ES5**, tested for Node and the browser
- **Weighs in at just 35KB** _(which is 12KB gzipped…)_
- Well tested, Apache2 licensed
- Made by your friendly friends at [Begin](https://begin.com)


# Install
`npm install spacetime --save`


# Testing 
In Node:

`npm test`


# More information
### [Date formatting in Spacetime](https://github.com/smallwins/spacetime/wiki/Formatting)
### [Date inputs](https://github.com/smallwins/spacetime/wiki/Input)
### [More info, considerations, & caveats](https://github.com/smallwins/spacetime/wiki)


# API
```javascript
var spacetime=require('spacetime')

// Some helpers
s = spacetime.now()
s = spacetime.today() // This morning
s = spacetime.tomorrow() // Tomorrow morning

// Date inputs
s = spacetime(1489520157) // Epoch
s = spacetime([2017, 5, 2]) // yyyy, m, d (zero-based months, 1-based days)
s = spacetime('July 2, 2017 5:01:00') // ISO

// Remotely understood date
s = spacetime(1489520157, 'Canada/Pacific')

// Get/set methods
s.date() // 14
s.year() // 2017
s.season() // Spring
s.hour(5) // Change to 5am
s.date(15) // Change to the 15th
s.day('monday') // Change to (this week's) monday
s.month('march') // Change to (this year's) March 1st
s.quarter(2) // Change to April 1st

// Add/subtract methods
s.add(1, 'week')
s.add(3, 'quarters')
s.subtract(2, 'months').add(1,'day')

// Timezone metadata
s.timezone().name // 'Canada/Eastern' (either inferred or explicit)
s.timezone().hemisphere // North
s.timezone().current.offset // -240 (in minutes)
s.timezone().current.isDst // True

// Comparisons
let d = spacetime([2017, 5, 2])

// gt/lt/equals
s.isAfter(d) // True
s.isEqual(d) // False
s.isBefore(d) // False

// Comparison by unit
s.isSame(d, 'year') // True
s.isSame(d, 'date') // False
s.diff(d, 'day') // 5
s.diff(d, 'month') // 0

// Date + time ormatting
s.format('time') // '5:01am'
s.format('numeric-uk') // 02/03/2017
s.format('month') // 'April'
s.format('month-short') // 'Apr'

// Calendar-sensitive movement
s.startOf('day') // 12:00am
s.startOf('month') // 12:00am, April 1st
s.endOf('quarter') // 11:59:59pm, June 30th

// Percentage-based information
s.progress().month = 0.23 // We're a quarter way through the month
s.progress().day = 0.48   // Almost noon
s.progress().hour = 0.99  // 59 minutes and 59 seconds

// Misc functions
s.goto('Australia/Brisbane') // Roll into a new timezone, at the same moment
s.clone() // Make a copy
s.isValid() // Sept 32nd → false
```

Image courtesy [NASA](https://www.nasa.gov) 💕🚀🌌
