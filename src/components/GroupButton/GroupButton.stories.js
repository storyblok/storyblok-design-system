import SbGroupButton from '.'
import SbButton from '../Button/index'

import { availableVariants } from '../Button/lib'
import { availableSizes } from '../../utils'

export default {
  title: 'SbGroupButton',
  component: SbGroupButton,
  args: {
    variant: 'ghost',
    size: null,
    hasSpaces: false,
  },
  argTypes: {
    size: {
      name: 'size',
      description: 'Size to each `SbButton` inside the `SbGroupButton`',
      control: {
        type: 'select',
        options: [...availableSizes],
      },
    },
    variant: {
      name: 'variant',
      description: '`SbButton` variant',
      control: {
        type: 'select',
        options: [...availableVariants],
      },
    },
    hasSpaces: {
      name: 'hasSpaces',
      description: 'Set if it has spaces between `SbButton` components',
      control: {
        type: 'boolean',
      },
    },
  },
}

export const Default = (args) => ({
  components: { SbGroupButton, SbButton },
  props: Object.keys(args),
  template: `
    <SbGroupButton v-bind="{ size, variant, hasSpaces }">
      <SbButton label="First Button" />
      <SbButton label="Secondary Button" />
      <SbButton label="Third Button" />
    </SbGroupButton>
  `,
})

export const WithIcons = (args) => ({
  components: { SbGroupButton, SbButton },
  props: Object.keys(args),
  template: `
    <SbGroupButton v-bind="{ size, variant, hasSpaces }">
      <SbButton :label="firstLabel" />
      <SbButton :label="secondaryLabel" />
      <SbButton has-icon-only icon="close" />
    </SbGroupButton>
  `,
})

WithIcons.args = {
  firstLabel: 'First Button',
  secondaryLabel: 'Secondary Button',
}

WithIcons.argTypes = {
  firstLabel: {
    control: {
      type: 'text',
    },
  },
  secondaryLabel: {
    control: {
      type: 'text',
    },
  },
}

export const JustIcons = (args) => ({
  components: { SbGroupButton, SbButton },
  props: Object.keys(args),
  template: `
    <SbGroupButton v-bind="{ size, variant, hasSpaces }">
      <SbButton has-icon-only icon="calendar" iconDescription="Calendar Icon" />
      <SbButton has-icon-only icon="plus" iconDescription="Plus Icon" />
      <SbButton has-icon-only icon="overflow-menu-vertic" iconDescription="Overflow Icon" />
    </SbGroupButton>
  `,
})
