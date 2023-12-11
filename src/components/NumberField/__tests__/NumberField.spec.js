import SbNumberField from '..'
import { mount } from '@vue/test-utils'

const factory = (props) => {
  return mount(SbNumberField, {
    props,
  })
}

describe('SbNumberField component', () => {
  it('should be an input with type number', () => {
    const wrapper = factory({
      label: 'Number input',
    })
    const inputElement = wrapper.find('input')
    expect(inputElement.attributes('type')).toBe('number')
    expect(inputElement.attributes('disabled')).toBeUndefined()
  })

  describe('Events tests', () => {
    it('should perform focus/blur event', async () => {
      const wrapper = factory({
        label: 'Number input',
        modelValue: 7,
      })

      const inputElement = wrapper.find('input')

      inputElement.trigger('focus')
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted('focus')).toBeTruthy()

      inputElement.trigger('blur')
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted('blur')).toBeTruthy()
    })
  })

  describe('Prop tests', () => {
    it('should have a disabled attribute', () => {
      const wrapper = factory({
        label: 'Number input',
        disabled: true,
      })

      const inputElement = wrapper.find('input')
      expect(inputElement.attributes('disabled')).toBeDefined()
    })

    it('should have an input with an error message', () => {
      const wrapper = factory({
        label: 'Number  input',
        errorMessage: 'Some error message',
        error: true,
      })

      const inputElement = wrapper.find('input')
      expect(inputElement.attributes('class')).toContain(
        'sb-numberfield__input--error',
      )
    })

    it('should not change value if input is readonly', async () => {
      const wrapper = factory({
        label: 'Number field',
        readonly: true,
        modelValue: 7,
      })

      wrapper.vm.increaseValue()
      wrapper.vm.decreaseValue()

      expect(wrapper.vm.computedValue).toBe(7)
    })
  })

  describe('Validation tests', () => {
    it('should check if value is bigger than max value and disable increasement arrow', async () => {
      const wrapper = factory({
        label: 'Number field',
        modelValue: 7,
        max: 5,
      })

      const arrowElement = wrapper.find('.sb-numberfield__arrow--increase')

      expect(wrapper.vm.computedValue).toBe(5)
      expect(arrowElement.attributes('class')).toContain(
        'sb-numberfield__arrow--disabled',
      )
    })

    it('should check if value is smaller than min value and disable decreasement arrow', async () => {
      const wrapper = factory({
        label: 'Number field',
        modelValue: -7,
        min: -5,
      })

      const arrowElement = wrapper.find('.sb-numberfield__arrow--decrease')

      expect(wrapper.vm.computedValue).toBe(-5)
      expect(arrowElement.attributes('class')).toContain(
        'sb-numberfield__arrow--disabled',
      )
    })

    it('should accept a negative value', async () => {
      const wrapper = factory({
        label: 'Number field',
        modelValue: -7,
      })

      expect(wrapper.vm.computedValue).toBe(-7)
    })

    it('should not accept a invalid value', async () => {
      const wrapper = factory({
        label: 'Number field',
        modelValue: '+99-99',
      })

      expect(wrapper.vm.computedValue).toBeNaN()
    })
  })

  describe('Methods tests', () => {
    it('should increase number value', async () => {
      const wrapper = factory({
        label: 'Number input',
        modelValue: 7,
        step: 2,
      })

      wrapper.vm.increaseValue()
      expect(wrapper.vm.computedValue).toBe(9)
    })

    it('should decrease number value', async () => {
      const wrapper = factory({
        label: 'Number input',
        modelValue: 7,
        step: 2,
      })

      wrapper.vm.decreaseValue()
      expect(wrapper.vm.computedValue).toBe(5)
    })

    it('should get closest precise number', async () => {
      const wrapper = factory({
        label: 'Number input',
        precision: 1,
        modelValue: 6.99,
      })

      wrapper.vm.getClosestPreciseNumber(
        wrapper.vm.modelValue,
        wrapper.vm.precision,
      )
      expect(
        wrapper.vm.getClosestPreciseNumber(
          wrapper.vm.modelValue,
          wrapper.vm.precision,
        ),
      ).toBe(7)
    })
  })
})
