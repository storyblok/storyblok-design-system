<template>
  <ul v-if="items.length">
    <li v-for="item in items" :key="item.label">
      <SbMenuSeparator v-if="item.separator" />
      <SbMenuGroup
        v-else-if="item.group && item.group.title"
        :title="item.group.title"
      >
        <SbMenuListItems :items="item.group.items" />
      </SbMenuGroup>
      <SbMenuItem v-else v-bind="item" />
    </li>
  </ul>
</template>

<script lang="ts">
import SbMenuItem from './MenuItem'
import SbMenuSeparator from './MenuSeparator'
import SbMenuGroup from './MenuGroup'

export default {
  name: 'SbMenuListItems',

  components: {
    SbMenuItem,
    SbMenuSeparator,
    SbMenuGroup,
  },

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
