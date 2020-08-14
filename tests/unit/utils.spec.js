import {
  captalize,
  captalizeAllAfterSpaces,
  availableSizes,
  availableBgColors,
  availableTextColors,
  getRandomNumber
} from '../../src/utils'

describe('Test utils function', () => {
  it('test captalize function', () => {
    const text = 'storyblok is amazing'

    expect(captalize(text)).toEqual('Storyblok is amazing')
  })

  it('test captalize function without string', () => {
    expect('').toEqual('')
  })

  it('test captalize function with text captalized', () => {
    expect('Storyblok is amazing').toEqual('Storyblok is amazing')
  })

  it('test captalizeAllAfterSpaces function', () => {
    const text = 'storyblok is amazing'

    expect(captalizeAllAfterSpaces(text)).toEqual('Storyblok Is Amazing')
  })

  it('test captalizeAllAfterSpaces function without string', () => {
    expect('').toEqual('')
  })

  it('test captalizeAllAfterSpaces function with string captalized', () => {
    const text = 'Storyblok Is Amazing'

    expect(captalizeAllAfterSpaces(text)).toEqual('Storyblok Is Amazing')
  })

  it('test availableSizes function', () => {
    expect(availableSizes).toEqual(['large', 'normal', 'small'])
  })

  it('test availableBgColors function', () => {
    const response = [
      'bg-primary',
      'bg-primary-dark',
      'bg-secondary',
      'bg-positive',
      'bg-negative',
      'bg-warning'
    ]
    expect(availableBgColors).toEqual(response)
  })

  it('test availableTextColors function', () => {
    const response = [
      'text-primary',
      'text-primary-dark',
      'text-secondary',
      'text-positive',
      'text-negative',
      'text-warning'
    ]
    expect(availableTextColors).toEqual(response)
  })

  it('test assertion of getRandomNumber function', () => {
    const regexForNumbers = /[0-9]/
    expect(regexForNumbers.test(getRandomNumber(0, 10))).toBe(true)
  })
})
