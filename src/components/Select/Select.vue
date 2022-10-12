<template>
  <div
    v-click-outside="wrapClose"
    class="sb-select"
    :class="{
      'sb-select--multiple': multiple,
      'sb-select--inline': inline,
      'sb-select--loading': isLoading,
    }"
    :aria-expanded="isOpen ? 'true' : 'false'"
  >
    <SbSelectInner
      ref="inner"
      :input-id="inputId"
      :is-loading="isLoading"
      :loading-label="loadingLabel"
      :clearable="clearable"
      :multiple="multiple"
      :inline="inline"
      :label="label"
      :value="value"
      :search-input="searchInput"
      :filterable="filterable"
      :item-label="itemLabel"
      :item-value="itemValue"
      :left-icon="leftIcon"
      :use-avatars="useAvatars"
      :options="options"
      :allow-create="allowCreate"
      :is-disabled="isDisabled"
      :emit-option="emitOption"
      :error="error"
      :show-caption="showCaption"
      :item-caption="itemCaption"
      @click="handleSelectInnerClick"
      @keydown-enter="handleKeyDownEnter"
      @input="handleSearchInput"
      @emit-value="handleEmitValue"
      @close-list="hideList"
      @clear-all-values="handleClearAllValues"
      @remove-item-value="handleRemoveItemValue"
    >
      <slot name="innerSelect" />
    </SbSelectInner>

    <span v-if="showError" class="sb-select__message sb-select__message--error">
      {{ errorMessage }}
    </span>

    <SbSelectList
      v-if="!useMinibrowser"
      ref="list"
      v-infinite-scroll="{ handler: handleInfiniteScroll }"
      :value="value"
      :is-loading="isLoading"
      :search-input="searchInput"
      :item-label="itemLabel"
      :item-value="itemValue"
      :options="filteredOptions"
      :multiple="multiple"
      :use-avatars="useAvatars"
      :no-data-text="noDataText"
      :no-data-text-tag="noDataTextTag"
      :allow-create="allowCreate"
      :emit-option="emitOption"
      :show-caption="showCaption"
      :item-caption="itemCaption"
      :show-list-on-top="showListOnTop"
      :is-loading-more="isLoadingMore"
      :loading-more-text="loadingMoreText"
      :all-option-value="firstOptionValue"
      :first-value-is-all-value="firstValueIsAllValue"
      @emit-value="handleEmitValue"
      @option-created="handleOptionCreated"
      @focus-item="focusAtIndex($event)"
    />

    <slot name="minibrowser" />

    <input
      :id="inputId"
      class="sb-select__input--hidden"
      :required="required"
      :value="value"
    />
  </div>
</template>

<script>
import { debounce } from 'throttle-debounce'
import { ClickOutside, InfiniteScroll } from '../../directives'
import { canUseDOM, includes, toLowerCase, isString } from '../../utils'
import SbSelectInner from './components/SelectInner'
import SbSelectList from './components/SelectList'

export default {
  name: 'SbSelect',

  directives: {
    ClickOutside,
    InfiniteScroll,
  },

  components: {
    SbSelectInner,
    SbSelectList,
  },

  provide() {
    return {
      selectContext: () => this.selectContext,
    }
  },

  props: {
    // component props
    value: {
      type: [String, Number, Array],
      default: null,
    },
    required: Boolean,
    multiple: Boolean,
    firstValueIsAllValue: Boolean,
    disableInternalFilter: Boolean,
    filterDebounce: {
      type: Number,
      default: 300,
    },
    isDisabled: Boolean,
    emitOption: Boolean,

    // loading properties
    isLoading: Boolean,
    loadingLabel: {
      type: String,
      default: 'Loading...',
    },

    // inner props
    clearable: Boolean,
    label: {
      type: String,
      default: '',
      required: true,
    },
    inputId: {
      type: String,
      default: '',
    },
    leftIcon: {
      type: String,
      default: null,
    },

    // list props
    options: {
      type: Array,
      default: () => [],
    },
    allowCreate: Boolean,
    filterable: Boolean,
    inline: Boolean,
    useAvatars: Boolean,
    emitSearch: {
      type: Boolean,
      default: false,
    },
    showListOnTop: Boolean,

    itemLabel: {
      type: String,
      default: 'label',
    },
    itemValue: {
      type: String,
      default: 'value',
    },
    noDataText: {
      type: String,
      default: 'Sorry, no result found.',
    },
    noDataTextTag: {
      type: String,
      default: 'Start typing to add new tag.',
    },
    errorMessage: {
      type: String,
      default: '',
    },
    error: Boolean,

    showCaption: Boolean,
    itemCaption: {
      type: String,
      default: 'caption',
    },
    infiniteScroll: Boolean,
    isLoadingMore: Boolean,
    loadingMoreText: {
      type: String,
      default: 'Loading more...',
    },
  },

  data: () => ({
    isOpen: false,
    activeIndex: -1,
    listItems: [],
    innerElement: null,
    searchInput: '',
  }),

  computed: {
    selectContext() {
      return {
        // controls elements
        activeIndex: this.activeIndex,
        listItems: this.listItems,

        // methods to control the menu state
        hideList: this.hideList,
        showList: this.showList,
        toggleMenu: this.toggleMenu,
        focusAtIndex: this.focusAtIndex,
        focusOnFirstItem: this.focusOnFirstItem,
        focusOnLastItem: this.focusOnLastItem,
      }
    },

    selectedItem() {
      return this.options.find((option) => {
        return option[this.itemValue] === this.value
      })
    },

    useMinibrowser() {
      return this.$slots.minibrowser && this.innerElement
    },

    firstOptionValue() {
      return this.options.length > 0 ? this.options[0].value : null
    },

    filteredOptions() {
      if (
        this.filterable &&
        this.hasValueToSearch &&
        !this.disableInternalFilter
      ) {
        return this.transformedOptions.filter((opt) => {
          return includes(
            toLowerCase(opt[this.itemLabel]),
            toLowerCase(this.searchInput)
          )
        })
      }

      return this.transformedOptions
    },

    hasValueToSearch() {
      return this.searchInput && this.searchInput.length > 0
    },

    hasInnerSlot() {
      return !!this.$slots.innerSelect
    },

    transformedOptions() {
      if (this.emitOption) {
        return this.options
      }

      return this.options.map((opt) => {
        if (typeof opt === 'object') return opt
        return { [this.itemLabel]: opt, [this.itemValue]: opt }
      })
    },

    showError() {
      return this.error && this.errorMessage
    },
  },

  watch: {
    activeIndex() {
      this.$_updateNavigation()
    },

    filteredOptions() {
      this.$nextTick(() => {
        this.$_loadListItems()
      })
    },

    searchInput(newValue) {
      this.$emit('search-input', newValue)
    },

    value(newVal, oldVal) {
      if (this.multiple && this.firstValueIsAllValue) {
        if (
          oldVal.length === 1 &&
          oldVal.includes(this.firstOptionValue) &&
          newVal.length > 1
        ) {
          this.$emit(
            'input',
            newVal.filter((item) => item !== this.firstOptionValue)
          )
        }
        if (
          !oldVal.includes(this.firstOptionValue) &&
          newVal.includes(this.firstOptionValue)
        ) {
          this.$emit('input', [this.firstOptionValue])
        }
      }
    },
  },

  mounted() {
    if (this.allowCreate && (!this.filterable || !this.multiple)) {
      console.warn(
        `[SbSelect]: Note that for 'allow-create' to work, 'filterable' and 'multiple' must be true.`
      )
    } else if (this.filterable && this.inline) {
      console.warn(
        `[SbSelect]: Note that 'filterable' does not work when 'inline' is true.`
      )
    }

    this.$_loadListItems()

    this.$watch(
      'searchInput',
      debounce(this.filterDebounce, function (newValue) {
        this.$emit('filter', newValue)
      })
    )

    this.$nextTick(() => {
      if (this.$refs.inner) {
        this.innerElement = this.$refs.inner.$el
      }
    })
  },

  methods: {
    /**
     * shows the items list
     */
    showList() {
      if (this.isOpen) return

      this.isOpen = true
      this.$emit('show')

      if (this.filterable) {
        this.$nextTick(() => {
          canUseDOM &&
            this.$refs.inner &&
            this.$refs.inner.$el
              .querySelector('.sb-select-inner__input')
              .focus()
        })
      }
    },

    /**
     * handle when click-outside is activated and close the list
     */
    wrapClose() {
      this.hideList()
    },

    /**
     * hides the items list
     */
    hideList() {
      if (!this.isOpen) return

      this.isOpen = false
      this.$emit('hide')
      this.activeIndex = -1
    },

    /**
     * shows or hides the items list according to internal state
     */
    handleSelectInnerClick() {
      if (this.isDisabled) return
      if (this.isOpen) {
        this.hideList()
      } else {
        this.showList()
      }
    },

    /**
     * emits the input event to make this component compatible with v-model directive
     * @param {Array<String>|String} value
     */
    handleEmitValue(value) {
      // doesn't close the list
      if (this.multiple) {
        this.searchInput = ''
        const $value = this.processMultipleValue(value)
        this.$emit('input', $value)
        return
      }

      this.searchInput = ''
      this.$emit('input', value)
      this.$_focusInner()
      this.hideList()
    },

    /**
     * emits the input event to make this component compatible with v-model directive
     * @param {Array<String>|String} value
     */
    handleOptionCreated(value) {
      this.searchInput = ''
      this.$emit('option-created', value)
      this.$_focusInner()
      this.hideList()
    },

    /**
     * check if the value exists on this.value
     * but, based on this.emitOption, to check more
     * properly the case when this.value is an array
     * of objects
     * @param  {String|Number|Object} value
     * @return {Boolean}
     */
    isValueAlreadyExists(value) {
      if (this.emitOption) {
        const itemValue = value[this.itemValue]

        return this.value.some(($v) => $v[this.itemValue] === itemValue)
      }

      return includes(this.value, value)
    },

    /**
     * remove a specific value from this.value, based on this.emitOption,
     * to check more properly the case when this.value is an array
     * of objects
     * @param  {String|Number|Object} value
     * @return {Array}
     */
    removeValueFromArray(value) {
      if (this.emitOption) {
        return this.value.filter(
          (val) => val[this.itemValue] !== value[this.itemValue]
        )
      }

      return this.value.filter((val) => val !== value)
    },

    /**
     * returns the processed value to input event
     * @param {String} value
     */
    processMultipleValue(value) {
      if (this.isValueAlreadyExists(value)) {
        return this.removeValueFromArray(value)
      }

      return [...(this.value || []), value]
    },

    /**
     * emit an input event with the item from tag that was removed
     * @param {String} itemValue
     */
    handleRemoveItemValue(itemValue) {
      if (this.multiple) {
        const $value = this.processMultipleValue(itemValue)
        this.$emit('input', $value)
        this.$_focusInner()
      }
    },

    /**
     * emit an input event to clear all selected values when multiple selection
     * or an empty string when single selection
     */
    handleClearAllValues() {
      if (this.multiple) {
        this.$emit('input', [])
        this.hideList()
        this.$_focusInner()
        return
      }

      this.searchInput = ''
      this.$emit('input', null)
      this.hideList()
      this.$_focusInner()
    },

    /**
     * set value emmited in search field
     */
    handleSearchInput(event) {
      this.searchInput = !isString(event) ? event.target.value : event
      if (this.emitSearch) {
        this.$emit('input', this.searchInput)
      }
    },

    /**
     * set focus to first list item
     */
    focusOnFirstItem() {
      this.showList()

      this.activeIndex = 0

      this.$_updateNavigation()
    },

    /**
     * set focus to last list item
     */
    focusOnLastItem() {
      this.showList()

      this.activeIndex = this.listItems.length - 1
    },

    /**
     * set focus a specific list item index
     * @param {Number} index Position index of menu list item
     */
    focusAtIndex(index) {
      this.$_updateTabIndex(index)

      this.activeIndex = index
    },

    /**
     * updates tab index for list items
     * @param {Number} index Position index of menu list item
     */
    $_updateTabIndex(index) {
      if (this.listItems.length > 0) {
        const nodeAtIndex = this.listItems[index]

        this.listItems.forEach((node) => {
          if (node !== nodeAtIndex) {
            node.setAttribute('tabindex', -1)
          }
        })
        nodeAtIndex.setAttribute('tabindex', 0)
      }
    },

    /**
     * set all list items to tabindex -1
     */
    $_resetTabIndex() {
      if (this.listItems.length > 0) {
        this.listItems.forEach((node) => {
          node.setAttribute('tabindex', -1)
        })
      }
    },

    /**
     * set focus to trigger button element
     */
    $_focusInner() {
      canUseDOM && this.$refs.inner && this.$refs.inner.$el.focus()
    },

    /**
     * get all list item elements
     */
    $_loadListItems() {
      if (!this.useMinibrowser) {
        const menuNode = canUseDOM && this.$refs.list.$el

        if (menuNode) {
          this.listItems = menuNode.querySelectorAll('li')
        }
      }
    },

    /**
     * force update navigation index
     */
    $_updateNavigation() {
      if (this.activeIndex !== -1) {
        this.$nextTick(() => {
          this.listItems[this.activeIndex] &&
            this.listItems[this.activeIndex].focus()

          this.$_updateTabIndex(this.activeIndex)
        })

        return
      }

      this.$nextTick(() => {
        this.$_focusInner()

        this.$_resetTabIndex()
      })
    },

    /**
     * handle with keydown enter event from inner elemen
     * trying to select the first item in the array with single one item
     * or open the list if the list is not open
     */
    handleKeyDownEnter() {
      if (!this.isOpen) {
        this.showList()

        this.activeIndex = 0
        return
      }

      if (this.filteredOptions.length === 1) {
        this.handleEmitValue(this.filteredOptions[0][this.itemValue])
      }

      this.$_focusInner()
      this.hideList()
    },

    /**
     * emit a load-more event when the user scroll till the end of the list of items
     */
    handleInfiniteScroll() {
      if (this.infiniteScroll) {
        this.$emit('load-more')
      }
    },
  },
}
</script>
