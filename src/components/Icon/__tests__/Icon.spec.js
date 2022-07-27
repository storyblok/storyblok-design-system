import { mount } from '@vue/test-utils'
import SbIcon from '..'

const factory = (propsData) => {
  return mount(SbIcon, {
    propsData,
  })
}

describe('SbIcon component', () => {
  it('should not append the size class when do not pass the correct size', () => {
    const wrapper = factory({
      name: 'calendar',
    })

    expect(wrapper.classes('sb-icon')).toBe(true)
  })

  describe('when pass size attribute', () => {
    it('should append --small class', () => {
      const wrapper = factory({
        name: 'calendar',
        size: 'small',
      })

      expect(wrapper.classes('sb-icon--small')).toBe(true)
    })

    it('should append --large class', () => {
      const wrapper = factory({
        name: 'calendar',
        size: 'large',
      })

      expect(wrapper.classes('sb-icon--large')).toBe(true)
    })

    it('should append --x-large class', () => {
      const wrapper = factory({
        name: 'calendar',
        size: 'x-large',
      })

      expect(wrapper.classes('sb-icon--x-large')).toBe(true)
    })
  })

  describe('when pass color attribute', () => {
    it('should append color-NAME class', () => {
      const wrapper = factory({
        name: 'calendar',
        color: 'primary',
      })

      expect(wrapper.classes('sb-icon--color-primary')).toBe(true)
    })
  })

  describe('when pass role attribute', () => {
    it('should append role attribute', () => {
      const wrapper = factory({
        name: 'calendar',
        role: 'test',
      })

      expect(wrapper.attributes('role')).toBe('test')
    })
  })
})
