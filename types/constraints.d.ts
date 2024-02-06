export type TimeUnit =
  | 'millisecond'
  | 'second'
  | 'minute'
  | 'quarterHour'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'quarter'
  | 'season'
  | 'year'
  | 'decade'
  | 'century'
  | 'date'
  | 'milliseconds' //plural forms
  | 'seconds'
  | 'minutes'
  | 'quarterHours'
  | 'hours'
  | 'days'
  | 'weeks'
  | 'months'
  | 'quarters'
  | 'seasons'
  | 'years'
  | 'decades'
  | 'centuries'
  | 'dates'

export type Format =
  | 'day'
  | 'day-short'
  | 'day-number'
  | 'day-ordinal'
  | 'day-pad'
  | 'date'
  | 'date-ordinal'
  | 'date-pad'
  | 'month'
  | 'month-short'
  | 'month-number'
  | 'month-ordinal'
  | 'month-pad'
  | 'year'
  | 'year-short'
  | 'time'
  | 'time-24'
  | 'hour'
  | 'hour-pad'
  | 'hour-24'
  | 'hour-24-pad'
  | 'minute'
  | 'minute-pad'
  | 'second'
  | 'second-pad'
  | 'millisecond'
  | 'ampm'
  | 'quarter'
  | 'season'
  | 'era'
  | 'timezone'
  | 'offset'
  | 'numeric'
  | 'numeric-us'
  | 'numeric-uk'
  | 'mm/dd'
  | 'iso'
  | 'json'
  | 'iso-short'
  | 'iso-utc'
  | 'nice'
  | 'nice-year'
  | 'nice-day'
  | 'nice-full'
  | string

export interface I18nOptions {
  /** Alternatives to Monday, Tuesday..*/
  days?: {
    short: string[]
    long: string[]
  }
  /** Alternatives to Jan, Feb..*/
  months?: {
    short: string[]
    long: string[]
  }
  /** Alternatives to am, pm*/
  ampm?: {
    am: string
    pm: string
  }
  /** Default dayname formatting */
  useTitleCase?: boolean
}
