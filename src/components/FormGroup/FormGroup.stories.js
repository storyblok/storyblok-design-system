import SbFormGroup from './index'
import { SbSelect } from '../Select'
import SbTextField from '../TextField'

export default {
  title: 'SbFormGroup',
  component: SbFormGroup,
  excludeStories: /.*Data$/,
  args: {
    legend: 'Group Name',
    description: 'Optional description for group',
    inline: false,
  },
}

export const defaultSelectOptionsData = [
  {
    label: 'Option 1',
    value: 'Option 1',
  },
  {
    label: 'Option 2',
    value: 'Option 2',
  },
  {
    label: 'Option 3',
    value: 'Option 3',
  },
]

export const Default = (args) => ({
  components: { SbFormGroup, SbSelect, SbTextField },
  props: Object.keys(args),
  data: () => ({
    options: [...defaultSelectOptionsData],
    label: 'Label',
    placeholder: 'Placeholder',
  }),
  template: `
    <div>
      <SbFormGroup
        v-bind="{
          legend,
          inline,
          description
        }"
        style="margin-bottom: 20px; max-width: 300px"
      >
        <SbTextField
          :placeholder="placeholder"
          style="margin-bottom: 15px;"
        />
        <SbTextField
          :placeholder="placeholder"
          style="margin-bottom: 15px;"
        />
      </SbFormGroup>
      
      <SbFormGroup
        v-bind="{
          legend,
          inline,
          description
        }"
        style="margin-bottom: 20px; max-width: 300px"
      >
        <SbTextField
          :label="label"
          style="margin-bottom: 15px;"
        />
        <SbTextField
          :label="label"
          style="margin-bottom: 15px;"
        />
      </SbFormGroup>
      
      <SbFormGroup
        v-bind="{
          legend,
          inline,
          description
        }"
        style="margin-bottom: 20px; max-width: 300px"
      >
        <SbSelect
          label="Choose an option"
          :options="options"
          style="display: block; margin-bottom: 15px; width: 100%; box-sizing: border-box"
        />
        
        <SbSelect
          label="Choose an option"
          :options="options"
          style="display: block; margin-bottom: 15px; width: 100%; box-sizing: border-box"
        />
      </SbFormGroup>
    </div>
  `,
})

export const Inline = (args) => ({
  components: { SbFormGroup, SbSelect, SbTextField },
  props: Object.keys(args),
  data: () => ({
    options: [...defaultSelectOptionsData],
    label: 'Label',
    placeholder: 'Placeholder',
  }),
  template: `
    <div>
      <SbFormGroup
        v-bind="{
          legend,
          inline,
          description
        }"
        style="margin-bottom: 20px;"
      >
        <SbTextField
          :placeholder="placeholder"
          style="margin-bottom: 15px; max-width: 300px"
        />
        <SbTextField
          :placeholder="placeholder"
          style="margin-bottom: 15px; max-width: 300px"
        />
      </SbFormGroup>
      
      <SbFormGroup
        v-bind="{
          legend,
          inline,
          description
        }"
        style="margin-bottom: 20px;"
      >
        <SbTextField
          :label="label"
          style="margin-bottom: 15px; max-width: 300px"
        />
        <SbTextField
          :label="label"
          style="margin-bottom: 15px; max-width: 300px"
        />
      </SbFormGroup>
    </div>
  `,
})

Inline.args = {
  inline: true,
}
