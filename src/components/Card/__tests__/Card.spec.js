import {
  SbCard,
  SbCardHeader,
  SbCardContent,
  SbCardFooter
} from '../'

import SbLink from '../../Link'

import { mount } from '@vue/test-utils'

describe('SbCardHeader component', () => {
  const factory = (propsData) => {
    return mount(SbCardHeader, {
      propsData: {
        ...propsData
      }
    })
  }

  const title = 'A awesome title'
  describe('default behavior', () => {
    const wrapper = factory({
      title
    })

    it('should render with correct class', () => {
      expect(wrapper.classes('sb-card__header')).toBe(true)
    })

    it('should render a span with text', () => {
      expect(
        wrapper.find('span').text()
      ).toBe(title)
    })
  })

  describe('when use as property', () => {
    const wrapper = factory({
      title,
      as: 'h2'
    })

    it('should render the correct tag', async () => {
      expect(
        wrapper.find('h2').text()
      ).toBe(title)
    })
  })

  describe('when set the title by default slot', () => {
    const wrapper = mount(SbCardHeader, {
      slots: {
        default: `<span> ${title} </span>`
      }
    })

    it('should render the correct text', async () => {
      expect(
        wrapper.find('span').text()
      ).toBe(title)
    })
  })
})

describe('SbCardContent component', () => {
  const wrapper = mount(SbCardContent, {
    slots: {
      default: '<p> Awesome content </p>'
    }
  })

  it('should render the content correctly', () => {
    expect(wrapper.classes('sb-card__content')).toBe(true)

    expect(
      wrapper.find('p').text()
    ).toBe('Awesome content')
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
      `
    }
  })

  it('should render the footer renderer correctly', () => {
    const LinkComponent = wrapper.findComponent(SbLink)

    expect(wrapper.classes('sb-card__footer')).toBe(true)

    expect(LinkComponent.props('label')).toBe('Awesome link name')

    expect(LinkComponent.props('href')).toBe('https://storyblok.com')
  })
})

describe('SbCard component', () => {
  it('should render the all card correctly', () => {
    const wrapper = mount({
      components: {
        SbLink,
        SbCard,
        SbCardContent,
        SbCardFooter,
        SbCardHeader
      },
      template: `
        <SbCard>
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
      `
    })

    expect(wrapper.classes('sb-card')).toBe(true)

    // title tests
    expect(wrapper.findComponent(SbCardHeader).exists()).toBe(true)
    expect(wrapper.find('h2').text()).toBe('Awesome title')

    // content tests
    expect(wrapper.findComponent(SbCardContent).exists()).toBe(true)

    // footer tests
    expect(wrapper.findComponent(SbCardFooter).exists()).toBe(true)
    expect(
      wrapper.findComponent(SbLink).props('label')
    ).toBe('Awesome link name')
    expect(
      wrapper.findComponent(SbLink).props('href')
    ).toBe('https://storyblok.com')
  })
})
