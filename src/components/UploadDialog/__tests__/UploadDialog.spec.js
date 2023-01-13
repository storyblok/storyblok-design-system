import { mount } from '@vue/test-utils'

import SbUploadDialog from '..'

import SbIcon from '../../Icon'
import SbLoading from '../../Loading'
import SbBlockUi from '../../BlockUI'

const factory = (props) => {
  return mount(SbUploadDialog, {
    props,
  })
}

const fakeProps = {
  totalFiles: 2,
  currentFile: 1,
  currentFileName: 'test.png',
  percentageValue: 25,
  timeLeft: 50,
}

describe('Tests for UploadDialog', () => {
  it('Test if UploadDialog renderer correctly', () => {
    const wrapper = factory(fakeProps)

    expect(wrapper.findComponent(SbBlockUi).exists()).toBe(true)

    expect(wrapper.findComponent(SbLoading).exists()).toBe(true)

    expect(wrapper.findComponent(SbLoading).props('modelValue')).toBe(
      fakeProps.percentageValue
    )

    expect(wrapper.findComponent(SbIcon).exists()).toBe(true)

    expect(wrapper.findComponent(SbIcon).props('name')).toBe('refreshing')

    const spanLabelHelper = [
      `Uploading ${fakeProps.currentFile} of ${fakeProps.totalFiles} files - ${fakeProps.currentFileName}`,
      `${fakeProps.timeLeft} sec left`,
    ]

    wrapper.findAll('span').filter((span, index) => {
      expect(span.text()).toBe(spanLabelHelper[index])
    })
  })
})
