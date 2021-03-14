<div align="center">

  <div>a CLI calendar</div>
  <div><img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" /></div>

  <div align="center">
    <a href="https://npmjs.org/package/spacetime-cal">
      <img src="https://img.shields.io/npm/v/spacetime-cal.svg?style=flat-square" />
    </a>
    <a href="https://unpkg.com/spacetime-cal/builds/spacetime-cal.min.js">
      <img src="https://badge-size.herokuapp.com/spencermountain/spacetime-cal/master/builds/spacetime-cal.min.js" />
    </a>
  </div>
  <div align="center">
    <code>npm i -g spacetime-cal</code>
  </div>
  <sub>
    by
    <a href="https://spencermountain.github.io/">Spencer Kelly</a>
  </sub>
</div>
<p></p>

The [cal](https://en.m.wikipedia.org/wiki/Cal_(Unix)) command is one of the earliest, and longest-lasting UNIX shell commands. It is beautiful.

This is just the same thing, basically. I've tried making it easier to hack, and nicer to look-at.

Thats's all.

<img width="327" alt="image" src="https://user-images.githubusercontent.com/399657/111079058-a9b0d580-84ce-11eb-82be-99357fe2605a.png">

if you want to just try it, you can run:
```
npx spacetime-cal
```

<!-- spacer -->
<img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

Unix applications have a real aesthetic - here's how you can get the weeks to start on a Monday, using `cal` [¹](http://hints.macworld.com/article.php?story=20040625094428394)
```bash
cal | awk '{ print " "$0; getline; print " Mo Tu We Th Fr Sa Su"; \
getline; if (substr($0,1,2) == " 1") print "                    1 "; \
do { prevline=$0; if (getline == 0) exit; print " " \
substr(prevline,4,17) " " substr($0,1,2) " "; } while (1) }'
```

i mean,
```bash
spacetime-cal --monday
```

### Options

Built with [Ink](https://github.com/vadimdemedes/ink), [spacetime](https://github.com/spencermountain/spacetime), and [compromise-dates](https://github.com/spencermountain/compromise/tree/master/plugins/dates)

MIT