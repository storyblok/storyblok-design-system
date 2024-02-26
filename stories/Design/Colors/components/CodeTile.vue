<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  palette: {
    type: Object,
    default: null,
  },
  colorName: {
    type: String,
    default: '',
  },
})

const calculatedCode = computed(() => {
  let codeString = ''

  Object.keys(props.palette).forEach((colorName) => {
    const colorValue = props.palette[colorName]

    codeString += `$${props.colorName}-${colorName}: ${colorValue};\n`
  })

  return codeString
})
</script>

<template>
  <pre><code>
{{ calculatedCode }}
</code></pre>
</template>
