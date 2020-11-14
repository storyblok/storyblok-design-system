import { SbSlideover } from '../index'

import SbButton from '../../Button'
import { SbModalHeader, SbModalContent, SbModalFooter } from '../../Modal'

import { shallowMount } from '@vue/test-utils'

describe('SbSlideover component', () => {
  const WrapperComponent = {
    components: {
      SbSlideover,
      SbButton,
      SbModalHeader,
      SbModalContent,
      SbModalFooter,
    },
    template: `
      <SbSlideover is-open>
        <SbModalHeader title="Hi man" align="left" />

        <SbModalContent>
          <p>Storyblok helps your team to tell your story and manage 
          content for every use-case: corporate websites, e-commerce, 
          helpdesks, mobile apps, and screen displays.</p>
        </SbModalContent>

        <SbModalFooter>
          <SbButton label="Label" type="primary"/>
          <SbButton label="Label" type="ghost"/>
        </SbModalFooter>
      </SbSlideover>
    `,
  }

  const wrapper = shallowMount(WrapperComponent)

  it('should render slideover component', () => {
    expect(wrapper.findComponent(SbSlideover).exists()).toBe(true)
  })

  it('should render all components into sb-slideover', () => {
    expect(wrapper.findComponent(SbModalHeader).exists()).toBe(true)

    expect(wrapper.findComponent(SbModalContent).exists()).toBe(true)

    expect(wrapper.findComponent(SbModalFooter).exists()).toBe(true)

    expect(wrapper.findComponent(SbButton).exists()).toBe(true)

    expect(wrapper.findAllComponents(SbButton).length).toBe(2)
  })

  it('should call the method handle-close-slide', () => {
    wrapper.vm.handleCloseSlide = jest.fn()

    wrapper.vm.handleCloseSlide()

    expect(wrapper.vm.handleCloseSlide).toBeCalled()
  })
})
