import {
  SbMenu,
  SbMenuButton,
  SbMenuList,
  SbMenuItem,
  SbMenuGroup,
  SbMenuSeparator,
} from '.'

import SbButton from '../Button'
import SbGroupButton from '../GroupButton'
import LIB_ICONS from '../../lib/internal-icons'

const availableIcons = Object.keys(LIB_ICONS)

export default {
  title: 'Design System/Components/SbMenu',
  component: SbMenu,
  parameters: {
    docs: {
      description: {
        component:
          'Use the overflow menu component when additional options are available to the user but there is a space constraint.',
      },
    },
  },
  args: {
    modelValue: true,
    iconRight: 'chevron-down',
    icon: null,
  },
  argTypes: {
    modelValue: {
      name: 'modelValue',
      description:
        'Controls the open menu state. The value property has to be used for `v-model` directive',
      control: {
        type: 'boolean',
      },
    },
    focusWhenClose: {
      name: 'focusWhenClose',
      description: `When SbMenuList has more items than the screen's height, it could lead to an undesired scroll behavior. Set this property to false to prevent this.`,
      control: {
        type: 'boolean',
      },
      default: true,
    },
    iconRight: {
      name: 'IconRight',
      description: `When the arrow down icon located at the right side of SbMenuButton is not needed for SbMenuButton, set this parameter to false.`,
      control: {
        type: 'select',
        options: availableIcons,
      },
      default: true,
    },
    icon: {
      name: 'Icon',
      description: `When the arrow down icon located at the left side of SbMenuButton is not needed for SbMenuButton, set this parameter to false.`,
      control: {
        type: 'select',
        options: availableIcons,
      },
      default: true,
    },
  },
}

export const Default = (args) => ({
  setup() {
    return { ...args }
  },
  components: {
    SbMenu,
    SbMenuButton,
    SbMenuList,
    SbMenuItem,
    SbMenuGroup,
    SbMenuSeparator,
  },
  template: `
    <div style="min-height: 300px;">
      <SbMenu :modelValue="modelValue">
        <SbMenuButton label="Combo button" :icon-right="iconRight" :icon="icon"/>

        <SbMenuList placement="bottom-start">
          <SbMenuGroup title="Actions">
            <SbMenuItem> Option 1 </SbMenuItem>
            <SbMenuItem> Option 2 </SbMenuItem>
          </SbMenuGroup>

          <SbMenuGroup title="More">
            <SbMenuItem> Option 3 </SbMenuItem>

            <SbMenuItem type="negative"> Delete </SbMenuItem>
          </SbMenuGroup>
        </SbMenuList>
      </SbMenu>
    </div>
  `,
})

export const WithSeparators = (args) => ({
  setup() {
    return { ...args }
  },
  components: {
    SbMenu,
    SbMenuButton,
    SbMenuList,
    SbMenuItem,
    SbMenuGroup,
    SbMenuSeparator,
  },
  template: `
    <div style="min-height: 300px;">
      <SbMenu :modelValue="modelValue">
        <SbMenuButton label="Combo button" :icon-right="iconRight" :icon="icon"/>

        <SbMenuList placement="bottom-start">
          <SbMenuItem> Option 1 </SbMenuItem>
          <SbMenuItem> Option 2 </SbMenuItem>

          <SbMenuSeparator />

          <SbMenuItem> Option 1 </SbMenuItem>
          <SbMenuItem> Option 2 </SbMenuItem>

          <SbMenuSeparator />

          <SbMenuItem type="negative"> Delete </SbMenuItem>
        </SbMenuList>
      </SbMenu>
    </div>
  `,
})

export const WithIcons = (args) => ({
  setup() {
    return { ...args }
  },
  components: {
    SbMenu,
    SbMenuButton,
    SbMenuList,
    SbMenuItem,
    SbMenuGroup,
    SbMenuSeparator,
  },
  template: `
    <div style="min-height: 300px;">
      <SbMenu :modelValue="modelValue">
        <SbMenuButton label="Combo button" :icon-right="iconRight" :icon="icon"/>

        <SbMenuList placement="bottom-start">
          <SbMenuItem icon="calendar"> Option 1 </SbMenuItem>
          <SbMenuItem icon="plus"> Option 2 </SbMenuItem>

          <SbMenuSeparator />

          <SbMenuItem icon="search"> Option 1 </SbMenuItem>
          <SbMenuItem icon="folder"> Option 2 </SbMenuItem>
        </SbMenuList>
      </SbMenu>
    </div>
  `,
})

export const ButtonWithJustIcon = (args) => ({
  setup() {
    return { ...args }
  },
  components: {
    SbMenu,
    SbMenuButton,
    SbMenuList,
    SbMenuItem,
    SbMenuGroup,
    SbMenuSeparator,
  },
  template: `
    <div style="min-height: 300px;">
      <SbMenu :modelValue="modelValue">
        <SbMenuButton has-icon-only is-rounded :icon-right="iconRight" :icon="icon"/>

        <SbMenuList placement="bottom-start">
          <SbMenuItem icon="calendar"> Option 1 </SbMenuItem>
          <SbMenuItem icon="plus"> Option 2 </SbMenuItem>

          <SbMenuSeparator />

          <SbMenuItem icon="search"> Option 1 </SbMenuItem>
          <SbMenuItem icon="folder"> Option 2 </SbMenuItem>
        </SbMenuList>
      </SbMenu>
    </div>
  `,
})

export const AlongWithGroup = (args) => ({
  setup() {
    return { ...args }
  },
  components: {
    SbMenu,
    SbMenuButton,
    SbMenuList,
    SbMenuItem,
    SbMenuGroup,
    SbMenuSeparator,
    SbButton,
    SbGroupButton,
  },
  template: `
    <div style="display: flex; justify-content: center; min-height: 300px;">
      <SbMenu :modelValue="modelValue">
        <SbGroupButton variant="tertiary">
          <SbButton label="Define Schema" />
          <SbMenuButton has-icon-only />
        </SbGroupButton>

        <SbMenuList placement="bottom-end">
          <SbMenuItem> Option 1 </SbMenuItem>
          <SbMenuItem> Option 2 </SbMenuItem>

          <SbMenuSeparator />

          <SbMenuItem> Option 1 </SbMenuItem>
          <SbMenuItem> Option 2 </SbMenuItem>
        </SbMenuList>
      </SbMenu>
    </div>
  `,
})

export const WithLinksOnMenuItem = (args) => ({
  setup() {
    return { ...args }
  },
  components: {
    SbMenu,
    SbMenuButton,
    SbMenuList,
    SbMenuItem,
    SbMenuGroup,
    SbButton,
  },
  template: `
    <div style="min-height: 300px;">
      <SbMenu :modelValue="modelValue">
        <SbMenuButton label="Combo button" :icon-right="iconRight" :icon="icon"/>

        <SbMenuList placement="bottom-start">
          <SbMenuGroup title="Links">
            <SbMenuItem as="a" to="https://storyblok.com"> Link 1: Storyblok </SbMenuItem>

            <SbMenuItem as="a" to="https://google.com"> Link 2: Google </SbMenuItem>
          </SbMenuGroup>

          <SbMenuGroup title="Buttons">
            <SbMenuItem> Button 1 </SbMenuItem>

            <SbMenuItem> Button 2 </SbMenuItem>
          </SbMenuGroup>
        </SbMenuList>
      </SbMenu>
    </div>
  `,
})

export const WithoutIconRight = (args) => ({
  setup() {
    return { ...args }
  },
  components: {
    SbMenu,
    SbMenuButton,
    SbMenuList,
    SbMenuItem,
    SbMenuGroup,
    SbMenuSeparator,
  },
  template: `
  <div style="min-height: 300px;">
  <SbMenu :modelValue="modelValue">
    <SbMenuButton label="Combo button" ref="contentButton" :icon-right="iconRight" :icon="icon" />

    <SbMenuList placement="bottom-start" :reference="$refs.contentButton">
      <SbMenuItem> Option 1 </SbMenuItem>
      <SbMenuItem> Option 2 </SbMenuItem>
    </SbMenuList>
  </SbMenu>
</div>
  `,
})

WithoutIconRight.args = {
  iconRight: null,
}

export const WithIconLeft = (args) => ({
  setup() {
    return { ...args }
  },
  components: {
    SbMenu,
    SbMenuButton,
    SbMenuList,
    SbMenuItem,
    SbMenuGroup,
    SbMenuSeparator,
  },
  template: `
  <div style="min-height: 300px;">
  <SbMenu :modelValue="modelValue">
  <SbMenuButton
    ref="contentButton"
    :icon="icon"
    label="Combo"
    size="small"
    :icon-right="iconRight"
  />

    <SbMenuList placement="bottom-start" :reference="$refs.contentButton">
      <SbMenuItem> Option 1 </SbMenuItem>
      <SbMenuItem> Option 2 </SbMenuItem>
    </SbMenuList>
  </SbMenu>
</div>
  `,
})

WithIconLeft.args = {
  iconRight: null,
  icon: 'plus',
}
