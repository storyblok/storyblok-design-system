import {
  SbCard,
  SbCardContent,
  SbCardFooter,
  SbCardHeader,
  SbCardOptions,
} from '../'

import SbLink from '../../Link'

import { mount } from '@vue/test-utils'
import SbLoading from '../../Loading'
import {
  SbMenu,
  SbMenuButton,
  SbMenuGroup,
  SbMenuItem,
  SbMenuSeparator,
} from '../../Menu'

const cardOptionsMock = [
  {
    icon: 'plus',
    label: 'Option 1',
  },
  {
    icon: 'calendar',
    label: 'Option 2',
    isDisabled: true,
  },
  {
    separator: true,
  },
  {
    icon: 'close',
    label: 'Delete',
    type: 'negative',
  },
  {
    group: {
      title: 'Group title',
      items: [
        {
          icon: 'close',
          label: 'Group Item 1',
        },
        {
          icon: 'close',
          label: 'Group Item 2',
          type: 'negative',
        },
      ],
    },
  },
]

describe('SbCardHeader component', () => {
  const factory = (propsData) => {
    return mount(SbCardHeader, {
      propsData: {
        ...propsData,
      },
    })
  }

  const title = 'A awesome title'
  describe('default behavior', () => {
    const wrapper = factory({
      title,
    })

    it('should render with correct class', () => {
      expect(wrapper.classes('sb-card__header')).toBe(true)
    })

    it('should render title', () => {
      expect(wrapper.find('.sb-card__title').text()).toBe(title)
    })
  })

  describe('when use as property', () => {
    const wrapper = factory({
      title,
      as: 'h2',
    })

    it('should render the correct tag', async () => {
      expect(wrapper.find('h2').text()).toBe(title)
    })
  })

  describe('when set the title by default slot', () => {
    const wrapper = mount(SbCardHeader, {
      slots: {
        default: `<span> ${title} </span>`,
      },
    })

    it('should render the correct text', async () => {
      expect(wrapper.find('span').text()).toBe(title)
    })
  })

  describe('when use the options property', () => {
    it('should render the SbCardOptions component', () => {
      const wrapper = mount(SbCardHeader, {
        propsData: {
          title: 'Awesome title',
          options: [...cardOptionsMock],
        },
      })

      const optionComponent = wrapper.findComponent(SbCardOptions)

      expect(optionComponent.exists()).toBe(true)

      expect(optionComponent.props('options')).toEqual(cardOptionsMock)
    })
  })
})

describe('SbCardOptions component', () => {
  const wrapper = mount(SbCardOptions, {
    propsData: {
      options: [...cardOptionsMock],
    },
  })

  it('should render the SbMenu component', () => {
    expect(wrapper.findComponent(SbMenu).exists()).toBe(true)
  })

  it('should render the SbMenuButton component', () => {
    const button = wrapper.findComponent(SbMenuButton)

    expect(button.exists()).toBe(true)
    expect(button.props('hasIconOnly')).toBe(true)
  })

  it('should render the SbMenuItem with the expected properties', () => {
    const firstItem = wrapper.findAllComponents(SbMenuItem).at(0)

    expect(firstItem.exists()).toBe(true)

    expect(firstItem.props('label')).toBe('Option 1')

    expect(firstItem.props('icon')).toBe('plus')
  })

  it('should render the SbMenuSeparator with separator true property', () => {
    expect(wrapper.findComponent(SbMenuSeparator).exists()).toBe(true)
  })

  it('should render the SbMenuGroup along with SbMenuItems', () => {
    const group = wrapper.findComponent(SbMenuGroup)
    const groupItems = group.findAllComponents(SbMenuItem)

    expect(group.exists()).toBe(true)

    expect(groupItems.length).toBe(2)

    expect(groupItems.at(0).props('label')).toBe('Group Item 1')

    expect(groupItems.at(1).props('label')).toBe('Group Item 2')
  })
})

describe('SbCardContent component', () => {
  const wrapper = mount({
    components: {
      SbCard,
      SbCardContent,
    },
    template: `
      <SbCard>
        <SbCardContent>
          <p> Awesome content </p>
        </SbCardContent>
      </SbCard>
    `,
  })

  it('should render the content correctly', () => {
    expect(wrapper.find('p').text()).toBe('Awesome content')
  })
})

describe('SbCardFooter component', () => {
  const wrapper = mount(SbCardFooter, {
    components: { SbLink },
    slots: {
      default: `
        <SbLink
          label="Awesome link name"
          href="https://storyblok.com"
        />
      `,
    },
  })

  it('should render the footer renderer correctly', () => {
    const LinkComponent = wrapper.findComponent(SbLink)

    expect(wrapper.classes('sb-card__footer')).toBe(true)

    expect(LinkComponent.props('label')).toBe('Awesome link name')

    expect(LinkComponent.props('href')).toBe('https://storyblok.com')
  })
})

describe('SbCard component', () => {
  const wrapper = mount({
    components: {
      SbLink,
      SbCard,
      SbCardContent,
      SbCardFooter,
      SbCardHeader,
    },
    data: () => ({
      isLoading: false,
    }),
    template: `
      <SbCard :is-loading="isLoading">
        <SbCardHeader title="Awesome title" as="h2" />

        <SbCardContent>
          <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis sapien libero. Integer egestas dui leo, vitae blandit nisl cursus vel. Cras turpis ligula, accumsan eget eros eleifend, gravida gravida magna. </p>
        </SbCardContent>

        <SbCardFooter>
          <SbLink
            label="Awesome link name"
            href="https://storyblok.com"
          />
        </SbCardFooter>
      </SbCard >
    `,
  })

  it('should render the all card correctly', () => {
    expect(wrapper.classes('sb-card')).toBe(true)

    // title tests
    expect(wrapper.findComponent(SbCardHeader).exists()).toBe(true)
    expect(wrapper.find('h2').text()).toBe('Awesome title')

    // content tests
    expect(wrapper.findComponent(SbCardContent).exists()).toBe(true)

    // footer tests
    expect(wrapper.findComponent(SbCardFooter).exists()).toBe(true)
    expect(wrapper.findComponent(SbLink).props('label')).toBe(
      'Awesome link name'
    )
    expect(wrapper.findComponent(SbLink).props('href')).toBe(
      'https://storyblok.com'
    )
  })

  it('should render the SbLoading component in isLoading state', async () => {
    await wrapper.setData({
      isLoading: true,
    })

    expect(wrapper.findComponent(SbLoading).exists()).toBe(true)
  })
})
