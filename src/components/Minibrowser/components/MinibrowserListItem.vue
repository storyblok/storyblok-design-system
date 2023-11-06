<template>
  <li>
    <component
      :is="as"
      :to="to"
      :tabindex="isFocusable"
      class="sb-minibrowser__list-item"
      :class="{
        'sb-minibrowser__list-item--active': isActive,
        'sb-minibrowser__list-item--disabled': isDisabled,
      }"
      @click="handleClick"
      @keyup.enter="handleClick"
    >
      <span class="sb-minibrowser__list-item-icon">
        <SbIcon v-if="isIconVisible" v-bind="iconProps" />
        <slot name="icon" />
      </span>

      <div class="sb-minibrowser__list-item-container">
        <div class="sb-minibrowser__list-item-name">
          {{ label }}
          <slot name="meta-icon" />
          <SbIcon
            v-if="isStartpage"
            v-tooltip="{ label: 'Homepage' }"
            name="home"
            size="small"
            class="sb-minibrowser__list-item-icon-home"
          />
        </div>

        <span v-if="subtitle" class="sb-minibrowser__list-item-subtitle">
          {{ subtitle }}
        </span>
      </div>

      <slot />
    </component>
  </li>
</template>

<script>
import SbIcon from '../../Icon'
import { Tooltip } from '../../../directives'

export default {
  name: 'SbMinibrowserListItem',

  components: { SbIcon },

  directives: {
    tooltip: Tooltip,
  },

  inject: ['browserContext'],

  props: {
    as: {
      type: String,
      default: 'a',
    },
    isActive: Boolean,
    isParent: Boolean,
    isEntry: Boolean,
    isDisabled: Boolean,
    isStartpage: Boolean,
    items: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: null,
    },
    modelValue: {
      type: [String, Number],
      default: null,
    },
    to: {
      type: Object,
      default: null,
    },
  },

  emits: ['select'],

  computed: {
    context() {
      return this.browserContext()
    },

    isList() {
      return this.context.isList || false
    },

    iconProps() {
      return {
        name: this.isParent ? 'folder-fill' : 'status',
        color: this.isParent ? 'primary-dark' : 'primary',
      }
    },

    isIconVisible() {
      return !this.isList && !this.$slots.icon
    },

    isFocusable() {
      return this.as === 'a' ? 0 : -1
    },
  },

  methods: {
    handleClick() {
      const payload = {
        label: this.label,
        subtitle: this.subtitle,
        isParent: this.isParent,
        value: this.modelValue,
      }

      this.$emit('select', payload)
      this.context.selectItem(payload)
    },
  },
}
</script>
