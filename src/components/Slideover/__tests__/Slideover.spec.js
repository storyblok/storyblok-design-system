import { SbSlideover } from '../index'

import { mount } from '@vue/test-utils'

describe('SbSlideover component', () => {
  const wrapper = mount(SbSlideover, {
    props: {
      isOpen: true,
    },
    slots: {
      default: 'Awesome title',
    },
  })

  it('should render slideover component', () => {
    expect(wrapper.findComponent(SbSlideover).exists()).toBe(true)
  })

  it('should render the default slot', async () => {
    await wrapper.setData({ openSlideover: true })
    expect(wrapper.html()).toContain('Awesome title')
  })

  it('should call the method handle-close-slide & emit the event', async () => {
    wrapper.vm.handleCloseSlide()
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('hide')[0]).toStrictEqual([])
  })
})
