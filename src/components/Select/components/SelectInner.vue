<template>
  <div
    class="sb-select-inner"
    :class="{ 'sb-select-inner__disabled': isDisabled }"
    tabindex="0"
    v-on="$listeners"
    @keydown="handleKeyDown"
  >
    <SbIcon
      v-if="leftIcon"
      class="sb-select-inner__icon-left"
      :name="leftIcon"
      color="primary-dark"
    />

    <div v-if="isTagsVisible" class="sb-select-inner__tags">
      <SbTag
        v-for="(tagLabel, key) in tagLabels"
        :key="key"
        tabindex="0"
        :closable="!isDisabled"
        @keydown="handleTagKeydown($event, tagLabel)"
        @close="removeItem($event, tagLabel)"
      >
        <template v-if="tagLabel">
          <SbAvatar
            v-if="isTagAvatarVisible"
            :src="getSource(tagLabel)"
            size="small"
            :name="tagLabel[itemLabel]"
          />
          <span>{{ tagLabel[itemLabel] }}</span>
        </template>
      </SbTag>
      <input
        v-if="filterable"
        :id="inputId"
        ref="search"
        v-model="searchInputText"
        type="search"
        class="sb-select-inner__input"
        :disabled="isDisabled"
        :style="inlineWidth"
        :placeholder="placeholderLabel"
        :readonly="!filterable"
        @focus="handleEmitSearchInput"
      />
    </div>

    <div v-if="isAvatarVisible && showAvatar" class="sb-select-inner__avatar">
      <SbAvatar
        :src="avatarData.src"
        size="small"
        show-name
        :name="innerLabel"
      />
    </div>

    <input
      v-if="isInnerSearchVisible"
      :id="inputId"
      v-model="searchInputText"
      type="search"
      class="sb-select-inner__input"
      :disabled="isDisabled"
      :style="inlineWidth"
      :placeholder="placeholderLabel"
      :readonly="!filterable || inline"
      @focus="handleEmitSearchInput"
    />

    <slot v-if="hasDefaultSlot" />
    <span v-else-if="hidePlaceholder" class="sb-select-inner__value">
      {{ innerLabel }}
    </span>

    <div class="sb-select-inner__icons">
      <button
        v-if="showClearButton && !isDisabled"
        v-tooltip="{ label: 'Remove all' }"
        aria-label="Clear all values"
        class="sb-select-inner__clear"
        type="button"
        @keydown="clearAllValuesKeydown"
        @click="clearAllValues"
      >
        <SbIcon name="x-clear" />
      </button>

      <SbIcon class="sb-select-inner__chevron" :name="rightIconName" />
    </div>
  </div>
</template>

<script>
import { isArray } from '../../../utils'
import SbIcon from '../../Icon'
import SbTag from '../../Tag'
import SbAvatar from '../../Avatar'

import { Tooltip } from '../../../directives'

export default {
  name: 'SbSelectInner',

  directives: {
    tooltip: Tooltip,
  },

  components: {
    SbIcon,
    SbTag,
    SbAvatar,
  },

  inject: ['selectContext'],

  props: {
    clearable: Boolean,
    inline: Boolean,

    label: {
      type: String,
      default: '',
    },

    inputId: {
      type: String,
      default: '',
    },

    leftIcon: {
      type: String,
      default: null,
    },

    allowCreate: Boolean,
    filterable: Boolean,
    multiple: Boolean,

    // loading props
    isLoading: Boolean,
    loadingLabel: {
      type: String,
      default: 'Loading...',
    },

    value: {
      type: [String, Number, Array],
      default: null,
    },
    options: {
      type: Array,
      default: () => [],
    },
    itemLabel: {
      type: String,
      default: 'label',
    },
    itemValue: {
      type: String,
      default: 'value',
    },
    searchInput: {
      type: [String, Number],
      default: null,
    },

    emitOption: Boolean,
    useAvatars: Boolean,
    isDisabled: Boolean,
  },

  data: () => ({
    showAvatar: false,
  }),

  computed: {
    searchInputText: {
      get() {
        return this.searchInput
      },
      set(value) {
        return value
      },
    },

    hasValue() {
      if (this.multiple || isArray(this.value)) {
        return this.value?.length > 0
      }

      return this.value !== null
    },

    hasDefaultSlot() {
      return !!this.$slots.default
    },

    innerLabel() {
      if (this.filterable && this.multiple) {
        return ''
      }

      if (this.inline) {
        return `${this.label}: ${this.currentOptionLabel}`
      }

      return this.currentOptionLabel
    },

    placeholderLabel() {
      if (!this.hasValue) {
        if (this.isLoading && this.loadingLabel) {
          return this.loadingLabel
        }

        return this.label
      }

      return ''
    },

    hidePlaceholder() {
      return (
        this.hasValue &&
        !this.multiple &&
        !this.searchInputText.length &&
        !this.sAvatarVisible &&
        !this.showAvatar
      )
    },

    currentOptionLabel() {
      return this.currentOptionValue && this.currentOptionValue[this.itemLabel]
        ? this.currentOptionValue[this.itemLabel]
        : this.value
    },

    currentOptionValue() {
      if (!this.hasValue) {
        return {}
      }

      return this.options.find((opt) => opt[this.itemValue] === this.value)
    },

    isTagsVisible() {
      return this.hasValue && this.multiple && !this.hasDefaultSlot
    },

    showClearButton() {
      return this.hasValue && this.clearable
    },

    tagLabels() {
      if (!this.hasValue || !this.multiple) {
        return []
      }

      return this.value.map(($v) => {
        if (typeof $v === 'object') {
          return $v
        }

        return this.options.find(($opt) => $opt[this.itemValue] === $v)
      })
    },

    isAvatarVisible() {
      return this.hasValue && this.useAvatars && Boolean(this.avatarData)
    },

    isTagAvatarVisible() {
      return this.hasValue && this.useAvatars && this.multiple
    },

    isInnerSearchVisible() {
      return !this.isTagsVisible
    },

    isSearchTextVisible() {
      return this.filterable && this.multiple && this.isTagsVisible
    },

    avatarData() {
      return this.options.find((option) => {
        return option[this.itemValue] === this.value
      })
    },

    context() {
      return this.selectContext()
    },

    inlineWidth() {
      const width = this.inline ? `${this.innerLabel.length}ch` : '100%'
      return { width }
    },

    rightIconName() {
      return this.isLoading ? 'loading' : 'chevron-down'
    },
  },

  watch: {
    searchInputText(val) {
      if (
        this.avatarData &&
        val === this.avatarData?.label &&
        this.isAvatarVisible
      ) {
        this.showAvatar = true
      }
    },

    value(val, oldVal) {
      const isSameValue = JSON.stringify(val) === JSON.stringify(oldVal)
      if (this.isSearchTextVisible && !isSameValue) {
        if (oldVal.length && val.length) {
          this.$nextTick(() => this.$refs.search.focus())
        }
        return
      }

      if (this.isAvatarVisible) {
        this.showAvatar = true
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
     * forward the 'input' event
     */
    handleEmitSearchInput() {
      if (this.filterable && !this.isDisabled) {
        this.$emit('input', '')

        if (this.isAvatarVisible) {
          this.showAvatar = false
        }
      }
    },

    /**
     * clear all items from value
     */
    clearAllValues(event) {
      event.stopPropagation()
      event.preventDefault()
      this.$emit('clear-all-values')
    },

    /**
     * handle with keydown event in the clear all button
     */
    clearAllValuesKeydown(event) {
      if (event.key === 'Enter') {
        this.clearAllValues(event)
      }
    },

    /**
     * remove an item from value or name
     */
    removeItem(event, selectedTag) {
      event.stopPropagation()
      event.preventDefault()
      this.$emit('remove-item-value', this.getComputedTagValue(selectedTag))
    },

    /**
     * handles inner keydown element
     */
    handleKeyDown(event) {
      event.stopPropagation()
      const { focusOnFirstItem, focusOnLastItem } = this.context

      if (event.key === 'Enter') {
        event.preventDefault()
        if (this.allowCreate && this.searchInputText.length) {
          this.handleEmitValue(this.searchInputText)
          this.$emit('input', '')
        } else {
          this.$emit('keydown-enter')
        }
      }

      if (event.key === 'Backspace') {
        const tagsLength = this.tagLabels.length
        if (tagsLength && !this.searchInputText.length) {
          document.querySelectorAll('.sb-tag')[tagsLength - 1].focus()
        }
      }

      if (event.key === 'Escape') {
        this.$emit('close-list')
      }

      if (event.key === 'ArrowDown') {
        focusOnFirstItem()
      }

      if (event.key === 'ArrowUp') {
        focusOnLastItem()
      }
    },

    /**
     * handles with keydown and emits the remove-item-value event
     */
    handleTagKeydown(event, tagValue) {
      if (
        event.key === 'Enter' ||
        event.key === ' ' ||
        event.key === 'Backspace' ||
        event.key === 'Delete'
      ) {
        this.$emit('remove-item-value', this.getComputedTagValue(tagValue))
      }

      event.stopPropagation()
    },

    /**
     * get the tag value based on emitOption property
     */
    getComputedTagValue(tag) {
      return this.emitOption ? tag : tag[this.itemValue]
    },

    getSource(label) {
      if (label?.src) {
        return label.src
      }
      return ''
    },
  },
}
</script>
