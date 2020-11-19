import SbTextField from '..'
import { mount } from '@vue/test-utils'

const factory = (propsData) => {
  return mount(SbTextField, {
    propsData,
  })
}

describe('SbTextField component', () => {
  it('should have a disabled attribute', () => {
    const wrapper = factory({
      label: 'Boris Spassky',
      disabled: true,
    })
    const inputElement = wrapper.find('input')
    inputElement.setValue('Boris Spassky')

    expect(inputElement.attributes('disabled')).toBe('disabled')
    expect(inputElement.element.value).toBe('Boris Spassky')
  })

  it('should have an input with type password that is hidden', () => {
    const wrapper = factory({
      label: 'Show / Hide password',
      type: 'password',
    })
    const inputElement = wrapper.find('input')

    expect(inputElement.attributes('type')).toBe('password')
  })

  it('should have an input with type number', () => {
    const wrapper = factory({
      label: 'Number input',
      type: 'number',
    })
    const inputElement = wrapper.find('input')

    expect(inputElement.attributes('type')).toBe('number')
  })

  it('should have an error input with error message', () => {
    const wrapper = factory({
      label: 'With error',
      errorMessage: 'Some error message',
      error: true,
      nativeValue: 'Boris Spassky',
    })
    const inputElement = wrapper.find('input')
    inputElement.setValue('Boris Spassky')

    expect(inputElement.attributes('class')).toContain(
      'sb-textfield__input--error'
    )
    expect(inputElement.element.value).toBe('Boris Spassky')
  })

  it('should have the ghost class', () => {
    const wrapper = factory({
      label: 'Text input',
      nativeValue: 'Boris Spassky',
      value: 'Boris Spassky',
      ghost: true,
    })
    const inputElement = wrapper.find('input')

    expect(inputElement.attributes('class')).toContain(
      'sb-textfield__input--ghost'
    )
  })

  it('should clear the textfield by clicking on the icon', async () => {
    const wrapper = factory({
      label: 'Clearable',
      nativeValue: 'Boris Spassky',
      value: 'Boris Spassky',
      clearable: true,
    })
    const iconElement = wrapper.find('svg')

    await iconElement.trigger('click')
    expect(wrapper.vm.computedValue).toBe(null)
  })
})

describe('handleShowHidePassword()', () => {
  it('should show the password', () => {
    const wrapper = factory({
      label: 'Show / Hide password',
      type: 'password',
    })

    wrapper.vm.handleShowHidePassword()
    expect(wrapper.vm.internalType).toBe('text')
  })

  it('should hide the password', () => {
    const wrapper = factory({
      label: 'Show / Hide password',
      type: 'text',
    })

    wrapper.vm.handleShowHidePassword()
    expect(wrapper.vm.internalType).toBe('password')
  })
})
