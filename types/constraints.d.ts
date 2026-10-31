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
  | 'millennium'
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
  | 'millenniums'
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
  | 'iso-full'
  | 'sql'
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
  /** Alternatives to the words used by .since(), eg 'past', 'future', 'in 2 days', '2 days ago' */
  distance?: {
    past?: string
    future?: string
    present?: string
    now?: string
    almost?: string
    over?: string
    /** eg. (value) => `${value} ago` */
    pastDistance?: (value: string) => string
    /** eg. (value) => `in ${value}` */
    futureDistance?: (value: string) => string
  }
  /** Alternatives to the unit names used by .since(), eg 'second', 'seconds', 'minute'.. */
  units?: {
    second?: string
    seconds?: string
    minute?: string
    minutes?: string
    hour?: string
    hours?: string
    day?: string
    days?: string
    month?: string
    months?: string
    year?: string
    years?: string
  }
}
