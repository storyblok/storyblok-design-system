import { SbTabs, SbTab } from '.'
import { SbTabPanels, SbTabPanel } from '../TabPanels'

// @vue/component
const TabsTemplate = (template) => (args) => ({
  components: { SbTabs, SbTab, SbTabPanel, SbTabPanels },
  setup: () => ({ args }),
  data() {
    return {
      tabs: [
        {
          label: 'First',
          name: 'first',
          icon: 'calendar',
        },
        {
          label: 'Secondary',
          name: 'secondary',
        },
        {
          label: 'Third',
          name: 'third',
        },
        {
          label: 'Fourth',
          name: 'fourth',
        },
        {
          label: 'Disabled',
          name: 'disabled',
          disabled: true,
        },
      ],
      currentTab: 'first',
    }
  },
  watch: {
    modelValue(newValue) {
      this.currentTab = newValue
    },
  },
  methods: {
    onNewTab(val) {
      this.tabs.push(val)
    },
    onEditTab(val) {
      const index = this.tabs.findIndex((tab) => tab.name === val.name)
      this.tabs[index] = {
        ...val,
      }
    },
  },
  template:
    template ||
    `
    <div>
      <SbTabs
        v-model="currentTab"
        v-bind="args"
        aria-label="This is a simple description"
        @new-tab="onNewTab"
      >
        <SbTab
          v-for="tab in tabs"
          :key="tab.name"
          :label="tab.label"
          :name="tab.name"
          :icon="tab.icon"
          :is-disabled="tab.disabled"
          @edit-tab="onEditTab"
        />
      </SbTabs>
    </div>
  `,
})

export default {
  title: 'Navigation/SbTabs',
  component: SbTabs,
  args: {
    orientation: 'horizontal',
    showAddButton: false,
    type: null,
    modelValue: 'first',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Tabs keeps related content in a single container that is shown and hidden through navigation.',
      },
    },
  },
  argTypes: {
    orientation: {
      name: 'orientation',
      description:
        'Define how the tabs should be views, as horizontal or vertical.',
      options: ['horizontal', 'vertical'],
      control: {
        type: 'select',
      },
    },
    showAddButton: {
      name: 'showAddButton',
      description: 'Prop to show the button for adding new tabs.',
      control: {
        type: 'boolean',
      },
    },
    type: {
      name: 'type',
      description: 'With prop `type` you can change the type of tab view',
      options: ['container'],
      control: {
        type: 'select',
      },
    },
    modelValue: {
      name: 'modelValue',
      description:
        'Current tab. The modelValue property has to be used for `v-model` directive',
      control: {
        type: 'text',
      },
    },
  },
}

export const Default = TabsTemplate().bind({})

export const Container = TabsTemplate().bind({})

Container.args = {
  type: 'container',
}

export const Vertical = TabsTemplate().bind({})

Vertical.args = {
  orientation: 'vertical',
  type: 'vertical',
}

export const WithTabPanels = TabsTemplate(`
  <div>
    <SbTabs
      v-model="currentTab"
      v-bind="args"
      @new-tab="onNewTab"
    >
      <SbTab
        v-for="tab in tabs"
        :key="tab.name"
        :label="tab.label"
        :name="tab.name"
        :is-disabled="tab.disabled"
        @edit-tab="onEditTab"
      />
    </SbTabs>

    <SbTabPanels v-model="currentTab">
      <SbTabPanel name="first">
        <p>Panel first</p>
      </SbTabPanel>

      <SbTabPanel name="secondary">
        <p>Panel secondary</p>
      </SbTabPanel>

      <SbTabPanel name="third">
        <p>Panel third</p>
      </SbTabPanel>
    </SbTabPanels>
  </div>
  `).bind({})

export const EditableTabs = TabsTemplate(`
<div>
  <SbTabs
    v-model="currentTab"
    v-bind="args"
    @new-tab="onNewTab"
  >
    <SbTab
      v-for="tab in tabs"
      :key="tab.name"
      :label="tab.label"
      :name="tab.name"
      :is-disabled="tab.disabled"
      editable
      @edit-tab="onEditTab"
    />
  </SbTabs>
</div>
`).bind({})
