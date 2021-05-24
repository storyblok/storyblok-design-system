<template>
  <div class="sb-minibrowser__list">
    <SbMiniBrowserListHeader v-if="isInternalTitleVisible" :title="title" />

    <slot name="header" :title="title" />

    <slot name="items" :items="items" />

    <ul v-if="!$scopedSlots.items">
      <SbMiniBrowserListItem
        v-for="(item, key) in items"
        :key="key"
        v-bind="item"
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
    isInternalTitleVisible() {
      return this.title && !this.$scopedSlots.header
    },
  },
}
</script>
