import SbLinkButton from './index'

export default {
  title: 'SbLinkButton',
  component: SbLinkButton,
  args: {
    status: 'primary',
    size: null,
    href: 'https://storyblok.com',
    label: 'Go to Storyblok website',
    as: undefined,
    title: null,
    isDisabled: false
  },
  argTypes: {
    size: {
      name: 'size',
      description: 'Size',
      control: {
        type: 'select',
        options: ['small', 'normal', 'large']
      }
    },
    label: {
      name: 'label',
      description: 'Label',
      control: {
        type: 'text'
      }
    },
    as: {
      name: 'as',
      description: 'The tag that should be used (<a> is default)',
      control: {
        type: 'text'
      }
    },
    href: {
      name: 'href',
      description: 'href attribute for <a> tag',
      control: {
        type: 'text'
      }
    },
    title: {
      name: 'title',
      description: 'Title to `SbLinkButton`',
      control: {
        type: 'text'
      }
    },
    status: {
      name: 'status',
      description: '`SbLinkButton` status',
      control: {
        type: 'select',
        options: ['primary', 'secondary']
      }
    },
    isDisabled: {
      name: 'isDisabled',
      description: 'Disable `SbLinkButton`',
      control: {
        type: 'boolean'
      }
    },
    icon: {
      name: 'icon',
      description: 'Icon to `SbLinkButton`',
      control: {
        type: 'text'
      }
    }
  }
}

export const Default = args => ({
  components: { SbLinkButton },
  props: Object.keys(args),
  template: `
    <SbLinkButton
      v-bind="{
        as,
        label,
        href,
        title,
        isDisabled,
        status
      }"
    />
  `
})

// export const Secondary = args => ({
//   props: Object.keys(args),
//   components: { SbLinkButton },
//   template: `<div>
//     <SbLinkButton
//       v-bind="{
//         label,
//         status
//       }"
//     />
//   </div>`
// })

// Secondary.args = {
//   label: 'Secondary link button',
//   status: 'secondary'
// }

export const WithIcon = args => ({
  components: { SbLinkButton },
  props: Object.keys(args),
  template: `<div>
      <div>
        <SbLinkButton
          v-bind="{
            label: primaryLabel,
            href,
            title,
            icon
          }"
        />
      </div>

      <div style="margin-top: 20px">
        <SbLinkButton
          v-bind="{
            label: secondaryLabel,
            href,
            title,
            icon,
            status: 'secondary'
          }"
        />
      </div>
  </div>`
})

WithIcon.args = {
  primaryLabel: 'Primary label',
  secondaryLabel: 'Secondary label',
  icon: 'checkmark'
}

export const Disabled = args => ({
  components: { SbLinkButton },
  props: Object.keys(args),
  template: `<div>
      <div>
        <SbLinkButton
          v-bind="{
            label: primaryLabel,
            href,
            title,
            icon,
            isDisabled
          }"
        />
      </div>

      <div style="margin-top: 20px">
        <SbLinkButton
          v-bind="{
            label: secondaryLabel,
            href,
            title,
            icon,
            status: 'secondary',
            isDisabled
          }"
        />
      </div>
  </div>`
})

Disabled.args = {
  primaryLabel: 'Primary disabled label',
  secondaryLabel: 'Secondary disabled label',
  icon: 'checkmark',
  isDisabled: true
}
