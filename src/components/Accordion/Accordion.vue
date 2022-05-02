<template>
  <div class="accordion" :class="computedClass">
    <button
      class="accordion__button"
      :aria-expanded="isOpen"
      :aria-controls="`collapse${_uid}`"
      @click="toggleAccordion"
    >
      <SbIcon :name="chevronIvon" />
      <p class="accordion__title">{{ title }}</p>

      <SbIcon
        v-if="icon"
        v-tooltip="{ label: iconDescription }"
        :name="icon"
        class="accordion__icon"
        @click="$emit('icon-click')"
      />
    </button>

    <div v-show="isOpen" :id="`collapse${_uid}`" class="accordion__content">
      <slot />
    </div>
  </div>
</template>

<script>
import SbIcon from '../Icon'

export default {
  name: 'SbAccordion',
  components: {
    SbIcon,
  },
  props: {
    icon: {
      type: String,
      default: null,
    },
    iconDescription: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: null,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    chevronIvon() {
      return this.isOpen ? 'chevron-down' : 'chevron-right'
    },
    computedClass() {
      return {
        'accordion--open': this.isOpen,
      }
    },
  },
  methods: {
    toggleAccordion() {
      this.isOpen = !this.isOpen
      this.$emit('toggle-open', this.isOpen)
    },
  },
}
</script>
