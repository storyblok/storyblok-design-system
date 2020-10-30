<template>
  <div
    class="sb-select-inner"
    :class="{
      'sb-select-inner--with-value': hasValue,
    }"
    v-on="$listeners"
  >
    <SbIcon
      v-if="leftIcon"
      class="sb-select-inner__icon-left"
      :name="leftIcon"
      size="small"
    />

    <div v-if="isTagsVisible" class="sb-select-inner__tags">
      <SbTag
        v-for="(tagLabel, key) in tagLabels"
        :key="key"
        :label="tagLabel"
        closable
        @close="removeItem($event, tagLabel)"
      />
    </div>

    <span v-if="isInnerLabelVisible" class="sb-select-inner__label">
      {{ innerLabel }}
    </span>

    <div v-if="isAvatarVisible" class="sb-select-inner__avatar">
      <SbAvatar
        :src="avatarData.src"
        :name="avatarData.label"
        show-name
        size="small"
      />
    </div>

    <div class="sb-select-inner__icons">
      <button
        v-if="isTagsVisible"
        aria-label="Clear all values"
        class="sb-select-inner__clear"
        @click="clearAllValues"
      >
        <SbIcon name="close" size="small" />
      </button>

      <SbIcon name="chevron-down" size="small" color="primary-dark" />
    </div>
  </div>
</template>

<script>
import { isArray } from '../../../utils'
import SbIcon from '../../Icon'
import SbTag from '../../Tag'
import SbAvatar from '../../Avatar'

export default {
  name: 'SbSelectInner',

  components: { SbIcon, SbTag, SbAvatar },

  props: {
    label: {
      type: String,
      default: '',
    },

    leftIcon: {
      type: String,
      default: null,
    },

    multiple: Boolean,

    value: {
      type: [String, Number, Array],
      default: null,
    },
    options: {
      type: Array,
      default: () => [],
    },

    useAvatars: Boolean,
  },

  computed: {
    hasValue() {
      if (this.multiple || isArray(this.value)) {
        return this.value.length > 0
      }

      return this.value !== null
    },

    innerLabel() {
      if (!this.hasValue) {
        return this.label
      }

      return this.value
    },

    isTagsVisible() {
      return this.hasValue && this.multiple
    },

    tagLabels() {
      if (!this.hasValue) {
        return []
      }

      return this.multiple ? this.value : []
    },

    isAvatarVisible() {
      return this.hasValue && this.useAvatars
    },

    isInnerLabelVisible() {
      return !this.isTagsVisible && !this.isAvatarVisible
    },

    avatarData() {
      return this.options.find((option) => {
        return option.value === this.value
      })
    },
  },

  methods: {
    clearAllValues(event) {
      event.stopPropagation()
      event.preventDefault()
      this.$emit('clear-all-values')
    },
    removeItem(event, tagValue) {
      event.stopPropagation()
      event.preventDefault()
      this.$emit('remove-item-value', tagValue)
    },
  },
}
</script>
