import SbRadio from '..'
import { mount } from '@vue/test-utils'

const factory = (propsData) => {
  return mount(SbRadio, {
    propsData,
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
    expect(inputElement.attributes('value')).toBe('default')
    expect(wrapper.text()).toBe('Default')
  })

  it('should have a disabled attribute', () => {
    const wrapper = factory({
      label: 'Default - Disabled',
      disabled: true,
    })

    expect(wrapper.find('input').attributes('disabled')).toBe('disabled')
    expect(wrapper.text()).toBe('Default - Disabled')
  })

  it('should emit the nativeValue property when clicks on input', async () => {
    const wrapper = factory({
      label: 'Default - Disabled',
      nativeValue: 'Jon Doe',
    })

    await wrapper.find('input').trigger('click')

    expect(wrapper.emitted('input')[0]).toEqual(['Jon Doe'])
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
