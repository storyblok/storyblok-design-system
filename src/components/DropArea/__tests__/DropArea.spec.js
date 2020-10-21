import { SbDropArea } from '../index'
import { mount } from '@vue/test-utils'

const factory = propsData => {
  return mount(SbDropArea, {
    propsData
  })
}

describe('Test if drop-area renderer correctly', () => {
  it('test default state of drop-area', async () => {
    const wrapper = factory({})

    expect(wrapper.find('div').classes('sb-drop-area')).toBe(true)
    expect(wrapper.findAll('div').length).toBe(3)

    expect(wrapper.findAll('p').length).toBe(2)
  })
})
