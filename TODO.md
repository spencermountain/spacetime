

1) hemisphere-sensitive support for seasons
```js
s.now('Australia/Brisbane').season('summer')//december!
```

2) configurable start-of-the-week

3) leap-year support in dayOfYear()
```js
for(let i = 0; i < 15; i++) {
  var s = spacetime({
    year: 2014 + i
  }).endOf('year');
  console.log(s.dayOfYear());
}
```

4) basic `window.Intl` fallback to guess timezone
if the env doesn't support that spec yet
