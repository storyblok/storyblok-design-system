import { mount } from '@vue/test-utils'
import SbMinibrowserListHeader from '../components/MinibrowserListHeader'

describe('SbMinibrowserListHeader component', () => {
  it('should render the correct text', () => {
    const wrapper = mount(SbMinibrowserListHeader, {
      propsData: {
        title: 'An awesome title',
      },
    })

    expect(wrapper.text()).toBe('An awesome title')
  })

  it('should render the content passed as right slot', () => {
    const wrapper = mount(SbMinibrowserListHeader, {
      propsData: {
        title: 'An awesome title',
      },
      slots: {
        right: '<button data-testid="right-slot"> Test button </button>',
      },
    })

    expect(wrapper.find('[data-testid="right-slot"]').exists()).toBe(true)
  })
})
