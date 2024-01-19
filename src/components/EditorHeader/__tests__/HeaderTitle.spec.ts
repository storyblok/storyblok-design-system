import { SbHeaderTitle } from '..'
import SbButton from '../../Button'

import { mount } from '@vue/test-utils'

const factory = (props) => {
  return mount(SbHeaderTitle, {
    props,
  })
}

describe('Test if Header title renderer correctly', () => {
  it('Test to check if the component renders the text', () => {
    const wrapper = factory({
      headerTitle: 'Awesome cms',
      headerSubtitle: 'Its true',
    })

    expect(wrapper.find('div').classes('sb-editor-header__title')).toBe(true)

    expect(wrapper.find('div').text()).toBe('Awesome cmsIts true')

    expect(wrapper.findComponent(SbButton).exists()).toBe(true)
  })
})
