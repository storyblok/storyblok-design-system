import { SbSelect } from '.'
import { SbMinibrowser } from '../Minibrowser'
import { MOCK_DATA } from '../Minibrowser/Minibrowser.stories'
import { toLowerCase, isString } from '../../utils'

// @vue/component
const SelectTemplate = (args) => ({
  components: {
    SbSelect,
  },

  setup() {
    return { ...args }
  },

  data: () => ({
    internalValue: null,
  }),

  watch: {
    modelValue: {
      handler(newValue) {
        this.internalValue = newValue
      },
      immediate: true,
    },
    multiple: {
      handler(isMultiple) {
        this.internalValue = isMultiple ? [] : null
      },
      immediate: true,
    },
  },

  methods: {
    handleOptionCreated(value) {
      const newValue = { value, label: value }
      this.options.push(newValue)
      this.internalValue.push(value)
    },
  },

  template: `
    <div style="min-height: 300px;">
      <SbSelect
      :label="label"
      :options="options"
      :multiple="multiple"
      :left-icon="leftIcon"
      :filterable="filterable"
      :use-avatars="useAvatars"
      :inline="inline"
      :no-data-text="noDataText"
      :no-data-text-tag="noDataTextTag"
      :allow-create="allowCreate"
      :is-loading="isLoading"
      :loading-label="loadingLabel"
      :clearable="clearable"
      :show-caption="showCaption"
      v-model="internalValue"
      :first-value-is-all-value="firstValueIsAllValue"
      style="max-width: 300px"
      @option-created="handleOptionCreated"
    />
    </div>
    `,
})

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

export const selectOptionsDataWithAllOption = [
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
    caption: 'uk/folder-text/uk',
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
    icon: 'refresh',
  },
]

export default {
  title: 'Design System/Components/Form/SbSelect',
  component: SbSelect,
  excludeStories: /.*Data$/,
  args: {
    label: 'Choose an option',
    options: [...defaultSelectOptionsData],
    modelValue: null,
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
  },
}

export const Default = SelectTemplate.bind({})

export const Multiple = SelectTemplate.bind({})

Multiple.args = {
  multiple: true,
}

export const MultipleWithAllOption = SelectTemplate.bind({})

MultipleWithAllOption.args = {
  multiple: true,
  options: selectOptionsDataWithAllOption,
  firstValueIsAllValue: true,
}

export const OptionsWithIcon = SelectTemplate.bind({})

OptionsWithIcon.args = {
  options: defaultOptionsWithIconData,
}

export const Filterable = SelectTemplate.bind({})

Filterable.args = {
  filterable: true,
  disableInternalFilter: false,
}

export const LazySearch = (args) => ({
  components: {
    SbSelect,
  },

  props: Object.keys(args),

  data: () => ({
    internalSearch: true,
    internalValue: null,
    internalOptions: args.options,
    internalLoading: args.isLoading,
  }),

  methods: {
    handleFilter(search) {
      this.internalLoading = true

      setTimeout(() => {
        if (!search) {
          this.internalOptions = this.options
          this.internalLoading = false
          return
        }

        this.internalOptions = this.options.filter((option) => {
          return toLowerCase(option.label).includes(search)
        })

        this.internalLoading = false
      }, 300)
    },
  },

  template: `
  <div style="min-height: 300px">
    <SbSelect
      :label="label"
      :options="internalOptions"
      :multiple="multiple"
      :left-icon="leftIcon"
      :filterable="filterable"
      :use-avatars="useAvatars"
      :inline="inline"
      :no-data-text="noDataText"
      :no-data-text-tag="noDataTextTag"
      :allow-create="allowCreate"
      :is-loading="internalLoading"
      :loading-label="loadingLabel"
      :clearable="clearable"
      :disable-internal-filter="internalSearch"
      v-model="internalValue"
      style="max-width: 300px"
      @filter="handleFilter"
    />
    </div>
  `,
})

LazySearch.args = {
  filterable: true,
  disableInternalSearch: true,
}

export const MultipleAndFilterable = SelectTemplate.bind({})

MultipleAndFilterable.args = {
  multiple: true,
  filterable: true,
}

export const Loading = SelectTemplate.bind({})

Loading.args = {
  isLoading: true,
}

export const AllowCreate = SelectTemplate.bind({})

AllowCreate.args = {
  allowCreate: true,
  filterable: true,
  multiple: true,
  noDataTextTag: 'Start typing to add new tag.',
}

export const WithIcon = SelectTemplate.bind({})

WithIcon.args = {
  leftIcon: 'calendar',
}

export const WithAvatars = SelectTemplate.bind({})

WithAvatars.args = {
  useAvatars: true,
  filterable: true,
  options: [...defaultAvatarsData],
}

export const MutipleAndAvatars = SelectTemplate.bind({})

MutipleAndAvatars.args = {
  multiple: true,
  useAvatars: true,
  filterable: true,
  options: [...defaultAvatarsData],
}

export const Inline = SelectTemplate.bind({})

Inline.args = {
  inline: true,
}

export const WithMinibrowser = (args) => ({
  components: {
    SbSelect,
    SbMinibrowser,
  },

  props: Object.keys(args),

  data: () => ({
    internalValue: null,
    minibrowserOptions: [...MOCK_DATA.FIRST_LEVEL],
  }),

  watch: {
    modelValue: {
      handler(newValue) {
        this.internalValue = newValue
      },
      immediate: true,
    },
  },

  methods: {
    onSelectItem(item) {
      if (!item.items.length) {
        this.internalValue = item.label

        this.$refs.select.hideList()
      }
    },

    handleCloseBrowser() {
      this.$refs.select.wrapClose()
    },
  },

  template: `
    <div style="min-height: 300px">
      <SbSelect
        ref="select"
        :label="label"
        :left-icon="leftIcon"
        :filterable="filterable"
        :use-avatars="useAvatars"
        :inline="inline"
        v-model="internalValue"
        style="max-width: 300px"
      >
        <SbMinibrowser
          slot="minibrowser"
          :options="minibrowserOptions"
          @select-item="onSelectItem"
          @close="handleCloseBrowser"
        />
      </SbSelect>
    </div>
  `,
})

export const EmitOption = (args) => ({
  components: {
    SbSelect,
    SbMinibrowser,
  },

  props: Object.keys(args),

  data: () => ({
    singleSelectValue: null,
    singleSelectOption: {},

    multipleSelectValue: [],
  }),

  watch: {
    modelValue: {
      handler(newValue) {
        this.internalValue = newValue
      },
      immediate: true,
    },
  },

  methods: {
    handleSingleSelect(selectedValue) {
      this.singleSelectValue = selectedValue.value
      this.singleSelectOption = selectedValue
    },
  },

  template: `
    <div>
      <div style="min-height: 300px">
        <h2 style="margin-bottom: 10px"> Single Select </h2>

        <SbSelect
          :label="label"
          :options="options"
          :multiple="multiple"
          :left-icon="leftIcon"
          :filterable="filterable"
          :use-avatars="useAvatars"
          :inline="inline"
          :no-data-text="noDataText"
          :no-data-text-tag="noDataTextTag"
          :allow-create="allowCreate"
          :is-loading="isLoading"
          :loading-label="loadingLabel"
          :clearable="clearable"
          emit-option
          :modelValue="singleSelectValue"
          @update:modelValue="handleSingleSelect"
          style="max-width: 300px"
        />

        <p class="font-weight-medium text-ink font-size-lg">
          Selected value {{ singleSelectValue }}
        </p>
        <p class="font-weight-medium text-ink font-size-lg">
          Selected option {{ singleSelectOption }}
        </p>
      </div>

      <h2 style="margin-bottom: 10px"> Multiple Select </h2>

      <SbSelect
        :label="label"
        :options="options"
        :left-icon="leftIcon"
        :filterable="filterable"
        :use-avatars="useAvatars"
        :inline="inline"
        :no-data-text="noDataText"
        :no-data-text-tag="noDataTextTag"
        :allow-create="allowCreate"
        :is-loading="isLoading"
        :loading-label="loadingLabel"
        :clearable="clearable"
        multiple
        emit-option
        v-model="multipleSelectValue"
        style="max-width: 300px"
      />

      <p class="font-weight-medium text-ink font-size-lg">
        Selected value {{ multipleSelectValue }}
      </p>
    </div>
  `,
})

EmitOption.parameters = {
  docs: {
    description: {
      story:
        'When we set the `emitOption` property, the `input` event will send the whole option object, instead of the `value` property in options objects. It is expected different value types in **single** and **multiple** value property. In **single** selection, the `value` property can be a `Number` or a `String`. In multiple selection, the `value` **must** be an array of objects defined in options. This could be useful if you want to use the `<SbSelect>` with `v-model`',
    },
  },
}

export const EmitSearch = (args) => ({
  components: {
    SbSelect,
  },

  props: Object.keys(args),

  data: () => ({
    searchInput: '',
  }),

  methods: {
    handleSearchValue(event) {
      if (!isString(event) && typeof event === 'object') {
        this.searchInput = event.label
      } else {
        this.searchInput = !isString(event) ? event.target.value : event
      }
    },
  },

  template: `
    <div>
      <div style="min-height: 300px;">
        <h2 style="margin-bottom: 10px"> Typed value {{ searchInput }} </h2>

        <SbSelect
          :label="label"
          :options="options"
          :multiple="multiple"
          :left-icon="leftIcon"
          :filterable="true"
          :use-avatars="useAvatars"
          :inline="inline"
          :no-data-text="noDataText"
          :no-data-text-tag="noDataTextTag"
          :allow-create="allowCreate"
          :is-loading="isLoading"
          :loading-label="loadingLabel"
          :clearable="clearable"
          emit-search
          emit-option
          :modelValue="searchInput"
          @input="handleSearchValue"
          style="max-width: 300px"
        />
      </div>
    </div>
  `,
})

EmitSearch.parameters = {
  docs: {
    description: {
      story:
        'When we set `emitSearch` property to true, the `input` event will send the typed value. It is useful when you want to forward values that are not in the dropdown list. Note that the typed value will overwrite any values from the dropdown list previously selected. This must be used with filterable set to true.',
    },
  },
}

export const WithCaption = SelectTemplate.bind({})

WithCaption.args = {
  showCaption: true,
  options: [...defaultOptionsWithCaptionData],
}

WithCaption.parameters = {
  docs: {
    description: {
      story:
        'When we pass the `showCaption` prop, it will be possible to render a caption below the name of the value in the `SbSelectList` and in the `SelectInner`, in addition to the value, the caption will be shown in parentheses, the name of the key in the object that will bring the values of the caption can have any name, by default it is `caption` but you can pass any customizable name through the `itemCaption` prop.',
    },
  },
}
