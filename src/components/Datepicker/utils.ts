/**
 * @type {Array<String>}
 */
export const datepickerOptions: Array<string> = [
  'datetime',
  'date',
  'daterange',
]

/**
 * @type {Object}
 */
export const INTERNAL_VIEWS: object = {
  CALENDAR: 'CALENDAR',
  TIME: 'TIME',
  YEAR: 'YEAR',
  MONTH: 'MONTH',
}

/**
 * @type {Object}
 */
export const FORMATS: object = {
  date: 'YYYY-MM-DD',
  datetime: 'YYYY-MM-DD hh:mm',
  time: 'hh:mm',
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
  CALENDAR: 'SbDatepickerDays',
  TIME: 'SbDatepickerTime',
  MONTH: 'SbDatepickerMonths',
  YEAR: 'SbDatepickerYears',
}
