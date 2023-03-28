import Accordion from './index'

export default {
  title: 'Basic/SbAccordion',
  component: Accordion,
  args: {
    title: 'Group 1',
    icon: '',
    iconDescription: '',
    isOpen: false,
    noHighlight: false,
    noBorder: false,
    noPadding: false,
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
      </Accordion>

      <Accordion
        v-bind="args"
        style="max-width: 300px"
      >
        <h2>Some text</h2>
        <p>Some more text</p>
      </Accordion>

      <Accordion
          v-bind="args"
          style="max-width: 300px"
      >
        <h2>Some text</h2>
        <p>Some more text</p>
      </Accordion>
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = { title: 'Hello World' }

export const WithIcon = Template.bind({})
WithIcon.args = {
  title: 'Hello World with Icon',
  icon: 'delete',
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
