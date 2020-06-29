import { shallowMount } from '@vue/test-utils'
import SBButton from '@/components/Button.vue'

describe('SBButton.vue', () => {
  it('renders props.label when passed', () => {
    const label = 'click me'

    const wrapper = shallowMount(SBButton, {
      propsData: { label }
    })

    expect(wrapper.text()).toMatch(label)
  })
})
