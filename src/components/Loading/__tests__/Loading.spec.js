import SbLoading from '../index'
import { mount } from '@vue/test-utils'
import { loadingSizes } from '../utils'

const factory = propsData => {
  return mount(SbLoading, {
    propsData
  })
}

describe('Testing utils for loading component', () => {
  it('testing loading-sizes function', async () => {
    expect(loadingSizes.indexOf('small') !== -1).toBe(true)
    expect(loadingSizes.indexOf('normal') !== -1).toBe(true)
    expect(loadingSizes.indexOf('large') !== -1).toBe(true)
    expect(loadingSizes.indexOf('x-large') !== -1).toBe(true)
    expect(loadingSizes.indexOf('short') !== -1).toBe(false)
  })
})

describe('Testing loading component', () => {
  it('test if progress bar render correctly with label', async () => {
    const wrapper = factory({
      type: 'bar',
      value: 50,
      showPercentage: true
    })

    expect(wrapper.find('progress').attributes('class')).toBe('sb-loading--bar')
    expect(wrapper.find('label').text()).toBe('50%')
  })

  it('test if spinner loading render correctly with label', async () => {
    const wrapper = factory({
      type: 'spinner',
      size: 'normal',
      value: 35,
      showPercentage: true
    })

    expect(wrapper.find('div').attributes('class')).toBe('sb-loading sb-loading--spinner-normal sb-loading--spinner')
    expect(wrapper.find('svg').attributes('class')).toBe('sb-icon sb-icon--normal')
    expect(wrapper.find('label').text()).toBe('35%')
  })

  it('test if block ui render correctly', async () => {
    const wrapper = factory({
      type: 'spinner',
      size: 'normal',
      value: 35,
      uiBlock: true
    })

    expect(wrapper.find('div').attributes('class')).toBe('sb-block-ui')
  })
})
