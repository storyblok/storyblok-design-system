import { SbSelect } from '.'
import { SbMinibrowser } from '../Minibrowser'
import { MOCK_DATA } from '../Minibrowser/Minibrowser.stories'
import { toLowerCase, isString } from '../../utils'
import { ref, watch } from 'vue'

export const defaultSelectOptionsData = [
  {
    label: 'Option 1',
    value: 1,
  },
  {
    label: 'Option 2',
    value: 2,
  },
  {
    label: 'Option 3',
    value: 3,
  },
  {
    label: 'Option 4',
    value: 4,
  },
  {
    label: 'Option 5',
    value: 5,
  },
  {
    label: 'Option 6',
    value: 6,
  },
  {
    label: 'Option 7',
    value: 7,
  },
]

export const selectOptionsDataWithAllOptionData = [
  {
    label: 'All options',
    value: 0,
  },
  {
    label: 'Option 1',
    value: 1,
  },
  {
    label: 'Option 2',
    value: 2,
  },
  {
    label: 'Option 3',
    value: 3,
  },
]

export const defaultOptionsWithCaptionData = [
  {
    label: 'Option 1',
    caption: 'en/folder-text/us',
    value: 1,
  },
  {
    label: 'Option 2',
    caption: 'en/folder-text/us',
    value: 2,
  },
  {
    label: 'Option 3',
    caption: '',
    value: 3,
  },
  {
    label: 'Option 4',
    caption:
      'big/folder-1/folder-2/fodler-3/fodler-4/folder-5/fodler-6/a really-big-name-for-a-folder/story',
    value: 4,
  },
  {
    label: 'Option 5',
    caption: 'pt-br/folder-text/BR',
    value: 5,
  },
]

export const defaultAvatarsData = [
  {
    value: '001',
    label: 'Dominik Angerer',
    src: 'https://avatars1.githubusercontent.com/u/7952803?s=400&u=0fd8a3a0721768210fdcedb7607e9ad33af9f7ad&v=4',
  },
  {
    value: '002',
    label: 'Emanuel Gonçalves',
    src: 'https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4',
  },
  {
    value: '003',
    label: 'Alexander Feiglstorfer',
    src: 'https://avatars1.githubusercontent.com/u/160495?s=460&u=b88ece40883d2e9716e833f6a3c78c56ca3eb14f&v=4',
  },
]

export const defaultOptionsWithIconData = [
  {
    label: 'Option 1',
    value: 1,
    icon: 'home',
  },
  {
    label: 'Option 2',
    value: 2,
    icon: 'folder-fill',
  },
  {
    label: 'Option 3',
    value: 3,
    icon: 'folder-fill',
  },
  {
    label: 'Option 4',
    value: 4,
    icon: 'plus',
  },
  {
    label: 'Option 5',
    value: 5,
    icon: 'home',
  },
  {
    label: 'Option 6',
    value: 6,
    icon: 'plus',
  },
  {
    label: 'Option 7',
    value: 7,
    icon: 'refresh-cw',
  },
]

import type { Args, Meta, StoryObj } from '@storybook/vue3'

type Story = StoryObj<typeof SbSelect>

const meta: Meta<typeof SbSelect> = {
  title: 'Forms/SbSelect',
  component: SbSelect,
  excludeStories: /.*Data$/,
  args: {
    label: 'Choose an option',
    options: [...defaultSelectOptionsData],
    modelValue: [],
    multiple: false,
    firstValueIsAllValue: false,
    filterable: false,
    leftIcon: null,
    useAvatars: false,
    inline: false,
    noDataText: 'Sorry, no result found.',
    noDataTextTag: 'Start typing to add new tag.',
    allowCreate: false,
    clearable: false,
    isLoading: false,
    loadingLabel: 'Loading...',
    disableInternalSearch: false,
    showCaption: false,
    isOptionDisabled: () => false,
    showCount: false,
    inlineLabel: '',
  },
  render: (args: Args) => ({
    components: {
      SbSelect,
    },

    setup: () => {
      const internalValue = ref(args.modelValue)
      const options = ref(args.options)

      const handleOptionCreated = (value) => {
        const newValue = { value, label: value }
        options.value.push(newValue)
        internalValue.value.push(value)
      }

      watch(
        () => args.modelValue,
        (newValue) => {
          internalValue.value = newValue
        },
      )

      return { args, handleOptionCreated, internalValue, options }
    },

    template: `
      <div style="min-height: 300px;">
        <SbSelect
          v-bind="args"
          v-model="internalValue"
          style="max-width: 300px"
          @option-created="handleOptionCreated"
      />
      </div>
      `,
  }),
}

export default meta

export const Default: Story = {}
export const Multiple: Story = {
  args: {
    multiple: true,
  },
}
export const MultipleWithAllOption: Story = {
  args: {
    multiple: true,
    options: selectOptionsDataWithAllOptionData,
    firstValueIsAllValue: true,
  },
}
export const OptionsWithIcon: Story = {
  args: {
    options: defaultOptionsWithIconData,
  },
}
export const Filterable: Story = {
  args: {
    filterable: true,
    disableInternalFilter: false,
  },
}
export const LazySearch: Story = {
  render: (args: Args) => ({
    components: {
      SbSelect,
    },

    setup() {
      const internalSearch = ref(true)
      const internalValue = ref(null)
      const internalOptions = ref(args.options)
      const internalLoading = ref(args.isLoading)

      const handleFilter = (search) => {
        internalLoading.value = true

        setTimeout(() => {
          if (!search) {
            internalOptions.value = options.value
            internalLoading.value = false
            return
          }

          internalOptions.value = options.value.filter((option) => {
            return toLowerCase(option.label).includes(search)
          })

          internalLoading.value = false
        }, 300)
      }
      return { handleFilter, args, internalSearch, internalValue }
    },

    template: `
  <div style="min-height: 300px">
    <SbSelect
      v-bind="args"
      v-model="internalValue"
      style="max-width: 300px"
      @filter="handleFilter"
    />
    </div>
  `,
  }),

  args: {
    filterable: true,
    disableInternalSearch: true,
  },
}
export const MultipleAndFilterable: Story = {
  args: {
    multiple: true,
    filterable: true,
  },
}
export const Loading: Story = {
  args: {
    isLoading: true,
  },
}
export const AllowCreate: Story = {
  args: {
    allowCreate: true,
    filterable: true,
    multiple: true,
    noDataTextTag: 'Start typing to add new tag.',
  },
}
export const WithIcon: Story = {
  args: {
    leftIcon: 'calendar',
  },
}
export const WithAvatars: Story = {
  args: {
    useAvatars: true,
    filterable: true,
    options: [...defaultAvatarsData],
  },
}
export const MutipleAndAvatars: Story = {
  args: {
    multiple: true,
    useAvatars: true,
    filterable: true,
    options: [...defaultAvatarsData],
  },
}
export const Inline: Story = {
  args: {
    inline: true,
  },
}
export const WithMinibrowser: Story = {
  render: (args: Args) => ({
    components: {
      SbSelect,
      SbMinibrowser,
    },

    setup() {
      const internalValue = ref(null)
      const minibrowserOptions = ref([...MOCK_DATA.FIRST_LEVEL])
      const refSelect = ref(null)

      watch(
        () => args.modelValue,
        (newValue) => {
          internalValue.value = newValue
        },
      )

      const onSelectItem = (item) => {
        const hasChilren = item?.items?.length > 0
        if (!hasChilren) {
          internalValue.value = item.label
          refSelect?.value?.hideList()
        }
      }

      const handleCloseBrowser = () => {
        refSelect?.value?.wrapClose()
      }

      return {
        args,
        refSelect,
        internalValue,
        minibrowserOptions,
        onSelectItem,
        handleCloseBrowser,
      }
    },

    template: `
    <div style="min-height: 300px">
      <SbSelect
        ref="refSelect"
        v-bind="args"
        v-model="internalValue"
        style="max-width: 300px"
      >
        <template #minibrowser>
        <SbMinibrowser
          :options="args.minibrowserOptions"
          @select-item="onSelectItem"
          @close="handleCloseBrowser"
        />
        </template>
      </SbSelect>
    </div>
  `,
  }),
}
export const EmitOption: Story = {
  render: (args: Args) => ({
    components: {
      SbSelect,
      SbMinibrowser,
    },

    setup() {
      const singleSelectValue = ref(null)
      const singleSelectOption = ref({})
      const multipleSelectValue = ref([])

      const handleSingleSelect = (selectedValue) => {
        singleSelectValue.value = selectedValue.value
        singleSelectOption.value = selectedValue
      }

      watch(
        () => args.modelValue,
        (newValue) => {
          internalValue.value = newValue
        },
      )

      return {
        args,
        handleSingleSelect,
        singleSelectValue,
        singleSelectOption,
        multipleSelectValue,
      }
    },

    template: `
    <div>
      <div style="min-height: 300px">
        <h2 style="margin-bottom: 10px"> Single Select </h2>

        <SbSelect
          v-bind="args"
          emit-option
          :modelValue="singleSelectValue"
          @update:modelValue="handleSingleSelect"
          style="max-width: 300px"
        />

        <p class="font-medium text-dark-blue font-size-lg">
          Selected value {{ singleSelectValue }}
        </p>
        <p class="font-medium text-dark-blue font-size-lg">
          Selected option {{ singleSelectOption }}
        </p>
      </div>

      <h2 style="margin-bottom: 10px"> Multiple Select </h2>

      <SbSelect
        v-bind="args"
        multiple
        emit-option
        v-model="multipleSelectValue"
        style="max-width: 300px"
      />

      <p class="font-medium text-dark-blue font-size-lg">
        Selected value {{ multipleSelectValue }}
      </p>
    </div>
  `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'When we set the `emitOption` property, the `input` event will send the whole option object, instead of the `value` property in options objects. It is expected different value types in **single** and **multiple** value property. In **single** selection, the `value` property can be a `Number` or a `String`. In multiple selection, the `value` **must** be an array of objects defined in options. This could be useful if you want to use the `<SbSelect>` with `v-model`',
      },
    },
  },
}
export const EmitSearch: Story = {
  render: (args: Args) => ({
    components: {
      SbSelect,
    },
    setup() {
      const searchInput = ref('')

      const handleSearchValue = (event) => {
        searchInput.value = event?.target?.value ?? event?.label
      }

      return { args, searchInput, handleSearchValue }
    },

    template: `
    <div>
      <div style="min-height: 300px;">


        <p class="font-medium text-dark-blue font-size-lg">
          Search value: {{ searchInput }}
        </p>

        <SbSelect
          v-bind="args"
          emit-search
          emit-option
          filterable
          :modelValue="searchInput"
          @input="handleSearchValue"
          style="max-width: 300px"
        />

      </div>
    </div>
  `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'When we set `emitSearch` property to true, the `input` event will send the typed value. It is useful when you want to forward values that are not in the dropdown list. Note that the typed value will overwrite any values from the dropdown list previously selected. This must be used with filterable set to true.',
      },
    },
  },
}
export const WithCaption: Story = {
  args: {
    showCaption: true,
    options: [...defaultOptionsWithCaptionData],
  },
  parameters: {
    docs: {
      description: {
        story:
          'When we pass the `showCaption` prop, it will be possible to render a caption below the name of the value in the `SbSelectList` and in the `SelectInner`, in addition to the value, the caption will be shown in parentheses, the name of the key in the object that will bring the values of the caption can have any name, by default it is `caption` but you can pass any customizable name through the `itemCaption` prop.',
      },
    },
  },
}
export const WithCaptionTag: Story = {
  args: {
    showCaption: true,
    multiple: true,
    options: [...defaultOptionsWithCaptionData],
  },
  parameters: {
    docs: {
      description: {
        story:
          'When we pass the `multiple` and `showCaption` prop, it will be possible to render a caption below the name of the value in the `SbSelectList` and in the `SelectInner`, in addition to the value, the caption will be shown in parentheses, the name of the key in the object that will bring the values of the caption can have any name, by default it is `caption` but you can pass any customizable name through the `itemCaption` prop.',
      },
    },
  },
}
export const WithOptionDisabled: Story = {
  args: {
    isOptionDisabled: (item) => item.value === 2,
  },
  parameters: {
    docs: {
      description: {
        story:
          'When we pass the `isOptionDisabled` prop, it will be possible to render a option disabled',
      },
    },
  },
}
export const WithInlineLabel: Story = {
  args: {
    inlineLabel: 'Item:',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the `inline-label` property to add text inside the select',
      },
    },
  },
}
export const MultipleWithCountLabels: Story = {
  args: {
    multiple: true,
    showCount: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use the `show-count` property to group the selected items in a counter.',
      },
    },
  },
}
