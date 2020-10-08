import {
  SbMenu,
  SbMenuButton,
  SbMenuList,
  SbMenuItem,
  SbMenuGroup,
  SbMenuSeparator
} from '.'

import SbButton from '../Button'
import SbGroupButton from '../GroupButton'

export default {
  title: 'SbMenu',
  component: SbMenu,
  subcomponents: {
    SbMenuButton: {
      title: SbMenuButton,
      argTypes: {
        label: {
          name: 'label',
          description: 'Label (inner test)',
          control: {
            type: 'text'
          }
        }
      }
    }
  },
  argTypes: {
    label: {
      name: 'label',
      description: 'Label (inner test)',
      control: {
        type: 'text'
      }
    }
  }
}

export const Default = (args) => ({
  props: Object.keys(args),
  components: {
    SbMenu,
    SbMenuButton,
    SbMenuList,
    SbMenuItem,
    SbMenuGroup,
    SbMenuSeparator
  },
  template: `
    <div>
      <SbMenu>
        <SbMenuButton label="Combo button" />

        <SbMenuList placement="bottom-start">
          <SbMenuGroup title="Actions">
            <SbMenuItem> Option 1 </SbMenuItem>
            <SbMenuItem> Option 2 </SbMenuItem>
          </SbMenuGroup>

          <SbMenuSeparator />

          <SbMenuGroup title="More">
            <SbMenuItem> Option 3 </SbMenuItem>

            <SbMenuItem type="negative"> Delete </SbMenuItem>
          </SbMenuGroup>
        </SbMenuList>
      </SbMenu>
    </div>
  `
})

export const WithSeparators = (args) => ({
  props: Object.keys(args),
  components: {
    SbMenu,
    SbMenuButton,
    SbMenuList,
    SbMenuItem,
    SbMenuGroup,
    SbMenuSeparator
  },
  template: `
    <div>
      <SbMenu>
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
  `
})

export const WithIcons = (args) => ({
  props: Object.keys(args),
  components: {
    SbMenu,
    SbMenuButton,
    SbMenuList,
    SbMenuItem,
    SbMenuGroup,
    SbMenuSeparator
  },
  template: `
    <div>
      <SbMenu>
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
  `
})

export const ButtonWithJustIcon = (args) => ({
  props: Object.keys(args),
  components: {
    SbMenu,
    SbMenuButton,
    SbMenuList,
    SbMenuItem,
    SbMenuGroup,
    SbMenuSeparator
  },
  template: `
    <div>
      <SbMenu>
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
  `
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
    SbGroupButton
  },
  template: `
    <div style="display: flex; justify-content: center;">
      <SbMenu>
        <SbGroupButton type="ghost">
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
  `
})
