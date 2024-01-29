import SbRadio from '..'
import { mount } from '@vue/test-utils'

const factory = (props) => {
  return mount(SbRadio, {
    props,
  })
}

describe('SbRadio component', () => {
  it('should have a input with type radio and not checked', () => {
    const wrapper = factory({
      label: 'Default',
      nativeValue: 'default',
    })
    const inputElement = wrapper.find('input')

    expect(inputElement.attributes('type')).toBe('radio')
    expect(inputElement.attributes('checked')).toBeUndefined()
    expect(inputElement.attributes('disabled')).toBeUndefined()
    expect(inputElement.attributes('value')).toBe('default')
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

  it('should keep the nativeValue property when having a input event', async () => {
    const wrapper = factory({
      label: 'Default - Disabled',
      modelValue: 'Jon Doe',
      nativeValue: 'Jon Doe',
    })

    const input = wrapper.get('input[type="radio"]')
    await input.setValue('Jon Doe')

    expect(wrapper.vm.internalValue).toBe('Jon Doe')
    await input.setValue('Jane Doe')

    expect(wrapper.vm.internalValue).toBe('Jon Doe')
  })

  it('should have the outline and inline classes', async () => {
    const wrapper = factory({
      label: 'Default - Disabled',
      nativeValue: 'Jon Doe',
      value: 'Jon Doe',
      inline: true,
      outline: true,
    })

    expect(wrapper.classes('sb-radio--inline')).toBe(true)
    expect(wrapper.classes('sb-radio--outline')).toBe(true)
  })
})
