
##if you move a js Date object by a timezone offset, then call `.getDate()`, you are going to get the wrong date.

this is because js Date objects are always in the local timezone.
![pasted image at 2017_02_22 10_47 am](https://cloud.githubusercontent.com/assets/399657/23219219/7db8628a-f8ec-11e6-868c-58cf40160936.png)

this is a wrapper of the js Date object.


things it does:

* easy output of `local`, `remote`, or `epoch`

* morning, evening

* next/this/last week, month

* isSame day, month, year
