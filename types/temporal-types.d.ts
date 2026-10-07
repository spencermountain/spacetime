/// <reference lib="esnext.temporal" />

export type Timezone = string | number | null
export type FieldValue = string | number
export type BoundaryUnit = 'millisecond' | 'second' | 'minute' | 'quarterhour' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year' | 'decade' | 'century' | 'millennium'
export type Unit = BoundaryUnit | 'date' | 'min' | 'quarter-hour' | 'season' | 'fortnight' | 'weekend'
export type Units = Unit | `${Unit}s` | 'centuries'
export type BoundaryUnits = BoundaryUnit | `${BoundaryUnit}s` | 'centuries' | 'date' | 'dates' | 'min' | 'mins' | 'quarter-hour' | 'quarter-hours'
export type DifferenceUnits = Exclude<Units, 'quarterhour' | 'quarterhours' | 'quarter-hour' | 'quarter-hours' | 'weekend' | 'weekends'>
export interface DateFields {
  year?: FieldValue | null
  month?: FieldValue | null
  date?: FieldValue | null
  hour?: FieldValue | null
  minute?: FieldValue | null
  second?: FieldValue | null
  millisecond?: FieldValue | null
  timezone?: Timezone
}
export interface Options {
  silent?: boolean
  british?: boolean
  dmy?: boolean
  weekStart?: number
  today?: DateFields
}
export type DateArray = [FieldValue?, FieldValue?, FieldValue?, FieldValue?, FieldValue?, FieldValue?, FieldValue?]
export type Input = string | number | Date | DateArray | DateFields | Spacetime | { epoch: number | null; tz?: string } | Temporal.Instant | Temporal.ZonedDateTime | Temporal.PlainDate | Temporal.PlainDateTime | null
export interface Json {
  year: number
  month: number
  date: number
  hour: number
  minute: number
  second: number
  millisecond: number
  century: number
  decade: number
  day: number
  offset: number
  timezone: string
}
export interface Difference {
  years: number
  months: number
  weeks: number
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}
export interface TimezoneInfo {
  name: string
  current: { offset: number }
}
export type FormatResult<F extends string> = F extends 'json' ? Json | '' : string extends F ? string | Json : string
export interface Spacetime {
  epoch: number | null
  get tz(): string
  set tz(value: Timezone)
  silent: boolean
  british: boolean | undefined
  clone(): Spacetime
  isValid(): boolean
  toTemporal(): Temporal.ZonedDateTime | null
  toNativeDate(): Date
  toLocalDate(): Date
  set(input?: Input, timezone?: Timezone): Spacetime
  goto(timezone?: Timezone): Spacetime
  timezone(): TimezoneInfo
  timezone(timezone: Timezone): Spacetime
  offset(): number
  format<F extends string = 'iso-short'>(format?: F): FormatResult<F>
  unixFmt(format: string): string
  iso(): string
  iso(input: Input): Spacetime
  isoFull(): string
  isoFull(input: Input): Spacetime
  epochSeconds(): number
  epochSeconds(value: number): Spacetime
  json(): Json
  json(input: DateFields): Spacetime
  year(): number
  year(value: FieldValue): Spacetime
  month(): number
  month(value: FieldValue, forward?: boolean): Spacetime
  monthName(): string
  monthName(value: FieldValue, forward?: boolean): Spacetime
  date(): number
  date(value: FieldValue, forward?: boolean): Spacetime
  day(): number
  day(value: FieldValue, forward?: boolean): Spacetime
  dayName(): string
  dayName(value: FieldValue, forward?: boolean): Spacetime
  dayOfYear(): number
  dayOfYear(value: number): Spacetime
  week(): number
  week(value: number, forward?: boolean): Spacetime
  weekStart(value: FieldValue): Spacetime
  quarter(): number
  quarter(value: FieldValue): Spacetime
  decade(): number
  decade(value: FieldValue): Spacetime
  century(): number
  century(value: FieldValue): Spacetime
  millennium(): number
  millennium(value: FieldValue): Spacetime
  era(): 'AD' | 'BC' | ''
  era(value: string): Spacetime
  hour(): number
  hour(value: FieldValue, forward?: boolean): Spacetime
  hour12(): number
  hour12(value: string, forward?: boolean): Spacetime
  hourFloat(): number
  hourFloat(value: number, forward?: boolean): Spacetime
  minute(): number
  minute(value: FieldValue, forward?: boolean): Spacetime
  second(): number
  second(value: FieldValue, forward?: boolean): Spacetime
  millisecond(): number
  millisecond(value: FieldValue): Spacetime
  ampm(): 'am' | 'pm' | ''
  ampm(value: 'am' | 'pm', forward?: boolean): Spacetime
  time(): string
  time(value: string, forward?: boolean): Spacetime
  leapYear(): boolean
  daysInMonth(): number
  add(amount: number, unit?: Units): Spacetime
  subtract(amount: number, unit?: Units): Spacetime
  startOf(unit?: BoundaryUnits): Spacetime
  endOf(unit?: BoundaryUnits): Spacetime
  next(unit?: BoundaryUnits): Spacetime
  last(unit?: BoundaryUnits): Spacetime
  progress(unit: BoundaryUnits): number
  nearest(unit?: BoundaryUnits): Spacetime
  diff(input: Input): Difference | number
  diff(input: Input, unit: DifferenceUnits): number
  isSame(input: Input, unit: BoundaryUnits, timezoneAware?: boolean): boolean | null
  isSame(unit: BoundaryUnits, input: Spacetime, timezoneAware?: boolean): boolean | null
  isBefore(input: Input): boolean | null
  isAfter(input: Input): boolean | null
  isEqual(input: Input): boolean | null
  isBetween(start: Input, end: Input, inclusive?: boolean): boolean | null
  hours: Spacetime['hour']
  hour24: Spacetime['hour']
  h24: Spacetime['hour']
  h12: Spacetime['hour12']
  minutes: Spacetime['minute']
  seconds: Spacetime['second']
  milliseconds: Spacetime['millisecond']
  years: Spacetime['year']
  months: Spacetime['month']
  days: Spacetime['day']
  millenium: Spacetime['millennium']
  plus: Spacetime['add']
  minus: Spacetime['subtract']
  round: Spacetime['nearest']
}
export interface TemporalStatic {
  (input?: Input, timezone?: Timezone, options?: Options): Spacetime
  now(timezone?: Timezone, options?: Options): Spacetime
  today(timezone?: Timezone, options?: Options): Spacetime
  tomorrow(timezone?: Timezone, options?: Options): Spacetime
  yesterday(timezone?: Timezone, options?: Options): Spacetime
  fromUnixSeconds(seconds: number, timezone?: Timezone, options?: Options): Spacetime
  extend(methods: Record<string, (this: Spacetime, ...args: never[]) => unknown>): TemporalStatic
  plugin: TemporalStatic['extend']
  version: string
}
