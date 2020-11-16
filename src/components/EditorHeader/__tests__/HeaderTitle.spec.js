import { SbHeaderTitle } from '..'
import SbButton from '../../Button'

import { mount } from '@vue/test-utils'

const factory = (propsData) => {
  return mount(SbHeaderTitle, {
    propsData,
  })
}

describe('Test if Header title renderer correctly', () => {
  it('Test to check if the component renders the text', () => {
    const wrapper = factory({
      title: 'Awesome cms',
      format: 'mobile',
    })

    expect(wrapper.find('div').classes('sb-editor--title')).toBe(true)

    expect(wrapper.find('div').text()).toBe('Awesome cms')

    expect(wrapper.findComponent(SbButton).exists()).toBe(true)
  })
})
