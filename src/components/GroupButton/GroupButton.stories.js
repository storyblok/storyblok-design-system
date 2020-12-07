import SbGroupButton from '.'
import SbButton from '../Button/index'

import { availableColorsPalette } from '../Button/lib'
import { availableSizes } from '../../utils'

export default {
  title: 'SbGroupButton',
  component: SbGroupButton,
  args: {
    colorPalette: 'ghost',
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
    colorPalette: {
      name: 'colorPalette',
      description: '`SbButton` colorPalette',
      control: {
        type: 'select',
        options: [...availableColorsPalette],
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
    <SbGroupButton v-bind="{ size, colorPalette, hasSpaces }">
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
    <SbGroupButton v-bind="{ size, colorPalette, hasSpaces }">
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
    <SbGroupButton v-bind="{ size, colorPalette, hasSpaces }">
      <SbButton has-icon-only icon="calendar" iconDescription="Calendar Icon" />
      <SbButton has-icon-only icon="plus" iconDescription="Plus Icon" />
      <SbButton has-icon-only icon="overflow-menu-vertic" iconDescription="Overflow Icon" />
    </SbGroupButton>
  `,
})
