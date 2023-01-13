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

  it('should emit the nativeValue property when clicks on input', async () => {
    const wrapper = factory({
      label: 'Default',
      nativeValue: false,
    })

    await wrapper.find('input[type="checkbox"]').setValue(true)

    expect(wrapper.emitted('update:modelValue')[0]).toEqual([true])
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
