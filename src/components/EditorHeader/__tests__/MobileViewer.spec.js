import MobileViewer from '../components/MobileViewer'
import SbHeaderItem from '../components/HeaderItem'
import SbAvatar from '../../Avatar'
import { SbMenuItem } from '../../Menu'
import SbIcon from '../../Icon'

import { mount } from '@vue/test-utils'

const actionsList = [
  {
    name: 'dimensions',
  },
  {
    name: 'preview',
  },
  {
    name: 'unpublish',
  },
]

const usersList = [
  {
    src: 'https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4',
    name: 'John Doe',
  },
  {
    src: 'https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4',
    name: 'Kobe Bryant',
  },
]

const fakeProps = {
  languages: ['English', 'German'],
  users: [...usersList],
  actions: [...actionsList],
  format: 'mobile',
  size: 320,
}

const factory = (props) => {
  return mount(MobileViewer, {
    props,
  })
}

describe.skip('MobileViewer component test', () => {
  const wrapper = factory(fakeProps)

  it('should render with all components', () => {
    expect(wrapper.findComponent(SbHeaderItem).exists()).toBe(true)

    expect(wrapper.findAllComponents(SbMenuItem).length).toBe(7)

    expect(wrapper.findAllComponents(SbAvatar).length).toBe(2)

    expect(wrapper.findComponent(SbIcon).exists()).toBe(true)
  })

  it('should render all texts passed by props', () => {
    const arrayWithAssertionsTexts = [
      'dimensions',
      'preview',
      'unpublish',
      'English',
      'German',
      'John Doe',
      'Kobe Bryant',
    ]

    wrapper.findAllComponents(SbMenuItem).wrappers.forEach((wrapper, index) => {
      expect(wrapper.text()).toBe(arrayWithAssertionsTexts[index])
    })
  })
})
