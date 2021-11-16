import SbToggle from '..'
import { mount } from '@vue/test-utils'

const factory = (propsData) => {
  return mount(SbToggle, {
    propsData,
  })
}

describe('SbToggle component', () => {
  it('should have a input with type Toggle and not checked', () => {
    const wrapper = factory({
      label: 'Default',
      nativeValue: false,
    })
    const inputElement = wrapper.find('input')

    expect(inputElement.attributes('type')).toBe('checkbox')
    expect(inputElement.attributes('checked')).toBeUndefined()
    expect(inputElement.attributes('value')).toBe('false')
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
      label: 'Default',
      nativeValue: false,
    })

    await wrapper.find('input').trigger('click')

    expect(wrapper.emitted('input')[0]).toEqual([true])
  })

  it('should have the primary class', async () => {
    const wrapper = factory({
      label: 'Default',
      nativeValue: false,
      value: false,
    })

    expect(wrapper.classes('sb-toggle--primary')).toBe(true)
  })

  it('should have two icons', async () => {
    const wrapper = factory({
      label: 'Default',
      nativeValue: false,
      icon: 'world',
    })

    expect(wrapper.findAll('.sb-toggle__icon').length).toBe(2)
  })

  it('should have no icons', async () => {
    const wrapper = factory({
      label: 'Default',
      nativeValue: false,
    })

    expect(wrapper.findAll('.sb-toggle__icon').length).toBe(0)
  })

  it('should have the variant class', async () => {
    const wrapper = factory({
      label: 'Default',
      nativeValue: false,
      variant: 'secondary',
    })

    expect(wrapper.find('.sb-toggle').attributes('class')).toBe(
      'sb-toggle sb-toggle--secondary'
    )
  })
})
