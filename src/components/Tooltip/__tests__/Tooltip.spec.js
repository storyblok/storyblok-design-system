import { mount } from '@vue/test-utils'
import SbTooltip from '..'
import SbButton from '../../Button'

const factory = (template, additionalComponents = {}) => {
  const WrapperComponent = {
    components: { SbTooltip, ...additionalComponents },
    template
  }

  return mount(WrapperComponent)
}

describe('test SbTooltip component', () => {
  describe('when render a simple tooltip with a label to a SbButton component', () => {
    const label = 'This is a label to SbButton'
    const buttonText = 'Hover Me!'
    const template = `
      <SbTooltip label="${label}">
        <SbButton> ${buttonText} </SbButton>
      </SbTooltip>
    `

    const wrapper = factory(template, { SbButton })

    it('should render the SbButton component', () => {
      const ButtonComponent = wrapper.findComponent(SbButton)
      expect(ButtonComponent.exists()).toBe(true)
      expect(ButtonComponent.text()).toBe(buttonText)
    })

    it('should render the tooltip label with correct text', () => {
      expect(wrapper.find('.sb-tooltip__label').text()).toBe(label)
    })
  })

  describe('when render a tooltip with a specific position', () => {
    const label = 'This is a label with a specific position'
    const template = `
      <SbTooltip label="${label}" position="right">
        <p> Hover me! </p>
      </SbTooltip>
    `

    const wrapper = factory(template, { SbButton })

    it('should render with a correct class', () => {
      expect(wrapper.classes('sb-tooltip--right')).toBe(true)
    })
  })
})
