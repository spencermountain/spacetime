<div align="center">
  <h3>
   🌠 ...think about it this way,
  </h3>
  a <b>unix epoch</b> is a cosmic <i>sagan-like</i> heart-beat of the 💫<b>entire universe</b>💫
  <div>
    <i>you can get it <a href="http://www.convert-unix-time.com">online</a> or with <code>Date.now()</code></i>
  </div>
</div>

<i>but look:</i>
```js
d = new Date(epoch)
d.getHours() //hmmm
```
now it's <b>no-longer universal</b>, but specific to your computer.

<i>it's a little subtle</i>, but `Date objects` always run with a bias of the local calendar.

They can't do anything else, and it's a tricky place to be in these days.

<div align="left">
  <h3> try to pretend another timezone 😅</h3>
</div>
just shifting forward the epoch..

```js
here = new Date()
// allons-y à Paris!
var offset= 5*60*1000
paris = new Date(here.getTime() + offset)
paris.getHours() //ohfuuuuuu
```
you are going to be surprised when call `.getDate()`, or `.setDate()`, or anything really.

<b>i know, computers.</b>
<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23921748/277df1d8-08d6-11e7-8b64-d92be8750b4c.png"/>
</div>

this is a wrapper of the js Date object. Internally, it can represent any timezone as your own local timezone.
so when you query it for calendar information, it says the right thing, because it can do that.

when you ask for non-calendar-based information (like an epoch) you don't need to kick it back again, because it can do that too.

things it does:

* get/set in remote timezones (like in [moment-timezone](http://momentjs.com))
* Daylight-savings lookup + support
* comparison of non-local dates
* around 25k, <b>IE9+</b>

## API
```js
var spacetime=require('spacetime')

//couple helper fns:
s = spacetime.now()
s = spacetime.today() //this morning
s = spacetime.tomorrow() //tomorrow morning


//date inputs
s = spacetime(1489520157)//epoch
s = spacetime([2017, 5, 2])//yyyy, m, d  (zero-based months, 1-based days)
s = spacetime('July 2, 2017 5:01:00')//iso-thing
//remotely-understood date
s = spacetime(1489520157, 'Canada/Pacific')


//misc fns
s.goto('Australia/Brisbane')  //roll-into a new timezone, at the same moment
s.clone()   // make a copy
s.isValid() // sept 32nd -> false


//get/set methods
s.date()//14
s.year()//2017
s.season()//spring
s.hour(5)//change to 5am
s.date(15)//change to the 15th
s.day('monday')//change to (this weeks) monday
s.month('march')//change to (this year's) march 1st
s.quarter(2)//change to april 1st


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
s.isAfter(d)//true
s.isEqual(d)//false
s.isBefore(d)//false
//comparison-by-unit
s.isSame(d, 'year')//true
s.isSame(d, 'date')//false


//formatting
s.format().time.short //  '5:01am'
s.format().numeric.uk //  02/03/2017
s.format().month.long // 'April'
s.emoji().season      // '⛄'


//calendar-sensitive movement
s.startOf('day')   // 12:01am
s.startOf('month') // 12:01am, april 1st
s.endOf('quarter') // 11:59:59pm, june 30th


//percentage-based information
s.progress().month = 0.23 //(we're a quarter-way through the month)
s.progress().day = 0.48 //almost noon!
s.progress().hour = 0.99 // 8:59 and 59seconds
```
