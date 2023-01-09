import test from 'tape'
import spacetime from '../index.js'
import { getStart } from '../newer/compute/_lib/yearStart.js'

test('random epoch-iso alignments', (t) => {
  let arr = [
    [1679079426975, "2023-03-17T18:57:06.975", "Etc/GMT"],
    [1815406743278, "2027-07-12T11:39:03.278", "America/Lower_Princes"],
    [1703796496084, "2023-12-28T21:48:16.084", "Africa/El_Aaiun"],
    [1735103364869, "2024-12-25T05:09:24.869", "Etc/Utc"],
    [1827821497808, "2027-12-03T10:11:37.808", "Asia/Damascus"],
    [1674639606902, "2023-01-25T16:10:06.902", "Asia/Yangon"],
    [1710997327076, "2024-03-21T07:02:07.076", "Europe/Chisinau"],
    [1781750750788, "2026-06-18T09:45:50.788", "Asia/Krasnoyarsk"],
    [1760923130233, "2025-10-19T22:18:50.233", "America/Recife"],
    [1672542000000, "2023-01-01T00:00:00.000", "America/Recife"],
    // [1694953939356, "2023-09-17T12:32:19.356", "Atlantic/Azores"],
  ]
  arr.forEach(a => {
    let [epoch, iso, tz] = a
    let str = spacetime(epoch, tz).iso()
    t.equal(str, iso, iso)
  })

  t.end()
})