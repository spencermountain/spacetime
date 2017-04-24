<div align="center">
  <h3>
   🌠 think about it this way,
  </h3>
  a <b>unix epoch</b> is like a <b>heart-beat</b> of the <b>entire universe</b>💫
  <div>
    <i>(you can get it <a href="http://www.convert-unix-time.com">online</a> or with <b>Date.now()</b>)</i>
  </div>
</div>

<i>but look:</i>
```js
d = new Date(epoch)
d.getHours()
//hmmm
```
you computer <i>automatically</i> applies <b>the bias of your computer</b> when interpreting the date.

<div align="left">
  It can't do anything else.
</div>

<div align="center">
  <h4>i mean, try to hack another timezone 😅</h4>
</div>
by pushing around the milliseconds:

```js
let here = new Date()
let offset= 5 * 60 * 1000 // allons-y à Paris!
paris = new Date(here.getTime() + offset)
paris.getHours() // ohfuuuuuu
```
you may be surprised when you call `.getDate()`, or `.setDate()`, or anything really.

<b>i know right, computers.</b>
<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23921748/277df1d8-08d6-11e7-8b64-d92be8750b4c.png"/>
</div>

<div align="center">
  <h3>this is a wrapper of the js Date object</h3>
</div>

Internally, it can **emulate** another timezone locally. So when you query it for calendar information, it's right:

```js
let s=spacetime('March 1 2020', 'America/New_York')
s.time('4:20pm')

s.goto('America/Los_Angeles')
//Mar 1st, 1:20pm
s.hour(4)
//Mar 1st, 4:20pm

s.subtract(1, 'day')
//Feb 29th, 4:20pm (leap-year!)
```

things it does:

* **get/set** in remote timezones (like in [moment-timezone](http://momentjs.com))
* **Daylight-Savings-Time** and **leap-year** support + lookup
* comparison of remote dates
* 35k, <b>IE9+</b>

## API
<h3 align="center">
  <a href="https://github.com/smallwins/spacetime/wiki">Some Gotchas</a>
  <span>&nbsp; | &nbsp;</span>
  <a href="https://github.com/smallwins/spacetime/wiki/Formatting">Date formatting</a>
  <span>&nbsp; | &nbsp;</span>
  <a href="https://github.com/smallwins/spacetime/wiki/Input">Input formats</a>
</h3>

```js
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

made by [Smallwins](https://smallwins.today/)
Apache-2
