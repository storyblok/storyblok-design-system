<template>
  <li>
    <component
      :is="as"
      class="sb-minibrowser__list-item"
      :class="{
        'sb-minibrowser__list-item--active': isActive,
        'sb-minibrowser__list-item--disabled': isDisabled,
      }"
      @click="handleClick"
    >
      <span class="sb-minibrowser__list-item-icon">
        <SbIcon v-if="isIconVisible" v-bind="iconProps" />
        <slot name="icon" />
      </span>

      <div class="sb-minibrowser__list-item-container">
        <span class="sb-minibrowser__list-item-name"> {{ label }} </span>

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

export default {
  name: 'SbMinibrowserListItem',

  components: {
    SbIcon,
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
    value: {
      type: [String, Number],
      default: null,
    },
  },

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
  },

  methods: {
    handleClick() {
      const payload = {
        ...this.$props,
      }

      this.$emit('select', payload)
      this.context.selectItem(payload)
    },
  },
}
</script>
