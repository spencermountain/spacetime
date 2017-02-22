
##if you move a js Date object by a timezone offset, then call `.getDate()`, you are going to get the wrong date.

this is because js Date objects are always in the local timezone.


this is a wrapper of the js Date object.


things it does:

* easy output of `local`, `remote`, or `epoch`

* morning, evening

* next/this/last week, month

* isSame day, month, year
