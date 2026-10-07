import test from 'tape'
import spacetime from '../_lib/index.js'
import defaultSettings from '../_lib/i18n-defaults.js'

test('i18n, past and future', (t) => {
  t.teardown(() => spacetime.now().i18n(defaultSettings))
    const start = spacetime("Dec 25th 2021");
    const end = start
        .add(1, 'minute')
        .add(2, 'seconds')
        .add(3, 'hours')
        .add(1, 'day');

    const translationValues = {
        distance: {
            past: 'pasado',
            future: 'futuro',
            present: 'presente',
            now: 'ahora',
            almost: 'casi',
            over: 'pasan',
            pastDistance: (value) => `hace ${value}`,
            futureDistance: (value) => `en ${value}`
        },
        units: {
            second: 'segundo',
            seconds: 'segundos',
            minute: 'minuto',
            minutes: 'minutos',
            hour: 'hora',
            hours: 'horas',
            day: 'dia',
            days: 'dias',
            month: 'mes',
            months: 'meses',
            year: 'año',
            years: 'años',
        },
    }

    start.i18n(translationValues);
    end.i18n(translationValues);


    t.deepEqual(end.since(start), {
        diff: { days: 1, hours: 3, minutes: 1, months: 0, seconds: 2, years: 0 },
        precise: "hace 1 dia, 3 horas",
        qualified: "hace 1 dia",
        rounded: "hace 1 dia",
        abbreviated: ['1d', '3h', '1m', '2s'],
        iso: "P0Y0M1DT3H1M2S",
        direction: 'pasado'
    })

    t.deepEqual(start.since(end), {
        diff: { days: -1, hours: -3, minutes: -1, months: 0, seconds: -2, years: 0 },
        precise: "en 1 dia, 3 horas",
        qualified: "en 1 dia",
        rounded: "en 1 dia",
        abbreviated: ['1d', '3h', '1m', '2s'],
        iso: "P0Y0M1DT3H1M2S",
        direction: 'futuro'
    })

    t.end()
})

test('i18n, almost and over', (t) => {
  t.teardown(() => spacetime.now().i18n(defaultSettings))
    const start = spacetime("Dec 25th 2021");
    const almost21Days = start
        .add(23, 'hours')
        .add(20, 'days')
    const almost1Hour = start
        .add(5, 'hours')
        .add(59, 'minutes')
    const overTwoMonths = start.clone().add(2, 'months').add(11, 'days')

    const translationValues = {
        distance: {
            past: 'pasado',
            future: 'futuro',
            present: 'presente',
            now: 'ahora',
            almost: 'casi',
            over: 'algo más de',
            pastDistance: (value) => `hace ${value}`,
            futureDistance: (value) => `en ${value}`
        },
        units: {
            second: 'segundo',
            seconds: 'segundos',
            minute: 'minuto',
            minutes: 'minutos',
            hour: 'hora',
            hours: 'horas',
            day: 'dia',
            days: 'dias',
            month: 'mes',
            months: 'meses',
            year: 'año',
            years: 'años',
        },
    }

    start.i18n(translationValues);
    almost21Days.i18n(translationValues)
    almost1Hour.i18n(translationValues)
    overTwoMonths.i18n(translationValues)

    t.deepEqual(start.since(almost21Days).qualified, "en casi 21 dias")
    t.deepEqual(almost1Hour.since(start).qualified, "hace casi 6 horas")
    t.deepEqual(start.since(overTwoMonths).qualified, "en algo más de 2 meses" )

    t.end()
})

test('i18n, now', (t) => {
  t.teardown(() => spacetime.now().i18n(defaultSettings))
    const start = spacetime("Dec 25th 2021");
    const end = spacetime("Dec 25th 2021");

    const translationValues = {
        distance: {
            past: 'pasado',
            future: 'futuro',
            present: 'presente',
            now: 'ahora',
            almost: 'casi',
            over: 'pasan',
            pastDistance: (value) => `hace ${value}`,
            futureDistance: (value) => `en ${value}`
        },
        units: {
            second: 'segundo',
            seconds: 'segundos',
            minute: 'minuto',
            minutes: 'minutos',
            hour: 'hora',
            hours: 'horas',
            day: 'dia',
            days: 'dias',
            month: 'mes',
            months: 'meses',
            year: 'año',
            years: 'años',
        },
    }

    start.i18n(translationValues);
    end.i18n(translationValues)

    t.deepEqual(start.since(end), {
        diff: {
            years: 0,
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        },
        rounded: 'ahora',
        qualified: 'ahora',
        precise: 'ahora',
        abbreviated: [],
        iso: 'P0Y0M0DT0H0M0S',
        direction: 'presente'
    })

    t.end()
})
