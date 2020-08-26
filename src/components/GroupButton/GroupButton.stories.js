import SbButtonGroup from './index'
import SbButton from '../Button/index'

const GroupButtonTemplate = args => ({
  components: { SbButtonGroup, SbButton },
  props: Object.keys(args),
  template: `
    <SbButtonGroup v-bind="{ size, type, hasSpaces }">
      <SbButton :label="firstLabel" />
      <SbButton :label="secondaryLabel" />
      <SbButton :label="thirdLabel" />
    </SbButtonGroup>
  `
})

export default {
  title: 'SbButtonGroup',
  component: SbButtonGroup,
  args: {
    type: 'ghost',
    size: null,
    hasSpaces: false,
    firstLabel: 'First Button',
    secondaryLabel: 'Secondary Button',
    thirdLabel: 'Third Button'
  },
  argTypes: {
    size: {
      name: 'size',
      description: 'Size to each `SbButton` inside the `SbButtonGroup`',
      control: {
        type: 'select',
        options: ['small', 'normal', 'large']
      }
    },
    type: {
      name: 'type',
      description: '`SbButton` type',
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'ghost']
      }
    },
    hasSpaces: {
      name: 'hasSpaces',
      description: 'Set if it has spaces between `SbButton` components',
      control: {
        type: 'boolean'
      }
    }
  }
}

export const Default = GroupButtonTemplate.bind()

export const WithIcons = args => ({
  components: { SbButtonGroup, SbButton },
  props: Object.keys(args),
  template: `
    <SbButtonGroup v-bind="{ size, type, hasSpaces }">
      <SbButton :label="firstLabel" />
      <SbButton :label="secondaryLabel" />
      <SbButton has-icon-only iconBefore="close" />
    </SbButtonGroup>
  `
})

export const JustIcons = args => ({
  components: { SbButtonGroup, SbButton },
  props: Object.keys(args),
  template: `
    <SbButtonGroup v-bind="{ size, type, hasSpaces }">
      <SbButton has-icon-only iconBefore="calendar" />
      <SbButton has-icon-only iconBefore="plus" />
      <SbButton has-icon-only iconBefore="overflow-menu-vertic" />
    </SbButtonGroup>
  `
})
