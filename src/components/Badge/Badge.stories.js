import SbBadge from './index'

export default {
  title: 'SbBadge',
  component: SbBadge,
  parameters: {
    docs: {
      description: {
        component: 'Badges are composed of text inside a bg color element and may include inline/inline-block elements and/or icons.'
      }
    }
  },
  args: {
    text: 'Label',
    status: 'success',
    icon: '',
    onlyIcon: false,
    isSmall: false
  },
  argTypes: {
    icon: {
      name: 'icon',
      description: 'Name of the icon to `SbBadge`',
      control: {
        type: 'text'
      }
    },
    isSmall: {
      name: 'isSmall',
      description: 'Only icon',
      control: {
        type: 'boolean'
      }
    },
    onlyIcon: {
      name: 'onlyIcon',
      description: 'Only icon',
      control: {
        type: 'boolean'
      }
    },
    status: {
      name: 'status',
      description: 'Type of the `SbBadge` component',
      control: {
        type: 'select',
        options: ['small', 'normal', 'large']
      }
    },
    text: {
      name: 'text',
      description: 'Badge text',
      control: {
        type: 'text'
      }
    }
  }
}

export const Default = args => ({
  components: { SbBadge },
  props: Object.keys(args),
  template: `
    <SbBadge
      :text="text"
      :status="status"
      :icon="icon"
      :only-icon="onlyIcon"
      :is-small="isSmall"
    />
  `
})

export const Status = args => ({
  components: { SbBadge },
  props: Object.keys(args),
  template: `<div>
    <SbBadge status="success"/>
    <SbBadge status="info"/>
    <SbBadge status="warning"/>
    <SbBadge status="error"/>
  </div>`
})

export const StatusWithIcon = args => ({
  components: { SbBadge },
  props: Object.keys(args),
  template: `<div>
    <SbBadge status="success" icon />
    <SbBadge status="info" icon />
    <SbBadge status="warning" icon />
    <SbBadge status="error" icon />
  </div>`
})

export const OnlyIcon = args => ({
  components: { SbBadge },
  props: Object.keys(args),
  template: `<div>
    <SbBadge status="success" onlyIcon />
    <SbBadge status="info" onlyIcon />
    <SbBadge status="warning" onlyIcon />
    <SbBadge status="error" onlyIcon />
  </div>`
})

export const SmallWithText = args => ({
  components: { SbBadge },
  props: Object.keys(args),
  template: `<div>
    <SbBadge status="success" is-small text="5" />
    <SbBadge status="info" is-small text="10" />
    <SbBadge status="warning" is-small text="15" />
    <SbBadge status="error" is-small text="200" />
  </div>`
})
