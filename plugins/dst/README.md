spacetime recognizes 490 IANA timezones

TzdbZone recognizes 424

CLDR recognizes 301

**184** of these do DST:

### **58** are US+Canada
	Spring: 2nd Sunday in March
	Fall: 1st Sunday in November

### **65** are EU:
	Spring: last Sunday in March.
	Fall: last Sunday in October.

### **15** are AUS
  Spring: 1st Sunday in April
  Fall: 1st Sunday in October

### 8 are in Mexico
  Spring: First Sunday in April
  Fall: Last Sunday in October

EU+US+AUS+MEX = 146

### 46 follow other patterns:
data from [here](http://www.webexhibits.org/daylightsaving/g.html)

<!-- #### Egypt 
start: Last Friday in April
End: Last Thursday in September -->

 <!-- ### Eastern africa (2)
Spring: First Sunday in April 
Fall: First Sunday in September -->

<!-- ### Brazil (2)
Spring: Third Sunday in February
Fall: Third Sunday in October -->

<!-- ### Eastern Europe?
Start: Last Sunday in March
End: Last Sunday in October -->

<!-- ### Iraq?
Start: First Friday in April
End: Last Friday in October -->



<!-- ### Israel
Start: Last Friday before April 2
End: The Sunday between Rosh Hashana and Yom Kippur -->


---

### In 2021:
```js
[
  [ '03/14:02->11/07:02', 58 ], // us
  [ '03/28:02->10/31:03', 36 ], //[eu]
  [ '04/04:03->10/03:02', 15 ], // aus
  [ '03/28:03->10/31:04', 14 ], //[eu]
  [ '03/28:01->10/31:02', 11 ], //[eu]
  [ '04/04:02->10/31:02', 8 ], // mex
  [ '03/08:02->11/01:01', 3 ], // whitehorse/yukon ?
  [ '03/12:03->11/05:01', 3 ],  // indiana/kentucky?
  [ '04/04:03->09/26:02', 3 ], // antarctica?
  [ '04/11:03->05/16:02', 2 ], //eastern-africa
  [ '02/16:24->11/03:00', 2 ], // brazil
  [ '03/27:22->10/30:23', 2 ],
  [ '04/03:24->09/05:00', 2 ],
  [ '03/28:00->10/31:01', 2 ], //[eu]
  [ '03/27:00->10/30:01', 2 ],
  [ '03/26:02->10/31:02', 2 ],
  [ '04/04:01->10/03:02', 2 ],
  [ '04/03:22->09/04:22', 2 ],
  [ '04/02:01->09/03:03', 1 ],
  [ '03/27:24->10/03:00', 1 ],
  [ '03/14:00->11/07:01', 1 ],
  [ '03/08:01->10/04:00', 1 ],
  [ '05/13:23->08/13:01', 1 ],
  [ '03/28:02->10/31:02', 1 ],
  [ '03/26:00->10/29:01', 1 ],
  [ '03/28:00->10/30:24', 1 ],
  [ '03/26:00->10/28:24', 1 ],
  [ '03/22:00->09/21:24', 1 ],
  [ '03/25:03->09/29:23', 1 ],
  [ '04/04:04->09/26:03', 1 ],
  [ '04/04:03->04/04:02', 1 ],
  [ '01/17:03->11/14:02', 1 ],
  [ '01/15:02->11/05:03', 1 ]
]
```


### Old tzs
tzs that dont exist in zoneinfo anymore

// canada/east-saskatchewan
// asia/volgograd
// america/argentina
// america/indiana
// america/kentucky
// america/north_dakota


### New tzs

America/Argentina/Buenos_Aires
America/Argentina/Cordoba
America/Argentina/Mendoza
America/Argentina/Tucuman
America/Argentina/Salta
America/Argentina/Catamarca
America/Argentina/San_Juan
America/Argentina/Jujuy
America/Argentina/San_Luis
America/Argentina/La_Rioja
America/Argentina/Rio_Gallegos
America/Argentina/Ushuaia
