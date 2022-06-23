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
    hasIconRight: true,
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
    focusWhenClose: {
      name: 'focusWhenClose',
      description: `When SbMenuList has more items than the screen's height, it could lead to an undesired scroll behavior. Set this property to false to prevent this.`,
      control: {
        type: 'boolean',
      },
      default: true,
    },
    hasIconRight: {
      name: 'hasIconRight',
      description: `When the down arrow icon which is located to the right of SbMenuButton is not needed for SbMenuButton, set this parameter to false.`,
      control: {
        type: 'boolean',
      },
      default: true,
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
        <SbMenuButton label="Combo button" :has-icon-right="hasIconRight"/>

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
        <SbMenuButton label="Combo button" :has-icon-right="hasIconRight"/>

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
        <SbMenuButton label="Combo button" :has-icon-right="hasIconRight"/>

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
        <SbMenuButton has-icon-only is-rounded/>

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

export const WithLinksOnMenuItem = (args) => ({
  props: Object.keys(args),
  components: {
    SbMenu,
    SbMenuButton,
    SbMenuList,
    SbMenuItem,
    SbMenuGroup,
    SbButton,
  },
  template: `
    <div>
      <SbMenu :value="value">
        <SbMenuButton label="Combo button" :has-icon-right="hasIconRight"/>

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

export const WithoutItemRight = (args) => ({
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
    <SbMenuButton label="Combo button" ref="contentButton" :has-icon-right="hasIconRight" />

    <SbMenuList placement="bottom-start" :reference="$refs.contentButton">
      <SbMenuItem> Option 1 </SbMenuItem>
      <SbMenuItem> Option 2 </SbMenuItem>
    </SbMenuList>
  </SbMenu>
</div>
  `,
})

WithoutItemRight.args = {
  hasIconRight: false,
}
