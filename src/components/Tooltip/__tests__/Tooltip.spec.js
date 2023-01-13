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
    components: { SbTooltip, SbPopover, ...additionalComponents },
    template,
    ...additionalInformation,
  }

  return mount(WrapperComponent)
}

const findTooltip = () => document.querySelector('[role="tooltip"]')

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
    const PopoverComponent = wrapper.findComponent(SbPopover)

    it('should render the tooltip label with correct text', async () => {
      expect(PopoverComponent.vm.$slots.default()[0].children).toBe(label + ' ')
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
      const span = wrapper.find('span')
      const id = span.attributes('aria-describedby')
      const popover = wrapper.findComponent(SbPopover)
      expect(popover.props('useAnchorId')).toBe(id)
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

    it('should render the tooltip label with correct text', async () => {
      const popover = wrapper.findComponent(SbPopover)
      expect(popover.vm.$slots.default()[0].children).toBe(label + ' ')
    })

    it('should have the same id and aria-describedby in the container', () => {
      const span = wrapper.find('span')
      const id = span.attributes('aria-describedby')
      const popover = wrapper.findComponent(SbPopover)
      expect(popover.props('useAnchorId')).toBe(id)
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
    const ButtonComponent = wrapper.find('span')
    const PopoverComponent = wrapper.findComponent(SbPopover)

    it('should perform the show on focus hide on blur', async () => {
      expect(PopoverComponent.props().isOpen).toBe(false)

      ButtonComponent.trigger('focus')

      await wrapper.vm.$nextTick()

      expect(PopoverComponent.props().isOpen).toBe(true)

      ButtonComponent.trigger('blur')

      await wrapper.vm.$nextTick()

      expect(PopoverComponent.props().isOpen).toBe(false)
    })

    it('should perform the show on focus hide on escape key is pressed', async () => {
      expect(PopoverComponent.props().isOpen).toBe(false)

      ButtonComponent.trigger('focus')

      await wrapper.vm.$nextTick()

      expect(PopoverComponent.props().isOpen).toBe(true)

      await ButtonComponent.trigger('keydown', {
        key: 'Escape',
      })

      await wrapper.vm.$nextTick()

      expect(PopoverComponent.props().isOpen).toBe(false)
    })
  })
})
