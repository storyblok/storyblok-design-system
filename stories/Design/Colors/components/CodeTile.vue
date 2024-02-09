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

<style lang="scss" scoped>
pre {
  display: block;
  max-width: 300px;
  padding: 8px;
  padding-left: 30px;
  color: $text-white;
  font-size: 1.2rem;
  background: $bg-dark-blue;
  border-radius: $base-border-radius;
}

code {
  display: inline-block;
  margin: 0;
  line-height: 1.45;
}
</style>
