import { mount } from '@vue/test-utils'
import SbGroupButton from '..'
import SbButton from '../../Button'

const factory = (template, props = {}) => {
  const Wrapper = {
    components: {
      SbButton,
      SbGroupButton,
    },
    template,
  }

  return mount(Wrapper, {
    props,
  })
}

describe('Tests SbGroupButton component', () => {
  describe('when it pass n SbButton components inside', () => {
    it('should have n SbButton components', () => {
      const template = `
        <SbGroupButton>
          <SbButton label="One" />
          <SbButton label="Two" />
          <SbButton label="Three" />
        </SbGroupButton>
      `
      const wrapper = factory(template)

      expect(wrapper.findAllComponents(SbButton).length).toBe(3)
    })
  })

  describe('when use the properties from button component', () => {
    it('should have the correct size property in each child component', () => {
      const template = `
        <SbGroupButton size="large">
          <SbButton label="One" />
          <SbButton label="Two" />
          <SbButton label="Three" />
        </SbGroupButton>
      `
      const wrapper = factory(template)

      wrapper.findAllComponents(SbButton).forEach((wrapper) => {
        expect(wrapper.props('size')).toBe('large')
      })
    })

    it('should have the correct variant property in each child component', () => {
      const template = `
        <SbGroupButton size="small" variant="tertiary">
          <SbButton label="One" />
          <SbButton label="Two" />
          <SbButton label="Three" />
        </SbGroupButton>
      `
      const wrapper = factory(template)

      wrapper.findAllComponents(SbButton).forEach((wrapper) => {
        expect(wrapper.props('size')).toBe('small')
        expect(wrapper.props('variant')).toBe('tertiary')
      })
    })
  })

  describe('when use hasSpaces property', () => {
    it('should have the properly class', () => {
      const template = `
        <SbGroupButton has-spaces>
          <SbButton label="One" />
          <SbButton label="Two" />
          <SbButton label="Three" />
        </SbGroupButton>
      `
      const wrapper = factory(template)

      expect(wrapper.classes('sb-group-button--has-spaces')).toBe(true)
    })
  })
})
