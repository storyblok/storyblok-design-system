import SbRadio from '..'
import { mount } from '@vue/test-utils'

const factory = (propsData) => {
  return mount(SbRadio, {
    propsData,
  })
}

describe('Test SbRadio Component', () => {
  it('test default SbRadio', async () => {
    const wrapper = factory({
      label: 'Default Inactive',
    })

    expect(wrapper.find('input').attributes('type')).toBe('radio')
    expect(wrapper.find('input').attributes('class')).toBe(
      'sb-radio-type--default'
    )
  })

  it('test if default SbRadio is disabled', async () => {
    const wrapper = factory({
      label: 'Default Inactive - Disabled',
    })

    expect(wrapper.find('input').attributes('type')).toBe('radio')
    expect(wrapper.find('input').attributes('class')).toBe(
      'sb-radio-type--default'
    )
    expect(wrapper.find('input').attributes('disabled')).toBe(true)
  })

  it('test if default SbRadio is selected', async () => {
    const wrapper = factory({
      label: 'Default Selected',
    })

    expect(wrapper.find('input').attributes('type')).toBe('radio')
    expect(wrapper.find('input').attributes('class')).toBe(
      'sb-radio-type--default'
    )
    expect(wrapper.find('input').attributes('checked')).toBe(true)
  })

  it('test if default SbRadio is selected and disabled', async () => {
    const wrapper = factory({
      label: 'Default Selected - Disabled',
    })

    expect(wrapper.find('input').attributes('type')).toBe('radio')
    expect(wrapper.find('input').attributes('class')).toBe(
      'sb-radio-type--default'
    )
    expect(wrapper.find('input').attributes('checked')).toBe(true)
    expect(wrapper.find('input').attributes('disabled')).toBe(true)
  })

  it('test if SbRadio is inline type', async () => {
    const wrapper = factory({
      label: 'Inline Inactive',
    })

    expect(wrapper.find('input').attributes('type')).toBe('radio')
    expect(wrapper.find('input').attributes('class')).toBe(
      'sb-radio-type--inline'
    )
  })

  it('test if SbRadio is inline type and is selected', async () => {
    const wrapper = factory({
      label: 'Inline Selected',
    })

    expect(wrapper.find('input').attributes('type')).toBe('radio')
    expect(wrapper.find('input').attributes('class')).toBe(
      'sb-radio-type--inline'
    )
    expect(wrapper.find('input').attributes('checked')).toBe(true)
  })

  it('test if SbRadio is inline type and is disabled', async () => {
    const wrapper = factory({
      label: 'Inline Inactive - Disabled',
    })

    expect(wrapper.find('input').attributes('type')).toBe('radio')
    expect(wrapper.find('input').attributes('class')).toBe(
      'sb-radio-type--inline'
    )
    expect(wrapper.find('input').attributes('disabled')).toBe(true)
  })

  it('test if SbRadio is inline type and has outline', async () => {
    const wrapper = factory({
      label: 'Inline Outline Inactive',
    })

    expect(wrapper.find('input').attributes('type')).toBe('radio')
    expect(wrapper.find('input').attributes('class')).toBe(
      'sb-radio-type--inline sb-radio-type--outline'
    )
  })

  it('test if SbRadio is inline type and has outline and is selected', async () => {
    const wrapper = factory({
      label: 'Inline Outline Inactive',
    })

    expect(wrapper.find('input').attributes('type')).toBe('radio')
    expect(wrapper.find('input').attributes('class')).toBe(
      'sb-radio-type--inline sb-radio-type--outline'
    )
    expect(wrapper.find('input').attributes('checked')).toBe(true)
  })
})
