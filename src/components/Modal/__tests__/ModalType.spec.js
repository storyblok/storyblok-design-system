import { shallowMount } from '@vue/test-utils'

import {
  SbModalHeader,
  SbModalFooter,
  SbModalType,
  SbModalContent,
} from '../index'

import SbButton from '../../Button'

describe('Tests for SbModalType', () => {
  const wrapper = shallowMount(SbModalType)

  it('Test if SbModalType renderer correctly', async () => {
    wrapper.vm.show()

    wrapper.setProps({
      title: 'Delete This Project',
      align: 'center',
      message: 'A delete message',
      type: 'delete',
      cancelButtonLabel: "No, don't delete it",
      actionButtonLabel: 'Ok, delete it!',
    })

    wrapper.vm.show = jest.fn()

    wrapper.vm.show()

    expect(wrapper.vm.show).toBeCalled()

    expect(wrapper.vm.open).toBe(true)

    expect(wrapper.findComponent(SbModalHeader).exists()).toBe(true)

    expect(wrapper.findComponent(SbModalContent).exists()).toBe(true)

    expect(wrapper.findComponent(SbModalFooter).exists()).toBe(false)

    expect(wrapper.findAllComponents(SbButton).length).toBe(2)
  })

  it('Test if SbModalType emitted all events', async () => {
    wrapper.vm.$emit('hide')

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted().hide).toBeTruthy()

    wrapper.vm.$emit('confirm')

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted().confirm).toBeTruthy()

    wrapper.vm.$emit('cancel')

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted().cancel).toBeTruthy()
  })
})
