/*
      ■  ■  ■  □  □
■  ■  ■  ■  ■  □  □
■  ■  ■  ■  ■  □  □
■  ■  ■  ■  ■  □  □
■  ■  ■
*/

const _ = '  '//

const toUnicode = function (res) {
  let txt = ''
  let s = res[0][6]
  //  txt = `${obj.start.format('{month} {year}')}\n`
  res.forEach((days) => {
    days.forEach(d => {
      let isEmpty = !d.isSame('month', s)
      let isSelected = false//d.isBetween(obj.start, obj.end)
      // let isSelected = select === n
      let day = d.day()
      let isWeekend = day === 6 || day === 0

      if (isEmpty) {
        txt += _ + _  //2 en-space
        return
      }
      if (isWeekend) {
        txt += `□` + _
        // txt += '⬚'+ _
        return
      }
      if (isSelected) {
        // txt += '◘' + _
        // txt += '⊡' + _
        txt += '□' + _
        // txt += '⬚' + _
        // txt += '▫' + _
        // txt += '■' + _
        return
      }
      txt += '■' + _
      // txt += `□` + _
      return
    })
    txt = txt.trimEnd()
    txt += '\n'
  })
  // console.log(txt)
  return txt
}
export default toUnicode