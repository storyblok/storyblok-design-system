<script lang="ts" setup>
import { colord, extend } from 'colord'
import a11yPlugin from 'colord/plugins/a11y'
import { computed } from 'vue'

extend([a11yPlugin])

const props = defineProps({
  rowColor: {
    type: Object,
    required: true,
  },
  colColor: {
    type: Object,
    required: true,
  },
})

const rdata = computed(() => {
  return {
    ratio: colord(props.rowColor.hex).contrast(props.colColor.hex),
    AA: getLabel(
      colord(props.rowColor.hex).isReadable(props.colColor.hex, {
        level: 'AA',
      }),
    ),
    AAA: getLabel(
      colord(props.rowColor.hex).isReadable(props.colColor.hex, {
        level: 'AAA',
      }),
    ),
    AALarge: getLabel(
      colord(props.rowColor.hex).isReadable(props.colColor.hex, {
        level: 'AA',
        size: 'large',
      }),
    ),
    AAALarge: getLabel(
      colord(props.rowColor.hex).isReadable(props.colColor.hex, {
        level: 'AAA',
        size: 'large',
      }),
    ),
  }
})

const getLabel = (isPassing: boolean): string => {
  return isPassing ? '✔' : 'X'
}

const isRatioPassing = computed(() => {
  return rdata.value.ratio > 4.5 ? '✅' : ''
})
</script>

<template>
  <div class="result">
    <ul v-if="rdata.ratio">
      <li>{{ isRatioPassing }} ratio: {{ rdata.ratio }}</li>
      <li class="AA" :class="rdata.AA">AA: {{ rdata.AA }}</li>
      <li class="AALarge" :class="rdata.AALarge">
        AALarge: {{ rdata.AALarge }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
ul {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.result {
  padding: 2px;
}
</style>
