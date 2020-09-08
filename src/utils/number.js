/**
 * @description generates a random number between two numbers (inclusive)
 * @method getRandomNumber
 * @param  {number} min
 * @param  {number} max
 * @return {number}
 */
export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

/**
 * @description check if a value is a valid number
 * @method isValidNumber
 * @param  {any} value
 * @return {number}
 */
export const isValidNumber = value => typeof value === 'number'
