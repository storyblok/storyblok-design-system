import SbDropArea from '..'
import { mount } from '@vue/test-utils'

const factory = (propsData) => {
  return mount(SbDropArea, {
    propsData,
  })
}

const fakeProps = {
  title: 'Drop here',
  subtitle: 'Your files',
  accept: 'image/png',
  maxFile: 1,
  maxFileSize: 100,
}

const fakeEvent = {
  preventDefault: () => {},
  stopPropagation: () => {},
  dataTransfer: {
    files: [
      {
        lastModified: 1593647426743,
        name: 'test',
        size: 12763,
        type: 'image/png',
      },
    ],
  },
}

describe('Test if SbDropArea renderer correctly', () => {
  it('Test default state of drop-area', () => {
    const wrapper = factory(fakeProps)

    expect(wrapper.find('div').classes('sb-drop-area')).toBe(true)

    expect(wrapper.find('img').exists()).toBe(true)

    expect(wrapper.vm.$props.title).toBe(fakeProps.title)

    expect(wrapper.vm.$props.subtitle).toBe(fakeProps.subtitle)
  })

  it('Test handleDropFile function is called', () => {
    const wrapper = factory(fakeProps)

    wrapper.vm.handleDropFile = jest.fn()

    wrapper.vm.handleDropFile(fakeEvent)

    expect(wrapper.vm.handleDropFile).toBeCalled()
  })

  it('Test if the DropArea emit the event of upload-file', async () => {
    const wrapper = factory(fakeProps)

    wrapper.vm.handleDropFile(fakeEvent)

    wrapper.vm.$emit('upload-file', fakeEvent.dataTransfer.files[0])

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('upload-file')).toBeTruthy()

    expect(wrapper.emitted('upload-file')[0]).toEqual([
      fakeEvent.dataTransfer.files[0],
    ])
  })
})
