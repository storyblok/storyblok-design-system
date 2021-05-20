<template>
  <li class="sb-minibrowser__list-item">
    <component
      :is="as"
      class="sb-minibrowser__list-item-name"
      @click="handleClick"
    >
      <SbIcon v-if="!isList" v-bind="iconProps" />

      <span> {{ label }} </span>
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
    value: {
      required: false,
    },
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
        name: this.isParent ? 'folder' : 'status-circle',
        size: 'small',
        color: this.isParent ? 'primary-dark' : 'primary',
      }
    },
  },

  methods: {
    handleClick() {
      this.context.selectItem({
        ...this.$props,
      })
    },
  },
}
</script>
