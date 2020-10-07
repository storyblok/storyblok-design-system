import { mount } from '@vue/test-utils'

import { SbPopover } from '..'
import SbButton from '../../Button'

describe('SbPopover component', () => {
  describe('when toggle the open and close states', () => {
    afterAll(() => {
      document.body.innerHTML = ''
    })

    const WrapperComponent = {
      components: {
        SbButton,
        SbPopover
      },
      data: () => ({
        active: false,
        placement: 'auto',
        reference: '#buttontest',
        parentElementTag: 'div'
      }),
      methods: {
        handleClick () {
          this.$refs.popover.toggle()
        }
      },
      template: `
        <div>
          <SbButton id="buttontest" label="Click me" @click="handleClick" />

          <SbPopover
            ref="popover"
            class="menu"
            :reference="reference"
            :placement="placement"
          >
            <ul role="navigation">
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </SbPopover>
        </div>
      `
    }

    const wrapper = mount(WrapperComponent)

    document.body.innerHTML = wrapper.html()

    it('should have a ul with role navigation', () => {
      expect(wrapper.find('[role=navigation]').exists()).toBe(true)
    })

    it('should change the open state in Popover component when clicks in the button', async () => {
      const Popover = wrapper.findComponent(SbPopover)

      expect(Popover.vm.isOpen).toBe(false)

      await wrapper.findComponent(SbButton).trigger('click')

      await wrapper.vm.$nextTick()

      expect(Popover.vm.isOpen).toBe(true)

      expect(Popover.vm.popoverInstance).not.toBeNull()

      await wrapper.findComponent(SbButton).trigger('click')

      expect(Popover.vm.isOpen).toBe(false)

      expect(Popover.vm.popoverInstance).not.toBeNull()
    })
  })
})
