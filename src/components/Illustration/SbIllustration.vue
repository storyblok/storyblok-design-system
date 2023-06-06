<template>
  <div v-if="src && src.length" class="sb-illustration" :style="computedStyle">
    <img class="sb-illustration__image" :src="src" :alt="alt" />
    <slot />
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'SbIllustration',
  props: {
    src: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '120px',
    },
  },
  setup(props) {
    const computedStyle = computed(() => {
      return {
        maxWidth: props.width,
      }
    })

    return {
      computedStyle,
    }
  },
}
</script>
