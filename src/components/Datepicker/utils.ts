/**
 * @type {Object}
 */
export const datepickerOption: DatepickerOptions = {
  datetime: 'datetime',
  date: 'date',
  daterange: 'daterange',
}

/**
 * @type {Array<String>}
 */
export const datepickerOptions: Array<string> = [
  datepickerOption.datetime,
  datepickerOption.date,
  datepickerOption.daterange,
]

/**
 * @type {Object}
 */
export const INTERNAL_VIEWS: DatepickerInternalViews = {
  calendar: 'calendar',
  time: 'time',
  year: 'year',
  month: 'month',
}

/**
 * @type {Object}
 */
export const FORMATS: DatepickerFormats = {
  date: 'YYYY-MM-DD',
  datetime: 'YYYY-MM-DD hh:mm',
  time: 'hh:mm',
}

export const FORMATS24h: object = {
  date: 'YYYY-MM-DD',
  datetime: 'YYYY-MM-DD HH:mm',
  time: 'HH:mm',
}

/**
 * @type {Object}
 */
export const MASKS: object = {
  date: '####-##-##',
  datetime: '####-##-## ##:##',
}

/**
 * @type {Array<String>}
 */
export const WEEK_DAYS: Array<string> = [
  'Mo',
  'Tu',
  'We',
  'Th',
  'Fr',
  'Sa',
  'Su',
]

/**
 * @type {Array<String>}
 */
export const MONTHS: Array<string> = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

/**
 * @type {Object}
 */
export const COMPONENTS: object = {
  calendar: 'SbDatepickerDays',
  time: 'SbDatepickerTime',
  month: 'SbDatepickerMonths',
  year: 'SbDatepickerYears',
}

export type DatepickerFormats = {
  date: string
  datetime: string
  time: string
}

export interface TimeZone {
  label: string
  value: string
  offset: string
}

export interface DatepickerOptions {
  datetime: string
  date: string
  daterange: string
}
export interface DatepickerInternalViews {
  calendar: string
  time: string
  year: string
  month: string
}

export enum HourFormats {
  Twelve = '12h',
  TwentyFour = '24h',
}

export interface DayItem {
  label: string
  date: string
  inMonth: boolean
  checked: boolean
  current: boolean
  insideRange: boolean
  disabled: boolean
  dataTestid: string
  border?: boolean
}
