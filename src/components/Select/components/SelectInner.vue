<template>
  <div
    class="sb-select-inner"
    :class="hasSpecialClass"
    tabindex="0"
    v-bind="$attrs"
    @keydown="handleKeyDown"
  >
    <span
      v-if="inlineLabel"
      class="sb-select-inner__inline-label"
    >
      {{ inlineLabel }}
    </span>

    <SbIcon
      v-if="leftIcon"
      class="sb-select-inner__icon-left"
      :name="leftIcon"
      color="primary-dark"
    />

    <div v-if="isTagsVisible" class="sb-select-inner__tags">
      <div v-if="showCount">
        <SelectInnerTag
            :item="firstTagLabel"
            :item-label="itemLabel"
            :item-value="itemValue"
            :item-caption="itemCaption"
            :show-caption="showCaption"
            :is-tag-avatar-visible="isTagAvatarVisible"
            :show-tag-count="tagLabels.length > 1"
            :value-tag-count="tagLabels.length - 1"
            :is-disabled="isDisabled"
            :tags-count-tooltip="tagsCountTooltip"
            :data-testid="`${dataTestid}-tag-show-count`"
            @keydown="handleTagKeydown($event, firstTagLabel)"
            @close="removeItem($event, firstTagLabel)"
          />
      </div>

      <div v-else v-for="(tagLabel, key) in tagLabels" :key="key">
        <slot
          name="selection"
          :item="tagLabel"
          :remove="(e) => removeItem(e, tagLabel)"
        >
          <SelectInnerTag
              :item="tagLabel"
              :item-label="itemLabel"
              :item-value="itemValue"
              :item-caption="itemCaption"
              :show-caption="showCaption"
              :is-tag-avatar-visible="isTagAvatarVisible"
              :is-disabled="isDisabled"
              :data-testid="`${dataTestid}-tag`"
              @keydown="handleTagKeydown($event, tagLabel)"
              @close="removeItem($event, tagLabel)"
            />
        </slot>
      </div>

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
        :data-testid="`${dataTestid}-search-input`"
        @focus="handleEmitSearchInput"
      />
    </div>

    <div v-if="isAvatarVisible && showAvatar" class="sb-select-inner__avatar">
      <SbAvatar
        :src="avatarData.src"
        size="small"
        show-name
        :name="innerLabel"
        :data-testid="`${dataTestid}-avatar`"
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
      :data-testid="`${dataTestid}-search-input`"
      @focus="handleEmitSearchInput"
    />

    <slot v-if="hasDefaultSlot" />
    <span
      v-else-if="hidePlaceholder"
      :title="innerLabel"
      class="sb-select-inner__value"
      :class="{
        'sb-select-inner__value-icon-left': leftIcon,
        'sb-select-inner__value-filterable': filterable,
      }"
    >
      {{ innerLabel }}
    </span>

    <div class="sb-select-inner__icons">
      <button
        v-if="showClearButton && !isDisabled"
        v-tooltip="{ label: 'Clear selection' }"
        aria-label="Clear all values"
        class="sb-select-inner__clear"
        :data-testid="`${dataTestid}-clear-button`"
        type="button"
        @keydown="clearAllValuesKeydown"
        @click="clearAllValues"
      >
        <SbIcon name="x-clear" />
      </button>

      <slot name="rightIcon">
        <SbIcon class="sb-select-inner__chevron" :name="rightIconName" :data-testid="`${dataTestid}-right-icon`"/>
      </slot>
    </div>
  </div>
</template>

<script>
import { isArray } from '../../../utils'
import SbIcon from '../../Icon'
import SbAvatar from '../../Avatar'

import { Tooltip } from '../../../directives'
import SelectInnerTag from './SelectInnerTag.vue'

export default {
  name: 'SbSelectInner',

  directives: {
    tooltip: Tooltip,
  },

  components: {
    SbIcon,
    SbAvatar,
    SelectInnerTag,
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
    filterable: {
      type: Boolean,
      default: false,
    },
    multiple: Boolean,

    // loading props
    isLoading: Boolean,
    loadingLabel: {
      type: String,
      default: 'Loading...',
    },

    modelValue: {
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
    error: Boolean,
    showCaption: Boolean,
    itemCaption: {
      type: String,
      default: 'path',
    },
    inlineLabel: {
      type: String,
      default: '',
    },
    showCount: {
      type: Boolean,
      default: false,
    },
  },

  emits: [
    'clear-all-values',
    'close-list',
    'emit-value',
    'search',
    'keydown-enter',
    'remove-item-value',
  ],

  data: () => ({
    showAvatar: false,
  }),

  computed: {
    dataTestid() {
      return this.$attrs['data-testid'] || 'sb-select-inner'
    },

    searchInputText: {
      get() {
        return this.searchInput
      },
      set(value) {
        this.$emit('search', value)
        return value
      },
    },

    hasSpecialClass() {
      return [
        this.error && 'sb-select-inner--error',
        this.isDisabled && 'sb-select-inner__disabled',
      ]
    },

    hasValue() {
      if (this.multiple || isArray(this.modelValue)) {
        return this.modelValue?.length > 0
      }

      return this.modelValue !== null
    },

    hasDefaultSlot() {
      const slot = this.$slots?.default()
      const slotIsInner = slot && slot[0]?.key === '_innerSelect'
      const slotInnerHasChildren = slotIsInner && slot[0]?.children?.length > 0
      return slotInnerHasChildren || (!slotIsInner && slot?.length > 0)
    },

    innerLabel() {
      if (this.filterable && this.multiple) {
        return ''
      }

      if (this.showCaption && this.currentOptionValue) {
        return this.currentOptionValue[this.itemCaption] ? `${this.currentOptionLabel} (${
          this.currentOptionValue[this.itemCaption]})` :
          `${this.currentOptionLabel}`
      }

      if (this.inline) {
        return `${this.label}: ${this.currentOptionLabel}`
      }

      return this.currentOptionLabel
    },

    placeholderLabel() {
      if (!this.hasValue || (this.multiple && !this.tagLabels.length)) {
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
        !this.isAvatarVisible &&
        !this.showAvatar
      )
    },

    currentOptionLabel() {
      return this.currentOptionValue && this.currentOptionValue[this.itemLabel]
        ? this.currentOptionValue[this.itemLabel]
        : this.modelValue
    },

    currentOptionValue() {
      if (!this.hasValue) {
        return {}
      }

      return this.options.find((opt) => opt[this.itemValue] === this.modelValue)
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

      return this.modelValue
        .map((value) => {
          if (typeof value === 'object') {
            return value
          }

          const selectedOption = this.options.find(
            (option) => option[this.itemValue] === value
          )

          const shouldCreate = this.allowCreate && !selectedOption

          if (shouldCreate) {
            return this.emitOption ? { [this.itemValue]: value } : value
          }

          return selectedOption
        })
        .filter((option) => option !== null && option !== undefined)
    },

    isAvatarVisible() {
      return this.hasValue && this.useAvatars && Boolean(this.avatarData)
    },

    isTagAvatarVisible() {
      return this.hasValue && this.useAvatars && this.multiple
    },

    isInnerSearchVisible() {
      const noTags = !this.isTagsVisible
      const filterOrPlaceholder =
        this.filterable || this.placeholderLabel?.length > 0
      return Boolean(noTags && filterOrPlaceholder)
    },

    isSearchTextVisible() {
      return this.filterable && this.multiple && this.isTagsVisible
    },

    avatarData() {
      return this.options.find((option) => {
        return option[this.itemValue] === this.modelValue
      })
    },

    context() {
      return this.selectContext()
    },

    inlineWidth() {
      const inlineLabelSize = this.currentOptionLabel
        ? this.innerLabel.length
        : this.label.length

      const width = this.inline ? `${inlineLabelSize}ch` : '100%'

      return { width }
    },

    rightIconName() {
      return this.isLoading ? 'loading' : 'chevron-down'
    },

    firstTagLabel() {
      return this.tagLabels[0]
    },

    tagsCountTooltip() {
      return {
        label: this.tagLabels?.map(item => item.label).slice(1).join(', '),
        position: 'top',
      }
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

    modelValue(val, oldVal) {
      const isSameValue = JSON.stringify(val) === JSON.stringify(oldVal)
      if (this.isSearchTextVisible && !isSameValue) {
        if (oldVal?.length && val?.length) {
          this.$nextTick(() => this.$refs.search.focus())
        }
        return
      }

      if (this.isAvatarVisible) {
        this.showAvatar = true
      }
    },

    isAvatarVisible(val) {
      this.showAvatar = val
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
        this.$emit('search', this.searchInputText)
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
          this.$emit('search', '')
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
      const value = this.emitOption ? tag : tag[this.itemValue]
      return value !== undefined ? value : tag
    },
  },
}
</script>
