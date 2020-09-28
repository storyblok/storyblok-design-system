import SbBlockUi from '../index'
import SbLoading from '../../Loading/index'
import { mount } from '@vue/test-utils'

const factory = (template, propsData = {}) => {
  const Wrapper = {
    components: {
      SbBlockUi,
      SbLoading
    },
    template
  }

  return mount(Wrapper, {
    propsData
  })
}

describe('Test if BlockUi render correctly', () => {
  it('Test if BlockUi render with message', async () => {
    const template = `
        <SbBlockUi message="Storyblok message" />
      `
    const wrapper = factory(template)

    expect(wrapper.classes()[0]).toBe('sb-block-ui')
    expect(wrapper.text()).toBe('Storyblok message')
  })

  it('Test if BlockUi render a component', async () => {
    const template = `
        <SbLoading type="spinner" size="normal" value=35 uiBlock />
      `
    const wrapper = factory(template)

    expect(wrapper.findAllComponents(SbBlockUi).length).toBe(1)
  })
})
