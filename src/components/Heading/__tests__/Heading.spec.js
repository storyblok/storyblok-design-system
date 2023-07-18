import { mount } from '@vue/test-utils'

import SbHeading from '..'

const factory = (props) => {
  return mount(SbHeading, {
    props,
  })
}

describe('Test SbHeading Component', () => {
  it('should render the default h1 tag', () => {
    const wrapper = factory()

    expect(wrapper.find('h1')).toBeTruthy()
  })

  it.todo('should render different tag elements depends on the as prop')

  it.todo(
    'should render different font-weight classes depends on the font-weight prop'
  )

  it.todo(
    'should render different font-size style depends on the customFontSize prop'
  )

  it.todo('should render the expected text in the default slot')
})
