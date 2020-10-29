import { shallowMount } from '@vue/test-utils'

import {
  SbModal,
  SbModalHeader,
  SbModalContent,
  SbModalFooter
} from '../index'

import SbButton from '../../Button'

describe('Tests for SbModal', () => {
  const divElement = document.createElement('div')

  divElement.id = 'root'

  document.body.appendChild(divElement)

  const WrapperComponent = {
    components: {
      SbModal,
      SbModalHeader,
      SbModalContent,
      SbModalFooter,
      SbButton
    },
    methods: {
      handleShowModal () {
        this.showModal = true
      }
    },
    data: () => ({
      showModal: true
    }),
    template: `
      <SbModal is-open-modal v-on:hide="showModal = false">
        <SbModalHeader 
          title="Awesome Title"
        />

        <SbModalContent>
          <p>The body copy that explains empty state</p>
        </SbModalContent>
        
        <SbModalFooter>
            <SbButton
              label="Save"
              type="primary"
            />
            <SbButton
              label="Cancel"
              type="primary"
            />
        </SbModalFooter>
      </SbModal>
    `
  }

  const wrapper = shallowMount(WrapperComponent)

  it('Test if Modal component renderer correctly', async () => {
    expect(wrapper.findComponent(SbModal).name()).toBe('SbModal')

    expect(wrapper.findComponent(SbModalHeader).props().title).toBe('Awesome Title')

    expect(wrapper.findComponent(SbModalContent).text()).toBe('The body copy that explains empty state')

    expect(wrapper.findComponent(SbModalFooter).exists()).toBe(true)

    expect(wrapper.findAllComponents(SbButton).length).toBe(2)
  })

  it('Test if the SbModal component emitted the event hide', async () => {
    wrapper.vm.$emit('hide')

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted().hide).toBeTruthy()
  })
})
