import { SbDropArea, SbDropAreaUpload } from '../index'
import { mount } from '@vue/test-utils'

const factory = propsData => {
  return mount(SbDropArea, {
    propsData
  })
}

const uploadFactory = propsData => {
  return mount(SbDropAreaUpload, {
    propsData
  })
}

describe('Test if drop-area renderer correctly', () => {
  it('test default state of drop-area', () => {
    const wrapper = factory({})

    expect(wrapper.find('div').classes('sb-drop-area')).toBe(true)
    expect(wrapper.findAll('div').length).toBe(3)

    expect(wrapper.findAll('p').length).toBe(2)
  })

  it('test drop-area upload modal', () => {
    const upload = uploadFactory({
      totalFiles: 5,
      actualFile: 1,
      fileName: 'test.png',
      percentageValue: 45
    })

    expect(upload.find('div').classes('sb-block-ui')).toBe(true)

    expect(upload.find('span').text()).toBe('Uploading 1/5 - test.png')
  })
})
