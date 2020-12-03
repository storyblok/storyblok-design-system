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

  it('should perform v-model', async () => {
    const wrapper = factory({
      label: 'Clearable',
      value: 'Boris Spassky',
      clearable: true,
    })

    const inputElement = wrapper.find('input')

    inputElement.element.value = 'New Value'

    await inputElement.trigger('input')

    expect(wrapper.emitted('input')[0]).toEqual(['New Value'])
    expect(wrapper.vm.internalValue).toBe('New Value')
  })

  it('should perform focus/blur events', async () => {
    const wrapper = factory({
      label: 'Clearable',
      value: 'Boris Spassky',
      clearable: true,
    })

    const inputElement = wrapper.find('input')

    inputElement.element.focus()

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('focus')).toBeTruthy()

    inputElement.element.blur()

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('blur')).toBeTruthy()
  })
})

describe('SbTextField as textarea', () => {
  const factory = (propsData) => {
    return mount(SbTextField, {
      propsData: {
        ...propsData,
        type: 'textarea',
      },
    })
  }

  it('should perform v-model', async () => {
    const wrapper = factory({
      label: 'Clearable',
      value: 'Boris Spassky',
    })

    const textareaElement = wrapper.find('textarea')

    textareaElement.element.value = 'New Value'

    await textareaElement.trigger('input')

    expect(wrapper.emitted('input')[0]).toEqual(['New Value'])
    expect(wrapper.vm.internalValue).toBe('New Value')
  })

  it('should have the correct rows, cols and wrap properties', async () => {
    const wrapper = factory({
      label: 'Clearable',
      value: 'Boris Spassky',
      rows: 4,
      cols: 30,
      wrap: 'hard',
      maxlength: 60,
      minlength: 10,
    })

    const textareaElement = wrapper.find('textarea')

    expect(textareaElement.attributes('rows')).toBe('4')
    expect(textareaElement.attributes('cols')).toBe('30')
    expect(textareaElement.attributes('wrap')).toBe('hard')
    expect(textareaElement.attributes('maxlength')).toBe('60')
    expect(textareaElement.attributes('minlength')).toBe('10')
  })

  it('should perform focus/blur events', async () => {
    const wrapper = factory({
      label: 'Clearable',
      value: 'Boris Spassky',
      clearable: true,
    })

    const textareaElement = wrapper.find('textarea')

    textareaElement.element.focus()

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('focus')).toBeTruthy()

    textareaElement.element.blur()

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('blur')).toBeTruthy()
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
