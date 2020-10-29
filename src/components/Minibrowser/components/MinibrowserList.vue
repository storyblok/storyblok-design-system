<template>
  <div class="sb-minibrowser__list">
    <p v-if="title" class="sb-minibrowser__list-title">
      <SbIcon name="chevron-down" size="small" />

      <span>{{ title }}</span>
    </p>

    <ul>
      <SbMiniBrowserListItem
        v-for="(item, key) in items"
        :key="key"
        v-bind="item"
      />
    </ul>
  </div>
</template>

<script>
import SbIcon from '../../Icon'
import SbMiniBrowserListItem from './MinibrowserListItem'

export default {
  name: 'SbMinibrowserList',

  components: {
    SbIcon,
    SbMiniBrowserListItem,
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
}
</script>
