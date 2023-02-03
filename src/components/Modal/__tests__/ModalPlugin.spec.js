import { shallowMount } from '@vue/test-utils'
import {
  ModalPlugin,
  SbModal,
  SbModalHeader,
  SbModalContent,
  SbModalFooter,
} from '..'

describe('Tests for ModalPlugin', () => {
  const wrapper = shallowMount(ModalPlugin)

  it('Test if the show function is called', async () => {
    wrapper.vm.show = jest.fn()

    wrapper.vm.show()

    expect(wrapper.vm.show).toBeCalled()

    wrapper.vm.open = true

    expect(wrapper.vm.open).toBe(true)
  })

  it('Test if ModalPlugin renderer correctly', async () => {
    const propsReference = {
      modalTarget: null,
      disabledTargetDefault: null,
      title: 'Delete This Project',
      icon: null,
      align: null,
      content: '<p>A content</p>',
      footerContent: '<SbButton label="Click" />',
    }

    wrapper.vm.open = true

    await wrapper.setProps({
      title: 'Delete This Project',
      content: '<p>A content</p>',
      footerContent: '<SbButton label="Click" />',
    })

    expect(wrapper.props()).toEqual(propsReference)

    expect(wrapper.findComponent(SbModal).exists()).toBe(true)

    expect(wrapper.findComponent(SbModalHeader).exists()).toBe(true)

    expect(wrapper.findComponent(SbModalContent).exists()).toBe(true)

    expect(wrapper.findComponent(SbModalFooter).exists()).toBe(true)
  })

  it('Test if hide event is called', async () => {
    wrapper.vm.$emit('hide')

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted().hide).toBeTruthy()
  })
})
