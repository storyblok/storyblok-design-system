import {
  captalize,
  captalizeAllAfterSpaces,
  getRandomNumber
} from '../../src/utils'

describe('Utils function', () => {
  describe('test captalize function', () => {
    it('should change to upper case the first letter in a string', () => {
      expect(captalize('storyblok is amazing')).toEqual('Storyblok is amazing')
    })

    it('should return an empty string when is pass an empty string or nothing', () => {
      expect(captalize('')).toEqual('')

      expect(captalize()).toEqual('')
    })

    it('should keep the capitalize behavior when the string is already capitalized', () => {
      expect('Storyblok is amazing').toEqual('Storyblok is amazing')
    })
  })

  describe('test captalizeAllAfterSpaces function', () => {
    it('should capitalize every word in a string', () => {
      expect(
        captalizeAllAfterSpaces('storyblok is amazing')
      ).toEqual('Storyblok Is Amazing')
    })

    it('should return an empty string when is pass an empty string or nothing', () => {
      expect(captalizeAllAfterSpaces('')).toEqual('')

      expect(captalizeAllAfterSpaces()).toEqual('')
    })

    it('should keep the same input when the string is already capitalized', () => {
      expect(
        captalizeAllAfterSpaces('Storyblok Is Amazing')
      ).toEqual('Storyblok Is Amazing')
    })
  })

  describe('test getRandomNumber function', () => {
    it('should be return a number between 0 and 9', () => {
      const regexForNumbers = /[0-9]/
      expect(regexForNumbers.test(getRandomNumber(0, 10))).toBe(true)
    })
  })
})
