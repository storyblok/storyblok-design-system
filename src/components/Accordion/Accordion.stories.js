import Accordion from './index'
import { SbSelect } from '../Select'
import SbTextField from '../TextField'

export default {
  title: 'Design System/Components/SbAccordion',
  component: Accordion,
  excludeStories: /.*Data$/,
  args: {
    title: 'Group 1',
    icon: 'settings',
    iconDescription: 'Edit',
    isOpen: false,
    noHighlight: false,
    noBorder: false,
    noPadding: false,
  },
}

export const Default = (args) => ({
  components: { Accordion, SbSelect, SbTextField },
  props: Object.keys(args),
  data: () => ({
    label: 'Headline',
    placeholder: 'Enter something',
  }),
  template: `
    <div>
      <Accordion
        v-bind="{
          title,
          icon,
          iconDescription,
          isOpen,
          noBorder,
          noHighlight,
          noPadding
        }"
        style="max-width: 300px"
      >
        <SbTextField
          :label="label"
          :placeholder="placeholder"
          style="margin-bottom: 15px;"
        />
      </Accordion>

      <Accordion
        title="Group 2"
        v-bind="{
          icon,
          iconDescription,
          isOpen,
          noBorder,
          noHighlight,
          noPadding
        }"
        style="max-width: 300px"
      >
          <SbTextField
          :label="label"
          :placeholder="placeholder"
          style="margin-bottom: 15px;"
        />
      </Accordion>

      <Accordion
          title="Group 3"
          v-bind="{
            icon,
            iconDescription,
            isOpen,
            noBorder,
            noHighlight,
            noPadding
          }"
          style="max-width: 300px"
      >
      <SbTextField
      :label="label"
      :placeholder="placeholder"
      style="margin-bottom: 15px;"
    />
      </Accordion>
      <Accordion
          title="Group with a very long title that should be truncated and not go over two or more lines"
          icon="delete"
          v-bind="{
            iconDescription,
            isOpen,
            noBorder,
            noHighlight,
            noPadding
          }"
          style="max-width: 300px"
      >
      <SbTextField
      :label="label"
      :placeholder="placeholder"
      style="margin-bottom: 15px;"
    />
      </Accordion>
    </div>
  `,
})
