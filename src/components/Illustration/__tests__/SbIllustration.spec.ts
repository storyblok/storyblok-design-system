import SbIllustration from '..'
import { VueWrapper, mount } from '@vue/test-utils'

const factory = (props): VueWrapper => {
  return mount(SbIllustration, {
    props,
  })
}

describe('Test SbIllustration component', (): void => {
  it('should render a <a> tag with properly attributes', (): void => {
    const wrapper = factory({
      src: 'https://a.storyblok.com/f/136045/140x109/458988e575/first-entry-modal-image.svg',
      alt: 'Ready to go illustration',
    })
    const Image = wrapper.find('img')

    expect(Image.exists()).toBe(true)
    expect(Image.attributes('src')).toBe(
      'https://a.storyblok.com/f/136045/140x109/458988e575/first-entry-modal-image.svg',
    )
    expect(Image.attributes('alt')).toBe('Ready to go illustration')
  })
})
