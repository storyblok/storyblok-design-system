import Tooltip from '.'

export default {
  title: 'Directives/Vtooltip',
  args: {
    id: null,
    label: 'Default tooltip label',
    position: 'top',
    variant: 'dark',
    textAlign: 'center',
  },
}

export const Default = (args) => ({
  directives: {
    tooltip: Tooltip,
  },

  setup() {
    return { ...args }
  },

  template: `
    <div style="padding: 100px; text-align: center;">
      <span tabindex="0" v-tooltip="{ label, position, id, variant, textAlign }" style="font-size: 1.8rem;">Hover me!</span>
    </div>
  `,
})
