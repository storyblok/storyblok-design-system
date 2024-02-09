<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  colorName: {
    type: String,
    default: null,
  },
  colorValue: {
    type: String,
    default: null,
  },
  isBigger: {
    type: Boolean,
    default: false,
  },
})

const shouldShow = computed(() => {
  return Number(props.colorName) > 0 && Number(props.colorName) < 1000
})
</script>

<template>
  <div v-if="shouldShow" class="color-tile">
    <div
      class="color-tile__color"
      :style="{ backgroundColor: colorValue }"
      :class="{
        'color-tile__color--bigger': isBigger,
      }"
    />
    <span>{{ colorName }}</span>
    <span>{{ colorValue }}</span>
  </div>
</template>

<style lang="scss" scoped>
.sb-color-pallete {
  margin-bottom: $s-4;
}

.color-tile__color {
  display: inline-block;
  min-height: 100px;
  margin: 0 0 4px;
  padding: 0;
  border-radius: $base-border-radius;

  &--bigger {
    min-height: 120px;
  }
}

.color-tile {
  display: inline-grid;
  flex: 0 0 70px;
  margin-bottom: 20px;
  color: $text-gray-light;
  font-size: $font-14;
}
</style>
