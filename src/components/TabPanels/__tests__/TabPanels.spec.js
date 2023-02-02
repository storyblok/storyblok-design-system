import { mount } from '@vue/test-utils'
import { SbTabPanel, SbTabPanels } from '..'

describe('Test SbTabPanels component', () => {
  const WrapperPanels = {
    components: {
      SbTabPanel,
      SbTabPanels,
    },
    data: () => ({
      currentTab: 'first',
    }),
    global: {
      provide: {
        activeTab: 'first',
      },
    },
    template: `
      <SbTabPanels v-model="currentTab">
        <SbTabPanel name="first">
          <p> First Tab Panel </p>
        </SbTabPanel>
        <SbTabPanel  name="second">
          <p> Second Tab Panel </p>
        </SbTabPanel>
        <SbTabPanel name="third">
          <p> Third Tab Panel </p>
        </SbTabPanel>
      </SbTabPanels>
    `,
  }

  const wrapper = mount(WrapperPanels)

  it.skip('should show only the current tab panel', () => {
    expect(wrapper.find('[aria-hidden="false"]').text()).toBe('First Tab Panel')
  })

  it.skip('should change the view of the panel when changes value property', async () => {
    await wrapper.setData({
      currentTab: 'third',
    })

    expect(wrapper.find('[aria-hidden="false"]').text()).toBe('Third Tab Panel')
  })
})
