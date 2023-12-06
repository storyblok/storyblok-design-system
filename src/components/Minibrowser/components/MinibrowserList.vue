<template>
  <div class="sb-minibrowser__list">
    <SbMiniBrowserListHeader
      v-if="isInternalTitleVisible"
      :title="title"
      :data-testid="`${dataTestid}-header`"
    />

    <slot name="header" :title="title" />

    <slot name="items" :items="items" />

    <ul v-if="!$slots.items">
      <SbMiniBrowserListItem
        v-for="(item, key) in items"
        :key="key"
        v-bind="{
          ...item,
          modelValue: item.value,
        }"
        :data-testid="`${dataTestid}-item-${key}`"
      />
    </ul>
  </div>
</template>

<script>
import SbMiniBrowserListItem from './MinibrowserListItem'
import SbMiniBrowserListHeader from './MinibrowserListHeader'

export default {
  name: 'SbMinibrowserList',

  components: {
    SbMiniBrowserListItem,
    SbMiniBrowserListHeader,
  },

  props: {
    items: {
      type: Array,
      required: true,
    },
    group: Boolean,
    title: {
      type: String,
      default: null,
    },
  },

  computed: {
    dataTestid() {
      return this.$attrs['data-testid'] || 'sb-mini-browser-list'
    },

    isInternalTitleVisible() {
      return this.title && !this.$slots.header
    },
  },
}
</script>
