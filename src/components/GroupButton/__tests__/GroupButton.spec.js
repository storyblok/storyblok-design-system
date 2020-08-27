import { mount } from '@vue/test-utils'
import SbButtonGroup from '..'
import SbButton from '../../Button'

const factory = (template, propsData = {}) => {
  const Wrapper = {
    components: {
      SbButton,
      SbButtonGroup
    },
    template
  }

  return mount(Wrapper, {
    propsData
  })
}

describe('Tests SbButtonGroup component', () => {
  describe('when it pass n SbButton components inside', () => {
    it('should have n SbButton components', () => {
      const template = `
        <SbButtonGroup>
          <SbButton label="One" />
          <SbButton label="Two" />
          <SbButton label="Three" />
        </SbButtonGroup>
      `
      const wrapper = factory(template)

      expect(wrapper.findAllComponents(SbButton).length).toBe(3)
    })
  })

  describe('when use the properties from button component', () => {
    it('should have the correct size property in each child component', () => {
      const template = `
        <SbButtonGroup size="large">
          <SbButton label="One" />
          <SbButton label="Two" />
          <SbButton label="Three" />
        </SbButtonGroup>
      `
      const wrapper = factory(template)

      wrapper.findAllComponents(SbButton).wrappers.forEach(wrapper => {
        expect(wrapper.props('size')).toBe('large')
      })
    })

    it('should have the correct type property in each child component', () => {
      const template = `
        <SbButtonGroup size="small" type="ghost">
          <SbButton label="One" />
          <SbButton label="Two" />
          <SbButton label="Three" />
        </SbButtonGroup>
      `
      const wrapper = factory(template)

      wrapper.findAllComponents(SbButton).wrappers.forEach(wrapper => {
        expect(wrapper.props('size')).toBe('small')
        expect(wrapper.props('type')).toBe('ghost')
      })
    })
  })

  describe('when use hasSpaces property', () => {
    it('should have the properly class', () => {
      const template = `
        <SbButtonGroup has-spaces>
          <SbButton label="One" />
          <SbButton label="Two" />
          <SbButton label="Three" />
        </SbButtonGroup>
      `
      const wrapper = factory(template)

      expect(
        wrapper.classes('sb-group-button--has-spaces')
      ).toBe(true)
    })
  })
})
