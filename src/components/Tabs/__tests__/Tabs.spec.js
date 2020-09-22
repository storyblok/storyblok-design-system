import { mount } from '@vue/test-utils'
import {
  SbTabs,
  SbTab
} from '..'

const tabFactory = (propsData) => {
  return mount(SbTab, {
    propsData
  })
}

const tabsFactory = (template, propsData = {}) => {
  const Wrapper = {
    components: {
      SbTabs,
      SbTab
    },
    template
  }

  return mount(Wrapper, {
    propsData
  })
}

describe('Testing all components', () => {
  it('Testing whether Tab was rendered correctly', () => {
    const wrapper = tabFactory({
      label: 'First Tab'
    })

    expect(wrapper.classes('sb-tab')).toBe(true)
    expect(wrapper.text()).toBe('First Tab')
  })

  it('Testing whether tabs compoent currently render tab components', () => {
    const template = `
        <SbTabs>
          <SbTab label="First" />
          <SbTab label="Second" />
          <SbTab label="Third" />
        </SbTabs>
      `

    const wrapper = tabsFactory(template)

    expect(wrapper.findAllComponents(SbTab).length).toBe(3)
  })
})
