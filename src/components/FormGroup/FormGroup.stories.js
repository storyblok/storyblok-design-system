import SbFormGroup from './index'
import { SbSelect } from '../Select'

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
  components: { SbFormGroup, SbSelect },
  props: Object.keys(args),
  data: () => ({
    options: [...defaultSelectOptionsData],
  }),
  template: `
    <div>
      <SbFormGroup
        :legend="legend"
        style="margin-bottom: 20px; max-width: 400px"
      >
        <input type="text" style="display: block; margin-bottom: 15px; width: 100%; box-sizing: border-box" />
        <input type="text" style="display: block; margin-bottom: 15px; width: 100%; box-sizing: border-box" />
      </SbFormGroup>
      
      <SbFormGroup
        :legend="legend"
        style="margin-bottom: 20px; max-width: 400px"
      >
        <input type="text" style="display: block; margin-bottom: 15px; width: 100%; box-sizing: border-box" />
        <input type="text" style="display: block; margin-bottom: 15px; width: 100%; box-sizing: border-box" />
      </SbFormGroup>
      
      <SbFormGroup
        :legend="legend"
        :description="description"
        style="margin-bottom: 20px; max-width: 400px"
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
  components: { SbFormGroup, SbSelect },
  props: Object.keys(args),
  data: () => ({
    options: [...defaultSelectOptionsData],
  }),
  template: `
    <div>
      <SbFormGroup
        :legend="legend"
        :description="description"
        inline
        style="margin-bottom: 20px; width: 100%; max-width: 720px"
      >
        <input type="text" style="display: block; margin-bottom: 15px; width: 100%; max-width: 400px; box-sizing: border-box" />
        <input type="text" style="display: block; margin-bottom: 15px; width: 100%; max-width: 400px; box-sizing: border-box" />
      </SbFormGroup>
      
      <SbFormGroup
        :legend="legend"
        :description="description"
        inline
        style="margin-bottom: 20px; width: 100%; max-width: 720px"
      >
        <input type="text" style="display: block; margin-bottom: 15px; width: 100%; max-width: 400px; box-sizing: border-box" />
        <input type="text" style="display: block; margin-bottom: 15px; width: 100%; max-width: 400px; box-sizing: border-box" />
      </SbFormGroup>
    </div>
  `,
})

Inline.args = {
  inline: true,
}
