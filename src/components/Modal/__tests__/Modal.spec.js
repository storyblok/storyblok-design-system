import { shallowMount } from '@vue/test-utils'

import { SbModal, SbModalHeader, SbModalContent, SbModalFooter } from '../index'

import SbButton from '../../Button'
import SbIcon from '../../Icon'

describe('Tests for SbModal', () => {
  const WrapperComponent = {
    components: {
      SbModal,
      SbModalHeader,
      SbModalContent,
      SbModalFooter,
      SbButton,
    },
    methods: {
      handleShowModal() {
        this.showModal = true
      },
    },
    data: () => ({
      showModal: true,
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
              colorPalette="primary"
            />
            <SbButton
              label="Cancel"
              colorPalette="primary"
            />
        </SbModalFooter>
      </SbModal>
    `,
  }

  const wrapper = shallowMount(WrapperComponent)

  it('Test if SBModal component renderer correctly', () => {
    expect(wrapper.findComponent(SbModal).name()).toBe('SbModal')

    expect(wrapper.findComponent(SbModalHeader).props().title).toBe(
      'Awesome Title'
    )

    expect(wrapper.findComponent(SbModalContent).text()).toBe(
      'The body copy that explains empty state'
    )

    expect(wrapper.findComponent(SbModalFooter).exists()).toBe(true)

    expect(wrapper.findAllComponents(SbButton).length).toBe(2)
  })

  it('Test if the SbModal component emitted the event hide', async () => {
    wrapper.vm.$emit('hide')

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted().hide).toBeTruthy()
  })

  it('Test if SbHeader renderer correctly', () => {
    expect(
      wrapper.findComponent(SbModalHeader).findComponent(SbIcon).exists()
    ).toBe(false)

    expect(wrapper.findComponent(SbModalHeader).props().title).toBe(
      'Awesome Title'
    )

    expect(wrapper.findComponent(SbModalHeader).props().align).toBe('center')
  })

  it('Test if SbContent renderer correctly', () => {
    expect(wrapper.findComponent(SbModalContent).text()).toBe(
      'The body copy that explains empty state'
    )

    expect(wrapper.findComponent(SbModalContent).find('p').exists()).toBe(true)
  })

  it('Test if SbFooter renderer correctly', () => {
    expect(wrapper.findComponent(SbModalFooter).exists()).toBe(true)

    expect(
      wrapper.findComponent(SbModalFooter).findComponent(SbButton).exists()
    ).toBe(true)
  })
})
