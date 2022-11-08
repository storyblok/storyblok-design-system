import { mount } from '@vue/test-utils'
import { SbTab } from '..'

describe('Test SbTab component', () => {
  describe('when use the editable property in SbTab', () => {
    const wrapper = mount(SbTab, {
      props: {
        label: 'Tab Editable',
        name: 'editable-tab',
        editable: true,
      },
      global: {
        provide: {
          activeTab: () => 'editable-tab',
        },
      },
    })

    // select the button to edit the tag
    const buttonComponent = wrapper.find('.sb-tab-edit-button')

    it('should perform the edit a tab function', async () => {
      await buttonComponent.trigger('click')

      // when we click the edit button
      // we should have an input with the label value
      const inputElement = wrapper.find('input')
      expect(inputElement.element.value).toBe('Tab Editable')

      // defining a new value for this input
      await inputElement.setValue('New value from test')

      // and, when it triggers an enter
      await inputElement.trigger('keydown', {
        key: 'Enter',
      })

      // the SbTab should emit an edit-tab event with the new data from input
      expect(wrapper.emitted('edit-tab')).toEqual([
        [
          {
            label: 'New value from test',
            name: 'editable-tab',
          },
        ],
      ])
    })

    it('should perform the cancel edit tab function', async () => {
      await buttonComponent.trigger('click')

      // when we click the edit button
      // we should have an input with the label value
      const inputElement = wrapper.find('input')
      expect(inputElement.element.value).toBe('Tab Editable')

      // defining a new value for this input
      await inputElement.setValue('New value from test')

      // and, when it triggers an escape
      await inputElement.trigger('keydown', {
        key: 'Escape',
      })

      // the SbTab should emit a cancel-edit-tab event
      expect(wrapper.emitted('cancel-edit-tab')).toBeTruthy()
    })
  })
})
