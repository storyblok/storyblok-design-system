<script lang="ts" setup>
import ColorTile from './ColorTile.vue'
import CodeTile from './CodeTile.vue'
import { mainColorValues } from '../constants'

const props = defineProps({
  palette: {
    type: Object,
    required: true,
  },
  colorName: {
    type: String,
    default: '',
  },
})

const isMainValue = (colorValue: number) => {
  return +colorValue === +mainColorValues[props.colorName]
}
</script>

<template>
  <section>
    <h2 class="color-title">{{ colorName }}</h2>
    <div class="palette">
      <ColorTile
        v-for="(value, key) in palette"
        :key="key"
        :color-name="key"
        :color-value="value"
        :is-bigger="isMainValue(key)"
      />
    </div>
    <CodeTile :palette="palette" :color-name="colorName" />
  </section>
</template>

<style lang="scss">
.palette {
  display: flex;
  gap: 8px;
  align-items: flex-end;
  width: 100%;
}

.color-title {
  margin-bottom: $s-4;
  margin-top: $s-8;
  font-size: $font-18;
  text-transform: capitalize;
}
</style>
