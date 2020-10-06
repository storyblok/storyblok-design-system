import {
  SbCard,
  SbCardHeader,
  SbCardContent,
  SbCardFooter
} from '../'
import { mount } from '@vue/test-utils'

const factory = (template, propsData = {}) => {
  const Wrapper = {
    components: {
      SbCard,
      SbCardHeader,
      SbCardContent,
      SbCardFooter
    },
    template
  }

  return mount(Wrapper, {
    propsData
  })
}

describe('Test SbCardHeader component', () => {
  const title = 'A awesome title'

  const wrapper = mount(SbCardHeader, {
    slots: {
      default: [title]
    }
  })

  it('test if header renderer correctly', () => {
    expect(wrapper.classes('sb-card--title')).toBe(true)
    expect(wrapper.text()).toBe(title)
  })
})

describe('Test SbCardContent component', () => {
  const template = '<p> Awesome content </p>'

  const wrapper = mount(SbCardContent, {
    slots: {
      default: [template]
    }
  })

  const container = wrapper.findComponent(SbCardContent)

  it('test if SbCardContent renderer correctly', () => {
    expect(container.exists()).toBe(true)
    expect(wrapper.classes('sb-card--content')).toBe(true)
  })
})

describe('Test SbCardFooter component', () => {
  const factory = propsData => {
    return mount(SbCardFooter, {
      propsData
    })
  }

  it('test if footer renderer correctly', () => {
    const wrapper = factory({
      linkLabel: 'Awesome link name',
      url: 'https://storyblok.com'
    })

    expect(wrapper.classes('sb-link')).toBe(true)
    expect(wrapper.find('a').text()).toBe('Awesome link name')
    expect(wrapper.find('a').attributes('href')).toBe('https://storyblok.com')
    expect(wrapper.find('a').attributes('title')).toBe('Link to Awesome link name.')
  })
})

describe('Test Card component', () => {
  it('Test if card component renderer correctly without content', () => {
    const template = `
      <SbCard>
        <SbCardHeader>
          Awesome title
        </SbCardHeader>
        <SbCardContent>
          <img src="../image.png"/>
        </SbCardContent>
        <SbCardFooter url="http://storyblok.com" link-label="Storyblok"/>
      </SbCard > 
    `
    const wrapper = factory(template)

    expect(wrapper.find('div').classes('sb-card')).toBe(true)
    expect(wrapper.findComponent(SbCardHeader).exists()).toBe(true)
    expect(wrapper.findComponent(SbCardContent).exists()).toBe(true)
    expect(wrapper.findComponent(SbCardFooter).exists()).toBe(true)
  })
})
