import { mount } from '@vue/test-utils'
import SbTooltip from '..'
import SbButton from '../../Button'
import SbIcon from '../../Icon'
import SbPopover from '../../Popover'

const factory = (
  template,
  additionalComponents = {},
  additionalInformation = {}
) => {
  const WrapperComponent = {
    components: { SbTooltip, ...additionalComponents },
    template,
    ...additionalInformation,
  }

  return mount(WrapperComponent, {
    global: {
      stubs: {
        Teleport: true,
        SbPopover: SbPopover,
      },
    },
  })
}

describe('test SbTooltip component', () => {
  describe('when using along with a SbButton component', () => {
    const label = 'This is a label to SbButton'
    const buttonText = 'Hover Me!'
    const template = `
      <SbTooltip label="${label}">
        <SbButton is-full-width icon="close" @click="onClick">
          ${buttonText}
        </SbButton>
      </SbTooltip>
    `

    const onClick = jest.fn()
    const onFocus = jest.fn()
    const additionalInfo = {
      methods: {
        onClick,
        onFocus,
      },
    }

    const wrapper = factory(template, { SbButton }, additionalInfo)
    const ButtonComponent = wrapper.findComponent(SbButton)
    const IconComponent = wrapper.findComponent(SbIcon)

    it('should render the tooltip label with correct text', async () => {
      expect(wrapper.find('.sb-tooltip').text()).toBe(label)
    })

    it('should render the SbButton component', () => {
      expect(ButtonComponent.exists()).toBe(true)
      expect(ButtonComponent.text()).toBe(buttonText)
    })

    it('should render the SbButton with isFullWidth', () => {
      expect(ButtonComponent.props('isFullWidth')).toBe(true)
    })

    it('should render with icon close', () => {
      expect(ButtonComponent.props('icon')).toBe('close')
    })

    it('should allow clicks', async () => {
      await ButtonComponent.trigger('click')
      expect(onClick).toHaveBeenCalled()
    })

    it('should have the same id and aria-describedby in the SbButton', () => {
      const id = ButtonComponent.attributes('aria-describedby')
      expect(wrapper.find(`#${id}`).exists()).toBe(true)
    })

    it('should exists the SbIcon component', () => {
      expect(IconComponent.exists()).toBe(true)
    })

    it('should render the SbIcon with close name', () => {
      expect(IconComponent.props('name')).toBe('close')
    })
  })

  describe('when using along with texted elements', () => {
    const label = 'This is a label to a texted element'
    const template = `
      <SbTooltip label="${label}">
        Hover me! I'm just a text
      </SbTooltip>
    `

    const wrapper = factory(template, { SbButton })

    it('should render the tooltip label with correct text', () => {
      expect(wrapper.find('.sb-tooltip').text()).toBe(label)
    })

    it('should have the same id and aria-describedby in the container', () => {
      const id = wrapper.find('span').attributes('aria-describedby')
      expect(wrapper.find(`#${id}`).exists()).toBe(true)
    })
  })

  describe('when using along with a button component', () => {
    const label = 'This is a label to SbButton'
    const buttonText = 'Hover Me!'
    const template = `
      <SbTooltip label="${label}">
        <button aria-label="Test label" type="submit" @click="onClick">
          ${buttonText}
        </button>
      </SbTooltip>
    `

    const onClick = jest.fn()
    const additionalInfo = {
      methods: {
        onClick,
      },
    }

    const wrapper = factory(template, {}, additionalInfo)
    const ButtonComponent = wrapper.find('button')

    it('should emits the click event when clicks on button', async () => {
      await ButtonComponent.trigger('click')

      expect(onClick).toBeCalled()
    })

    it('should the button has the correct attributes', () => {
      expect(ButtonComponent.attributes('aria-label')).toBe('Test label')
      expect(ButtonComponent.attributes('type')).toBe('submit')
    })
  })

  describe('when test the navigation', () => {
    const label = 'This is a label to SbButton'
    const buttonText = 'Hover Me!'
    const template = `
      <SbTooltip label="${label}">
        <button aria-label="Test label" type="submit" @click="onClick">
          ${buttonText}
        </button>
      </SbTooltip>
    `

    const onClick = jest.fn()
    const additionalInfo = {
      methods: {
        onClick,
      },
    }

    const wrapper = factory(template, {}, additionalInfo)
    const ButtonComponent = wrapper.find('button')
    const TooltipComponent = wrapper.find('[role="tooltip"]')

    it('should perform the show on focus hide on blur', async () => {
      expect(TooltipComponent.attributes('aria-hidden')).toBe('true')

      ButtonComponent.trigger('focus')

      await wrapper.vm.$nextTick()

      expect(TooltipComponent.attributes('aria-hidden')).toBe('false')

      ButtonComponent.trigger('blur')

      await wrapper.vm.$nextTick()

      expect(TooltipComponent.attributes('aria-hidden')).toBe('true')
    })

    it('should perform the show on focus hide on escape key is pressed', async () => {
      expect(TooltipComponent.attributes('aria-hidden')).toBe('true')

      ButtonComponent.trigger('focus')

      await wrapper.vm.$nextTick()

      expect(TooltipComponent.attributes('aria-hidden')).toBe('false')

      await ButtonComponent.trigger('keydown', {
        key: 'Escape',
      })

      await wrapper.vm.$nextTick()

      expect(TooltipComponent.attributes('aria-hidden')).toBe('true')
    })
  })
})
