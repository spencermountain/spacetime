
##when you move a js Date object to a remote tz, then call `.getDate()`, you are going to get the wrong date.

this is because js Date objects are always on the local calendar of the running computer.
![pasted image at 2017_02_22 10_47 am](https://cloud.githubusercontent.com/assets/399657/23219219/7db8628a-f8ec-11e6-868c-58cf40160936.png)

this is a wrapper of the js Date object. Internally, it represents any wacky timezone as your own local timezone.
so whenever you query for calendar information, it says the right thing, because it can do that.

when you ask for non-calendar-based information, like an epoch, you don't need to kick it back + forth, because it can do that.

things it does:

* easy output of `local`, `remote`, or `utc/epoch` dates

* morning, evening, midnight

* sameDay, week month, year comparisons (tricksy)

* last/next/this for day, week & year

* current week, quarter, season lookup
