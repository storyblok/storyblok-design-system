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
    value: true,
  },
  argTypes: {
    value: {
      name: 'value',
      description:
        'Controls the open menu state. The value property has to be used for `v-model` directive',
      control: {
        type: 'boolean',
      },
    },
  },
}

export const Default = (args) => ({
  props: Object.keys(args),
  components: {
    SbMenu,
    SbMenuButton,
    SbMenuList,
    SbMenuItem,
    SbMenuGroup,
    SbMenuSeparator,
  },
  template: `
    <div>
      <SbMenu :value="value">
        <SbMenuButton label="Combo button" />

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
  props: Object.keys(args),
  components: {
    SbMenu,
    SbMenuButton,
    SbMenuList,
    SbMenuItem,
    SbMenuGroup,
    SbMenuSeparator,
  },
  template: `
    <div>
      <SbMenu :value="value">
        <SbMenuButton label="Combo button" />

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
  props: Object.keys(args),
  components: {
    SbMenu,
    SbMenuButton,
    SbMenuList,
    SbMenuItem,
    SbMenuGroup,
    SbMenuSeparator,
  },
  template: `
    <div>
      <SbMenu :value="value">
        <SbMenuButton label="Combo button" />

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
  props: Object.keys(args),
  components: {
    SbMenu,
    SbMenuButton,
    SbMenuList,
    SbMenuItem,
    SbMenuGroup,
    SbMenuSeparator,
  },
  template: `
    <div>
      <SbMenu :value="value">
        <SbMenuButton has-icon-only is-rounded />

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
  props: Object.keys(args),
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
    <div style="display: flex; justify-content: center;">
      <SbMenu :value="value">
        <SbGroupButton variant="ghost">
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
