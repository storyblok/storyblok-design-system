import Accordion from './index'

export default {
  title: 'Basic/SbAccordion',
  component: Accordion,
  args: {
    title: 'Group 1',
    icon: 'settings',
    iconDescription: '',
    isOpen: false,
    noHighlight: false,
    noBorder: false,
    noPadding: false,
    contentInfoSlot: '<i>4 items</i>',
  },
}

const Template = (args) => ({
  components: { Accordion },
  setup() {
    return { args }
  },
  template: `
    <div>
      <Accordion
        v-bind="args"
        style="max-width: 300px"
      >
        <h2>Some text</h2>
        <p>Some more text</p>

        <template #contentInfo>
          <span v-html="args.contentInfoSlot" />
        </template>
      </Accordion>

      <Accordion
        v-bind="args"
        style="max-width: 300px"
      >
        <h2>Some text</h2>
        <p>Some more text</p>

        <template #contentInfo>
          <span v-html="args.contentInfoSlot" />
        </template>
      </Accordion>

      <Accordion
          v-bind="args"
          style="max-width: 300px"
      >
        <h2>Some text</h2>
        <p>Some more text</p>

        <template #contentInfo>
          <span v-html="args.contentInfoSlot" />
        </template>
      </Accordion>
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = { title: 'Hello World' }

export const WithIcon = Template.bind({})
WithIcon.args = {
  title: 'Hello World with Icon',
  icon: 'trash-2',
  iconDescription: 'Delete',
}

export const isOpen = Template.bind({})
isOpen.args = {
  isOpen: true,
}

export const noHighlight = Template.bind({})
noHighlight.args = {
  noHighlight: true,
}

export const noBorder = Template.bind({})
noBorder.args = {
  noBorder: true,
}

export const noPadding = Template.bind({})
noPadding.args = {
  noPadding: true,
}

export const contentInfo = Template.bind({})
contentInfo.args = {
  contentInfoSlot: '',
}
