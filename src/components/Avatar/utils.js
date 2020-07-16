import styles from '../../assets/styles/js-variables.scss'
import { getRandomNumber } from '../../utils'

const COLORS = Object.entries(styles).filter(entry => {
  const [key] = entry
  return key.includes('colors')
})

/**
 * @type {Array<string>}
 */
export const availableSizes = ['large', 'normal', 'small']

/**
 * @description check if a size is valid
 * @method isSizeValid
 * @param  {string} size
 * @return {boolean}
 */
export const isSizeValid = size => availableSizes.indexOf(size) !== -1

/**
 * @description generates a random color
 * @method generateRandomColor
 * @return {string}
 */
export const generateRandomColor = () => {
  const randomNumber = getRandomNumber(0, COLORS.length)
  const color = COLORS[randomNumber]
  return color[1]
}

/**
 * @description get initials from username
 * @method getInitials
 * @param  {string} username
 * @return {string}
 */
export const getInitials = username => {
  const [firstWord, secondWord] = username.split(' ')

  if (firstWord && secondWord) {
    return `${firstWord.charAt(0)}${secondWord.charAt(0)}`
  }

  return firstWord.charAt(0)
}
