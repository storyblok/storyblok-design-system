<template>
  <div
    class="sb-select-list"
    :class="{ 'sb-select-list--above': showListOnTop }"
    @keydown="handleKeyDown"
  >
    <ul>
      <template v-if="hasOptions">
        <SbSelectListItem
          v-for="(option, index) in options"
          :key="index"
          :option="option"
          :label="option[itemLabel]"
          :model-value="option[itemValue]"
          :item-value="itemValue"
          :input-value="modelValue"
          :multiple="multiple"
          :emit-option="emitOption"
          :use-avatars="useAvatars"
          :is-focused="index === focusedItem ? true : false"
          :show-caption="showCaption"
          :path="option[itemCaption]"
          :selected="shouldBeChecked(index)"
          :is-disabled="isOptionDisabled(option)"
          :data-testid="`${dataTestid}-item__${index}`"
          @emit-value="handleEmitValue"
          @mouseenter="handleFocusItem(index)"
          @focus="handleFocusItem(index)"
        >
          <template #list-item="scope">
            <slot name="list-item" v-bind="scope" />
          </template>
        </SbSelectListItem>
      </template>
      <li
        v-if="showTagCreation"
        class="sb-select-list__create"
        @keydown.enter="handleOptionCreated(searchInput)"
        @click="handleOptionCreated(searchInput)"
      >
        <span class="sb-select-list__create-label">Create tag</span>
        <span
          class="sb-select-list__create-value"
          :title="searchInput"
          :data-testid="`${dataTestid}-create-search`"
        >
          "{{ searchInput }}"
        </span>
      </li>
      <li v-else-if="isLoadingMore">
        <span
          class="sb-select-list__empty"
          :data-testid="`${dataTestid}-loading-more`"
        >
          <SbLoading color="primary" size="small" />
          {{ loadingMoreText }}
        </span>
      </li>
      <li
        v-else-if="showTextStartingTagCreation"
        :data-testid="`${dataTestid}-no-data-text-tag`"
      >
        <span class="sb-select-list__empty"> {{ noDataTextTag }} </span>
      </li>
      <li
        v-else-if="!hasOptions && !isLoading"
        :data-testid="`${dataTestid}-no-data-text`"
      >
        <span class="sb-select-list__empty">{{ noDataText }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import SbSelectListItem from './SelectListItem'
import SbLoading from '../../Loading'

import { toLowerCase } from '../../../utils'

export default {
  name: 'SbSelectList',

  components: {
    SbSelectListItem,
    SbLoading,
  },

  inject: ['selectContext'],

  props: {
    // input itself value
    modelValue: {
      type: [String, Number, Array],
      default: null,
    },

    // options
    allowCreate: Boolean,
    emitOption: Boolean,
    isLoading: Boolean,
    multiple: Boolean,
    options: {
      type: Array,
      required: true,
      default: () => [],
    },
    useAvatars: Boolean,
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
      required: true,
    },
    noDataTextTag: {
      type: String,
      required: true,
    },
    searchInput: {
      type: [String, Number],
      required: true,
    },

    showCaption: Boolean,
    itemCaption: {
      type: String,
      default: 'path',
    },
    showListOnTop: Boolean,
    isLoadingMore: Boolean,
    loadingMoreText: {
      type: String,
      required: true,
    },
    allOptionValue: {
      type: [String, Number],
      value: '',
    },
    firstValueIsAllValue: Boolean,
    isOptionDisabled: {
      type: Function,
      default: () => false,
    },
  },

  emits: ['emit-value', 'focus-item', 'keydown', 'option-created'],

  data() {
    return {
      focusedItem: -1,
    }
  },

  computed: {
    dataTestid() {
      return this.$attrs['data-testid'] || 'sb-select-list'
    },

    context() {
      return this.selectContext()
    },

    hasOptions() {
      return this.options.length
    },

    hasPartialMatch() {
      let partialMatches = 0
      this.options.forEach((option) => {
        if (
          toLowerCase(option.name).indexOf(toLowerCase(this.searchInput)) !== -1
        ) {
          partialMatches++
        }
      })

      return partialMatches
    },

    hasExactMatch() {
      let exactMatch = 0
      this.options.forEach((option) => {
        if (toLowerCase(option.name) === toLowerCase(this.searchInput)) {
          exactMatch++
        }
      })

      return exactMatch
    },

    showTagCreation() {
      return (
        (this.hasPartialMatch || !this.hasOptions) &&
        !this.hasExactMatch &&
        this.allowCreate &&
        this.multiple &&
        this.searchInput
      )
    },

    showTextStartingTagCreation() {
      return (
        (this.hasPartialMatch || !this.hasOptions) &&
        !this.hasExactMatch &&
        this.allowCreate &&
        this.multiple
      )
    },
  },

  watch: {
    'context.activeIndex'(value) {
      if (value === -1) {
        this.focusedItem = value
      } else {
        this.handleFocusItem(value)
      }
    },
  },

  methods: {
    /**
     * forward the 'emit-value' event
     * @param {String} value
     */
    handleEmitValue(value) {
      this.$emit('emit-value', value)
    },

    /**
     * forward the 'optione-created' event
     * @param {String} value
     */
    handleOptionCreated(value) {
      this.$emit('option-created', value)
    },

    /**
     * handle with keydown event when list component is focused
     * @param {Event} event
     */
    handleKeyDown(event) {
      const {
        activeIndex,
        focusAtIndex,
        focusOnFirstItem,
        focusOnLastItem,
        hideList,
        listItems,
      } = this.context
      const count = listItems?.length || 0

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          focusAtIndex((activeIndex + 1) % count)
          break
        case 'ArrowUp':
          event.preventDefault()
          focusAtIndex((activeIndex - 1 + count) % count)
          break
        case 'Home':
          this.handleFocusItem(0)
          focusOnFirstItem()
          break
        case 'End':
          this.handleFocusItem(count - 1)
          focusOnLastItem()
          break
        case 'Tab':
          event.preventDefault()
          break
        case 'Escape':
          hideList()
          break
        default:
          break
      }

      this.$emit('keydown', event)
    },

    handleFocusItem(index) {
      this.focusedItem = index
      this.$emit('focus-item', index)
    },

    shouldBeChecked(index) {
      return (
        this.firstValueIsAllValue &&
        this.modelValue &&
        this.modelValue.includes(this.allOptionValue) &&
        index > 0
      )
    },
  },
}
</script>
