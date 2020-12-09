import { SbDesktopAndTabletViewer, SbHeaderItem } from '..'
import SbAvatar from '../../Avatar'
import { SbMenu, SbMenuItem } from '../../Menu'
import SbIcon from '../../Icon'
import SbTooltip from '../../Tooltip'

import { mount } from '@vue/test-utils'

const factory = (propsData) => {
  return mount(SbDesktopAndTabletViewer, {
    propsData,
  })
}

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
    src:
      'https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4',
    name: 'John Doe',
  },
  {
    src:
      'https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4',
    name: 'Kobe Bryant',
  },
]

const fakeProps = {
  languages: ['English', 'German'],
  users: [...usersList],
  actions: [...actionsList],
  format: 'desktop',
  size: 1200,
  headerTitle: 'A awesome cms',
  headerSubTitle: 'Its true',
}

describe('SbDesktopAndTabletViewer component', () => {
  it('should render all internal components', () => {
    const wrapper = factory(fakeProps)

    expect(wrapper.findComponent(SbHeaderItem).exists()).toBe(true)

    expect(wrapper.findAllComponents(SbHeaderItem).length).toBe(5)

    expect(wrapper.findComponent(SbAvatar).exists()).toBe(true)

    expect(wrapper.findAllComponents(SbAvatar).length).toBe(2)

    expect(wrapper.findComponent(SbMenu).exists()).toBe(true)

    expect(wrapper.findAllComponents(SbMenuItem).length).toBe(2)

    expect(wrapper.findComponent(SbTooltip).exists()).toBe(true)

    expect(wrapper.findAllComponents(SbTooltip).length).toBe(5)

    expect(wrapper.findComponent(SbIcon).exists()).toBe(true)

    expect(wrapper.findAllComponents(SbIcon).length).toBe(6)
  })

  it('should trigger all functions', () => {
    const wrapper = factory(fakeProps)

    wrapper.vm.handleSetNewLanguage = jest.fn()

    wrapper.vm.handleSelectNewAction = jest.fn()

    wrapper.vm.handleSetNewLanguage()

    expect(wrapper.vm.handleSetNewLanguage).toBeCalled()

    wrapper.vm.handleSelectNewAction()

    expect(wrapper.vm.handleSelectNewAction).toBeCalled()
  })

  it('should emit all internal events', async () => {
    const wrapper = factory(fakeProps)

    wrapper.vm.$emit('changes', { type: 'act', action: 'unpublish' })

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('changes')).toBeTruthy()

    expect(wrapper.emitted('changes')).toEqual([
      [{ type: 'act', action: 'unpublish' }],
    ])
  })
})
