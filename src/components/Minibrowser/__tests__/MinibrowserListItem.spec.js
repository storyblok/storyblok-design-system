import { mount } from '@vue/test-utils'

import SbIcon from '../../Icon'

import SbMinibrowserListItem from '../components/MinibrowserListItem'

const factory = (mountProps) => {
  return mount(SbMinibrowserListItem, {
    ...mountProps,
    provide: {
      browserContext() {
        return {
          isList: false,
          selectItem: () => ({}),
        }
      },
    },
  })
}

describe('SbMinibrowserListItem component', () => {
  it('should render the correct text', () => {
    const wrapper = factory({
      props: {
        label: 'An awesome label',
      },
    })

    expect(wrapper.text()).toBe('An awesome label')
  })

  it('render content from default slot', () => {
    const wrapper = factory({
      props: {
        label: '',
      },
      slots: {
        default: [
          'An awesome label from slot',
          '<span data-testid="slot">In default slot</span>',
        ],
      },
    })

    expect(wrapper.text()).toMatch('An awesome label from slot')
    expect(wrapper.find('[data-testid="slot"]').text()).toBe('In default slot')
  })

  it('render content from icon slot', () => {
    const wrapper = factory({
      props: {
        label: 'An awesome label',
      },
      slots: {
        icon: '<span data-testid="icon">In place of icon</span>',
      },
    })

    expect(wrapper.text()).toMatch('An awesome label')
    expect(wrapper.find('[data-testid="icon"]').text()).toBe('In place of icon')
    expect(wrapper.findComponent(SbIcon).exists()).toBe(false)
  })

  it('should include the --active modifier when specify isActive state', () => {
    const wrapper = factory({
      props: {
        isActive: true,
        label: 'An awesome label',
      },
    })

    expect(wrapper.text()).toMatch('An awesome label')
    expect(
      wrapper
        .find('.sb-minibrowser__list-item')
        .classes('sb-minibrowser__list-item--active')
    ).toBe(true)
  })

  it('should render the subtitle text', () => {
    const wrapper = factory({
      props: {
        label: 'An awesome label',
        subtitle: 'An awesome subtitle',
      },
    })

    expect(wrapper.find('.sb-minibrowser__list-item-name').text()).toBe(
      'An awesome label'
    )
    expect(wrapper.find('.sb-minibrowser__list-item-subtitle').text()).toBe(
      'An awesome subtitle'
    )
  })
})
