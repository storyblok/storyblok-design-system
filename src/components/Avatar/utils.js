import {
  getRandomNumber,
  availableSizes,
  availableColorsNoWhite,
} from '../../utils'

/**
 * @description check if a size is valid
 * @method isSizeValid
 * @param  {string} size
 * @return {boolean}
 */
export const isSizeValid = (size) => availableSizes.indexOf(size) !== -1

/**
 * @description generates a random bg color class
 * @method generateRandomBgColor
 * @return {string}
 */
export const generateRandomBgColor = () => {
  const randomNumber = getRandomNumber(0, availableColorsNoWhite.length)

  return 'bg-' + availableColorsNoWhite[randomNumber]
}

/**
 * @description get randomly a color
 * @method generateRandomColor
 * @return {string}
 */
export const generateRandomColor = () => {
  const randomNumber = getRandomNumber(0, availableColorsNoWhite.length)

  return availableColorsNoWhite[randomNumber]
}

/**
 * @description get initials from username
 * @method getInitials
 * @param  {string} username
 * @return {string}
 */
export const getInitials = (username) => {
  const [firstWord, secondWord] = username.split(' ')

  if (firstWord && secondWord) {
    return `${firstWord.charAt(0)}${secondWord.charAt(0)}`
  }

  return `${firstWord.charAt(0)}${firstWord.charAt(1)}`
}
