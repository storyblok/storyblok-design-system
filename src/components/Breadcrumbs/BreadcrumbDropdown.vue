<template>
  <li class="sb-breadcrumbs__item">
    ...
    <ul v-if="active" class="sb-breadcrumbs__dropdown">
      <SbBreadcrumbItem v-for="item in items" v-bind="item" :key="item.label" />
    </ul>
  </li>
</template>

<script>
export default {
  name: 'SbBreadcrumbDropdown',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    active: Boolean,
  },
}
</script>

<style lang="scss">
.sb-breadcrumbs__dropdown {
  @include generalBoxShadow();

  position: absolute;
  left: 0;
  top: calc(100% + 10px);
  display: block;
  margin: 0;
  padding: 9px 0;

  .sb-breadcrumbs__item {
    display: block;
    font-size: $font-14;
    text-decoration: none;
  }

  .sb-breadcrumbs__item a {
    display: block;
    padding: 6px 15px;
    text-decoration: none;

    &:hover {
      background-color: $light-50;
    }
  }

  .sb-breadcrumbs__item:last-child {
    margin-bottom: 0;
  }
}
</style>
