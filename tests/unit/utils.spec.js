import {
  capitalize,
  capitalizeAllAfterSpaces,
  getRandomNumber,
} from '../../src/utils'

describe('Utils function', () => {
  describe('test capitalize function', () => {
    it('should change to upper case the first letter in a string', () => {
      expect(capitalize('storyblok is amazing')).toBe('Storyblok is amazing')
    })

    it('should return an empty string when is pass an empty string or nothing', () => {
      expect(capitalize('')).toBe('')

      expect(capitalize()).toBe('')
    })

    it('should keep the capitalize behavior when the string is already capitalized', () => {
      expect('Storyblok is amazing').toBe('Storyblok is amazing')
    })
  })

  describe('test capitalizeAllAfterSpaces function', () => {
    it('should capitalize every word in a string', () => {
      expect(capitalizeAllAfterSpaces('storyblok is amazing')).toBe(
        'Storyblok Is Amazing',
      )
    })

    it('should return an empty string when is pass an empty string or nothing', () => {
      expect(capitalizeAllAfterSpaces('')).toBe('')

      expect(capitalizeAllAfterSpaces()).toBe('')
    })

    it('should keep the same input when the string is already capitalized', () => {
      expect(capitalizeAllAfterSpaces('Storyblok Is Amazing')).toBe(
        'Storyblok Is Amazing',
      )
    })
  })

  describe('test getRandomNumber function', () => {
    it('should be return a number between 0 and 9', () => {
      const regexForNumbers = /[0-9]/
      expect(regexForNumbers.test(getRandomNumber(0, 10))).toBe(true)
    })
  })
})
