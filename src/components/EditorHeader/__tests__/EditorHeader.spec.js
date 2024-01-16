import { SbEditorHeader, SbHeaderTitle, SbHeaderItem } from '../index'

import SbIcon from '../../Icon'
import SbButton from '../../Button'

import { SbMenu, SbMenuButton, SbMenuList, SbMenuItem } from '../../Menu'

import { mount } from '@vue/test-utils'

const factory = (props) => {
  return mount(SbEditorHeader, {
    props,
  })
}

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

const fakeProps = {
  languages: ['English', 'German'],
  users: [...usersList],
  actions: [...actionsList],
  spaceStatus: 'unpublished',
  hasSaveButton: true,
  showPublishedIcon: true,
  headerTitle: 'An awesome CMS',
  headerSubtitle: 'Its true',
}

describe('SbEditorHeader component', () => {
  it('should render all internal components', () => {
    const wrapper = factory(fakeProps)

    expect(wrapper.findComponent(SbHeaderTitle).exists()).toBe(true)

    expect(wrapper.findComponent(SbHeaderTitle).text()).toBe(
      'An awesome CMSIts true',
    )

    expect(wrapper.findComponent(SbHeaderItem).exists()).toBe(true)

    expect(wrapper.findAllComponents(SbHeaderItem).length).toBe(7)

    expect(wrapper.findComponent(SbIcon).exists()).toBe(true)

    expect(wrapper.findAllComponents(SbIcon).length).toBe(9)

    expect(wrapper.findComponent(SbButton).exists()).toBe(true)

    expect(wrapper.findComponent(SbMenu).exists()).toBe(true)

    expect(wrapper.findComponent(SbMenuButton).exists()).toBe(true)

    expect(wrapper.findComponent(SbMenuItem).exists()).toBe(true)

    expect(wrapper.findComponent(SbMenuList).exists()).toBe(true)

    expect(wrapper.findAllComponents(SbMenuList).length).toBe(2)

    expect(wrapper.findAllComponents(SbMenuItem).length).toBe(5)
  })

  it('should emit all internal events', async () => {
    const wrapper = factory(fakeProps)

    // save event
    wrapper.vm.$emit('save')

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('save')).toBeTruthy()

    // publish event
    wrapper.vm.$emit('publish')

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('publish')).toBeTruthy()

    // select-action event
    wrapper.vm.$emit('select-action', 'unpublished')

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('select-action')).toBeTruthy()

    expect(wrapper.emitted('select-action')).toEqual([['unpublished']])

    // change-language event
    wrapper.vm.$emit('change-language', { language: 'english' })

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('change-language')).toBeTruthy()

    expect(wrapper.emitted('change-language')).toEqual([
      [{ language: 'english' }],
    ])
  })
})
