import { mount } from '@vue/test-utils'
import { waitMs } from '../../../utils/tests-utils'
import SbAvatar from '..'
import SbBadge from '../../Badge'
import SbToolip from '../../Tooltip'

const LOAD_FAILURE_SRC = 'LOAD_FAILURE_SRC'
const LOAD_SUCCESS_SRC = 'LOAD_SUCCESS_SRC'

const factory = (propsData) => {
  return mount(SbAvatar, {
    propsData,
  })
}

beforeAll(() => {
  process.browser = true // Mock process.browser for SbAvatar created()

  // Mock Img
  // eslint-disable-next-line accessor-pairs
  Object.defineProperty(global.Image.prototype, 'src', {
    set(src) {
      if (src === LOAD_FAILURE_SRC) {
        setTimeout(() => this.onerror(new Error('mocked error')))
      } else if (src === LOAD_SUCCESS_SRC) {
        setTimeout(() => this.onload())
      }
    },
  })
})

describe('SbAvatar component', () => {
  describe('when use a correct image', () => {
    it('should have an img tag with correct src attribute', async () => {
      const wrapper = factory({
        src: LOAD_SUCCESS_SRC,
      })

      await waitMs()

      expect(wrapper.find('img').attributes('src')).toBe(LOAD_SUCCESS_SRC)
    })
  })

  describe('when pass the size attribute, in the container tag', () => {
    it('should have a sb-avatar--small when it uses the small size', async () => {
      const wrapper = factory({
        src: LOAD_SUCCESS_SRC,
        size: 'small',
      })

      await waitMs()

      expect(wrapper.find('.sb-avatar').attributes('class')).toBe(
        'sb-avatar sb-avatar--small'
      )
    })

    it('should not have any class added when it does not pass any size', async () => {
      const wrapper = factory({
        src: LOAD_SUCCESS_SRC,
      })

      await waitMs()

      expect(wrapper.find('.sb-avatar').attributes('class')).toBe('sb-avatar')
    })

    it('should have a sb-avatar--large when it uses the large size', async () => {
      const wrapper = factory({
        src: LOAD_SUCCESS_SRC,
        size: 'large',
      })

      await waitMs()

      expect(wrapper.find('.sb-avatar').attributes('class')).toBe(
        'sb-avatar sb-avatar--large'
      )
    })
  })

  describe('when does not pass an src attribute but pass the name attribute', () => {
    const wrapper = factory({
      name: 'John Doe',
    })

    it('should not have a image tag', async () => {
      await waitMs()

      expect(wrapper.find('img').exists()).toBe(false)
    })

    it('should have text with the initials when it has first and last name', async () => {
      await waitMs()

      expect(wrapper.find('div').text()).toBe('JD')
    })

    it('should have text with the initials when it has only first name', async () => {
      const wrapper = factory({
        name: 'John',
      })

      await waitMs()

      expect(wrapper.find('div').text()).toBe('Jo')
    })
  })

  describe('when use the show-image attribute', () => {
    it('should have a div with the complete name text', async () => {
      const username = 'John Doe'
      const wrapper = factory({
        src: LOAD_SUCCESS_SRC,
        name: username,
        showName: true,
      })

      await waitMs()

      expect(wrapper.find('div').text()).toBe(username)
      expect(wrapper.find('img').attributes('src')).toBe(LOAD_SUCCESS_SRC)
    })
  })

  describe('when does not use the src attribute', () => {
    it('should render the child element', () => {
      const imageAlt = 'Image of John Doe'
      const WrapperComponent = {
        components: { SbAvatar },
        template: `
          <SbAvatar size="large">
            <img src="${LOAD_SUCCESS_SRC}" alt="${imageAlt}" />
          </SbAvatar>
        `,
      }

      const wrapper = mount(WrapperComponent)

      expect(wrapper.find('img').attributes('src')).toBe(LOAD_SUCCESS_SRC)
      expect(wrapper.find('img').attributes('alt')).toBe(imageAlt)
    })
  })

  describe('when pass the description property', () => {
    const wrapper = factory({
      name: 'John Doe',
      description: 'Created by',
      showName: true,
    })

    it('should have the correct name', () => {
      expect(wrapper.find('.sb-avatar__text').text()).toBe('John Doe')
    })

    it('should have the correct description', () => {
      expect(wrapper.find('.sb-avatar__description').text()).toBe('Created by')
    })
  })

  describe('when pass the status property', () => {
    const wrapper = factory({
      src: LOAD_SUCCESS_SRC,
      status: 'positive',
    })

    const BadgeComponent = wrapper.findComponent(SbBadge)

    it('should exists the SbBadge component', () => {
      expect(BadgeComponent.exists()).toBe(true)
    })

    it('should have the correct type and contract properties', () => {
      expect(BadgeComponent.props('type')).toBe('positive')

      expect(BadgeComponent.props('contract')).toBe(true)
    })
  })

  describe('when pass the useTooltip property', () => {
    const name = 'John Doe'
    const wrapper = factory({
      src: LOAD_SUCCESS_SRC,
      useTooltip: true,
      name,
    })

    const ToolipComponent = wrapper.findComponent(SbToolip)

    it('should exists the SbToolip component', () => {
      expect(ToolipComponent.exists()).toBe(true)
    })

    it('should have the bottom position as property', () => {
      expect(ToolipComponent.props('position')).toBe('bottom')
    })

    it('should have the correct label as property', () => {
      expect(ToolipComponent.props('label')).toBe(name)
    })
  })

  describe('when pass the bgColor property', () => {
    const wrapper = factory({
      name: 'John Doe',
      bgColor: 'secondary',
    })

    it('should have the specific bg class', () => {
      expect(wrapper.find('.sb-avatar__initials.bg-secondary').exists()).toBe(
        true
      )
    })
  })
})
