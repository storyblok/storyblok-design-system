import SbGroupButton from '.'
import SbButton from '../Button/index'
import SbLink from '../Link'

import { availableTypes } from '../Button/lib'
import { availableSizes } from '../../utils'

export default {
  title: 'SbGroupButton',
  component: SbGroupButton,
  args: {
    type: 'ghost',
    size: null,
    hasSpaces: false
  },
  argTypes: {
    size: {
      name: 'size',
      description: 'Size to each `SbButton` inside the `SbGroupButton`',
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
  components: { SbGroupButton, SbButton },
  props: Object.keys(args),
  template: `
    <SbGroupButton v-bind="{ size, type, hasSpaces }">
      <SbButton label="First Button" />
      <SbButton label="Secondary Button" />
      <SbButton label="Third Button" />
    </SbGroupButton>
  `
})

export const WithIcons = args => ({
  components: { SbGroupButton, SbButton },
  props: Object.keys(args),
  template: `
    <SbGroupButton v-bind="{ size, type, hasSpaces }">
      <SbButton :label="firstLabel" />
      <SbButton :label="secondaryLabel" />
      <SbButton has-icon-only icon="close" />
    </SbGroupButton>
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
  components: { SbGroupButton, SbButton },
  props: Object.keys(args),
  template: `
    <SbGroupButton v-bind="{ size, type, hasSpaces }">
      <SbButton has-icon-only icon="calendar" />
      <SbButton has-icon-only icon="plus" />
      <SbButton has-icon-only icon="overflow-menu-vertic" />
    </SbGroupButton>
  `
})

export const WithLink = args => ({
  components: { SbGroupButton, SbButton, SbLink },
  props: Object.keys(args),
  template: `
    <SbGroupButton v-bind="{ size, type, hasSpaces }">
      <SbButton :label="firstLabel" :type="type" />
      <SbButton :label="secondaryLabel" :type="type" />
      <SbLink label="Read More" href="https://google.com" />
    </SbGroupButton>
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
