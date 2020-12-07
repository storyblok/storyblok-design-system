import { mount } from '@vue/test-utils'

import SbButton from '..'
import SbIcon from '../../Icon'

const factory = (propsData) => {
  return mount(SbButton, {
    propsData,
  })
}

describe('Test SbButton Component', () => {
  it('test default SbButton', async () => {
    const wrapper = factory({
      label: 'Primary',
    })

    expect(wrapper.find('button').attributes('class')).toBe(
      'sb-button sb-button--primary'
    )
    expect(wrapper.find('button').text()).toBe('Primary')
  })

  it('test default SbButton in small size', async () => {
    const wrapper = factory({
      label: 'Small button',
      size: 'small',
    })

    expect(wrapper.find('button').attributes('class')).toBe(
      'sb-button sb-button--primary sb-button--small'
    )
    expect(wrapper.find('button').text()).toBe('Small button')
  })

  it('test default SbButton in large size', async () => {
    const wrapper = factory({
      label: 'Large Button',
      size: 'large',
    })

    expect(wrapper.find('button').attributes('class')).toBe(
      'sb-button sb-button--primary sb-button--large'
    )
    expect(wrapper.find('button').text()).toBe('Large Button')
  })

  it('test SbButton in secondary color', async () => {
    const wrapper = factory({
      label: 'Secondary Button',
      variant: 'secondary',
    })

    expect(wrapper.find('button').attributes('class')).toBe(
      'sb-button sb-button--secondary'
    )
    expect(wrapper.find('button').text()).toBe('Secondary Button')
  })

  it('test SbButton disabled', async () => {
    const wrapper = factory({
      label: 'Disabled Button',
      isDisabled: true,
    })

    expect(wrapper.find('button').attributes('class')).toBe(
      'sb-button sb-button--primary sb-button--disabled'
    )
    expect(wrapper.find('button').text()).toBe('Disabled Button')
  })

  describe('with icon before label', () => {
    const wrapper = factory({
      label: 'Label with before icon',
      icon: 'calendar',
    })
    const iconComponent = wrapper.findComponent(SbIcon)

    it('should have the properly class', () => {
      expect(wrapper.classes('sb-button--has-icon')).toBe(true)
    })

    it('should have an icon component with correct name property', () => {
      expect(iconComponent.exists()).toBe(true)

      expect(iconComponent.props('name')).toBe('calendar')
    })
  })

  describe('with icon after label', () => {
    const wrapper = factory({
      label: 'Label with before icon',
      iconRight: 'chevron-down',
    })
    const iconComponent = wrapper.findComponent(SbIcon)

    it('should have the properly class', () => {
      expect(wrapper.classes('sb-button--has-icon-right')).toBe(true)
    })

    it('should have an icon component with correct name property', () => {
      expect(iconComponent.props('name')).toBe('chevron-down')
    })
  })

  describe('with fullWidth property', () => {
    const wrapper = factory({
      label: 'Label with before icon',
      isFullWidth: true,
    })

    it('should have the properly class', () => {
      expect(wrapper.classes('sb-button--full')).toBe(true)
    })
  })

  describe('when use label as a default slot', () => {
    const label = 'From default slot'

    const wrapper = mount(SbButton, {
      slots: {
        default: [label],
      },
    })

    it('should render the correct label', () => {
      expect(wrapper.text()).toBe(label)
    })
  })

  describe('with iconDescription', () => {
    const iconDescription = 'Icon description'

    const wrapper = mount(SbButton, {
      propsData: {
        icon: 'close',
        hasIconOnly: true,
        iconDescription,
      },
      stubs: {
        SbFragment: true,
        MountingPortal: true,
      },
    })

    it('should have an Tooltip component with correct text', () => {
      expect(wrapper.find('.sb-tooltip').text()).toBe(iconDescription)
    })
  })

  describe('when the user add a type for the button', () => {
    const renderButton = (type) => {
      return mount(SbButton, {
        propsData: {
          variant: 'ghost',
          type: type,
        },
      })
    }

    it('should be a button with a type `button`', () => {
      const wrapper = renderButton('button')
      expect(wrapper.attributes('type')).toBe('button')
    })

    it('should be a button with a type `submit`', () => {
      const wrapper = renderButton('submit')
      expect(wrapper.attributes('type')).toBe('submit')
    })

    it('should be a button with a type `reset`', () => {
      const wrapper = renderButton('reset')
      expect(wrapper.attributes('type')).toBe('reset')
    })

    it('should not render the prop `type` when sending an invalid value', () => {
      const validator = SbButton.props.type.validator
      expect(validator('info')).toBe(false)
      expect(validator('warning')).toBe(false)
      expect(validator('test')).toBe(false)
    })
  })
})
