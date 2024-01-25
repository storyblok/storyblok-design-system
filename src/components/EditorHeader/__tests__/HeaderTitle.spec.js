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

  it('Test to check if the default slot renders correctly', () => {
    const defaultSlotText = 'Just a text'
    const wrapper = mount(SbHeaderTitle, {
      props: {
        headerTitle: 'Awesome cms',
        headerSubtitle: 'Its true',
      },
      slots: {
        default: `<span data-testid="default-slot-text"> ${defaultSlotText} </span>`,
      },
    })

    expect(wrapper.find('[data-testid="default-slot-text"]').text()).toBe(
      defaultSlotText,
    )
  })
})
