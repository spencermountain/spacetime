<div align="center">

  <div>a CLI app to reckon a timezone</div>
  <div><img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" /></div>

  <div align="center">
    <a href="https://npmjs.org/package/stz">
      <img src="https://img.shields.io/npm/v/stz.svg?style=flat-square" />
    </a>
    <a href="https://unpkg.com/stz/builds/stz.min.js">
      <img src="https://badge-size.herokuapp.com/spencermountain/stz/master/builds/stz.min.js" />
    </a>
  </div>
  <div align="center">
    <code>npm i -g stz</code>
  </div>
  <sub>
    by
    <a href="https://spencermountain.github.io/">Spencer Kelly</a>
  </sub>
</div>
<p></p>
an easy way to check what time it is, somewhere else, from the command-line:
```bash
$ npx stz milwaukee
# 5:20pm
$ npx stz pacific time
# 4:20pm
```
or you can install it locally with `npm i -g stz`

this library uses [spacetime]() and [timezone-soft](https://github.com/spencermountain/timezone-soft) to loosely match a given timezone.

MIT