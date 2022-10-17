<template>
  <div class="sb-block-ui" v-bind="$attrs" v-on="$listeners">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'SbBlockUi',
}
</script>
