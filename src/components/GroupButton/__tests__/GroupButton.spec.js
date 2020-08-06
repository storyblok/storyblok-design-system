import { mount } from '@vue/test-utils'
import SbButtonGroup from '..'
import SbButton from '../../Button'

const factory = (template, propsData = {}) => {
  const Wrapper = {
    props: {
      size: String
    },
    components: {
      SbButton,
      SbButtonGroup
    },
    template
  }

  return mount(Wrapper, {
    propsData
  })
}

describe('Tests for SbButtonGroup', () => {
  it('test for check if the component rendering correctly', async () => {
    const template = `
      <SbButtonGroup>
        <SbButton label="One" />
        <SbButton label="Two" />
        <SbButton label="Three" />
      </SbButtonGroup>
    `
    const wrapper = factory(template)

    expect(wrapper.findAllComponents(SbButton).length).toBe(3)
  })

  it('test for check if the component rendering correctly with large size', async () => {
    const template = `
      <SbButtonGroup size="large">
        <SbButton label="One" />
        <SbButton label="Two" />
        <SbButton label="Three" />
      </SbButtonGroup>
    `
    const wrapper = factory(template)

    wrapper.findAllComponents(SbButton).wrappers.forEach(wrapper => {
      expect(wrapper.props('type')).toBe('primary')
    })
  })
})
