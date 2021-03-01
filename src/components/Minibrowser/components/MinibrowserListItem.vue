<template>
  <li>
    <component :is="as" class="sb-minibrowser__list-item" @click="handleClick">
      <span class="sb-minibrowser__list-item-icon">
        <SbIcon v-if="isIconVisible" v-bind="iconProps" />
        <slot name="icon" />
      </span>

      <span class="sb-minibrowser__list-item-name"> {{ label }} </span>

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
    isParent: Boolean,
    isEntry: Boolean,
    items: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      required: true,
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
        name: this.isParent ? 'filled-folder' : 'status-circle',
        size: 'small',
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
