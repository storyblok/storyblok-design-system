import SbTab from '../'
import { mount } from '@vue/test-utils'

const factory = propsData => {
  return mount(SbTab, {
    propsData
  })
}

describe('Test SBTab component', () => {
  it('test if Tab rendered correctly', () => {
    const wrapper = factory({
      label: 'Tab 1'
    })

    expect(wrapper.find('span').exists()).toBe(true)
    expect(wrapper.find('span').text()).toBe('Tab 1')
  })
})
