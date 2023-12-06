import SbCheckbox from '..'
import { mount } from '@vue/test-utils'

const factory = (props) => {
  return mount(SbCheckbox, {
    props,
  })
}

describe('SbCheckbox component', () => {
  it('should have a input with type checkbox and not checked', () => {
    const wrapper = factory({
      label: 'Default',
      nativeValue: false,
    })
    const inputElement = wrapper.find('input')

    expect(inputElement.attributes('type')).toBe('checkbox')
    expect(inputElement.attributes('checked')).toBeUndefined()
    expect(inputElement.attributes('value')).toBe('false')
    expect(inputElement.attributes('disabled')).toBeUndefined()
    expect(wrapper.text()).toBe('Default')
  })

  it('should have a disabled attribute', () => {
    const wrapper = factory({
      label: 'Default - Disabled',
      disabled: true,
    })

    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    expect(wrapper.text()).toBe('Default - Disabled')
  })

  it('should change the internal value to true or false when clicks on input', async () => {
    const wrapper = factory({
      label: 'Default',
      modelValue: false,
      nativeValue: 'test',
    })

    const input = wrapper.get('input[type="checkbox"]')
    await input.setValue(true)

    expect(wrapper.vm.internalValue).toBe(true)

    await input.setValue(false)

    expect(wrapper.vm.internalValue).toBe(false)
  })

  it('should have the outline and inline classes', async () => {
    const wrapper = factory({
      label: 'Default',
      nativeValue: false,
      modelValue: false,
      inline: true,
      outline: true,
    })

    expect(wrapper.classes('sb-checkbox--inline')).toBe(true)
    expect(wrapper.classes('sb-checkbox--outline')).toBe(true)
  })
})
