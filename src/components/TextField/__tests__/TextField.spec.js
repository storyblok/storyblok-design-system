import SbTextField from '..'
import { mount } from '@vue/test-utils'

const factory = (props) => {
  return mount(SbTextField, {
    props,
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

    expect(inputElement.attributes('disabled')).toBeDefined()
    expect(inputElement.element.value).toBe('Boris Spassky')
  })

  it('should have an input with type password that is hidden', () => {
    const wrapper = factory({
      label: 'Show / Hide password',
      type: 'password',
    })
    const inputElement = wrapper.find('input')
    expect(inputElement.attributes('disabled')).toBeUndefined()
    expect(inputElement.attributes('type')).toBe('password')
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
      modelValue: 'Boris Spassky',
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
      modelValue: 'Boris Spassky',
      clearable: true,
    })
    const iconElement = wrapper.find('svg')

    await iconElement.trigger('click')
    expect(wrapper.vm.computedValue).toBeNull()
  })

  it('should perform v-model', async () => {
    const wrapper = factory({
      label: 'Clearable',
      modelValue: 'Boris Spassky',
      clearable: true,
    })

    const inputElement = wrapper.find('input')

    inputElement.element.value = 'New Value'

    await inputElement.trigger('input')

    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['New Value'])
    expect(wrapper.vm.internalValue).toBe('New Value')
  })

  it('should perform focus/blur events', async () => {
    const wrapper = factory({
      label: 'Clearable',
      modelValue: 'Boris Spassky',
      clearable: true,
    })

    const inputElement = wrapper.find('input')

    inputElement.trigger('focus')

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('focus')).toBeTruthy()

    inputElement.trigger('blur')

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  it('should perform the remaining characters logic', async () => {
    const wrapper = factory({
      label: 'Clearable',
      modelValue: 'Luke',
      maxlength: 15,
    })

    const inputElement = wrapper.find('input')

    await inputElement.setValue('Lukee')

    await wrapper.vm.$nextTick()

    let remaining = wrapper.find('.sb-textfield__counter')

    expect(remaining.exists()).toBeFalsy()

    await inputElement.setValue('Luke Skywalker')

    remaining = wrapper.find('.sb-textfield__counter')

    expect(remaining.text()).toBe('1/15 characters remaining')

    await inputElement.setValue('')

    expect(wrapper.find('.sb-textfield__counter').exists()).toBe(false)
  })

  it('should render the inline label if present', () => {
    const wrapper = factory({
      inlineLabel: 'Inline label',
    })

    expect(wrapper.find('.sb-textfield__inner-label').text()).toBe(
      'Inline label'
    )
  })

  it('should not render the inline label by default', () => {
    const wrapper = factory()

    expect(wrapper.find('.sb-textfield__inner-label').exists()).toBe(false)
  })
})

describe('SbTextField as textarea', () => {
  const factory = (props) => {
    return mount(SbTextField, {
      props: {
        ...props,
        type: 'textarea',
      },
    })
  }

  it('should perform v-model', async () => {
    const wrapper = factory({
      label: 'Clearable',
      modelValue: 'Boris Spassky',
    })

    const textareaElement = wrapper.find('textarea')

    textareaElement.element.value = 'New Value'

    await textareaElement.trigger('input')

    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['New Value'])
    expect(wrapper.vm.internalValue).toBe('New Value')
  })

  it('should have the correct rows, cols and wrap properties', async () => {
    const wrapper = factory({
      label: 'Clearable',
      modelValue: 'Boris Spassky',
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
      modelValue: 'Boris Spassky',
      clearable: true,
    })

    const textareaElement = wrapper.find('textarea')

    textareaElement.trigger('focus')

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('focus')).toBeTruthy()

    textareaElement.trigger('blur')

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
