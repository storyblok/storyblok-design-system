import SbButtonGroup from '.'
import SbButton from '../Button/index'
import SbLink from '../Link'

import { availableTypes } from '../Button/lib'
import { availableSizes } from '../../utils'

export default {
  title: 'SbButtonGroup',
  component: SbButtonGroup,
  args: {
    type: 'ghost',
    size: null,
    hasSpaces: false
  },
  argTypes: {
    size: {
      name: 'size',
      description: 'Size to each `SbButton` inside the `SbButtonGroup`',
      control: {
        type: 'select',
        options: [...availableSizes]
      }
    },
    type: {
      name: 'type',
      description: '`SbButton` type',
      control: {
        type: 'select',
        options: [...availableTypes]
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

export const Default = args => ({
  components: { SbButtonGroup, SbButton },
  props: Object.keys(args),
  template: `
    <SbButtonGroup v-bind="{ size, type, hasSpaces }">
      <SbButton label="First Button" />
      <SbButton label="Secondary Button" />
      <SbButton label="Third Button" />
    </SbButtonGroup>
  `
})

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

WithIcons.args = {
  firstLabel: 'First Button',
  secondaryLabel: 'Secondary Button'
}

WithIcons.argTypes = {
  firstLabel: {
    control: {
      type: 'text'
    }
  },
  secondaryLabel: {
    control: {
      type: 'text'
    }
  }
}

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

export const WithLink = args => ({
  components: { SbButtonGroup, SbButton, SbLink },
  props: Object.keys(args),
  template: `
    <SbButtonGroup v-bind="{ size, type, hasSpaces }">
      <SbButton :label="firstLabel" :type="type" />
      <SbButton :label="secondaryLabel" :type="type" />
      <SbLink label="Read More" href="https://google.com" />
    </SbButtonGroup>
  `
})

WithLink.args = {
  firstLabel: 'First Button',
  secondaryLabel: 'Secondary Button'
}

WithLink.argTypes = {
  firstLabel: {
    control: {
      type: 'text'
    }
  },
  secondaryLabel: {
    control: {
      type: 'text'
    }
  }
}
