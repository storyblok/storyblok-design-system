<template>
  <div class="sb-select">
    <SbSelectInner
      :label="label"
      :value="value"
      @click="handleSelectInnerClick"
    />

    <SbSelectList
      v-if="isOpen"
      :value="value"
      :inner-select-element="innerSelectElement"
      :options="options"
      @emit-value="handleEmitValue"
    />
  </div>
</template>

<script>
import SbSelectInner from './components/SelectInner'
import SbSelectList from './components/SelectList'

export default {
  name: 'SbSelect',

  components: {
    SbSelectInner,
    SbSelectList
  },

  props: {
    // component props
    value: {
      type: [String, Number],
      default: null
    },

    // inner props
    label: {
      type: String,
      default: '',
      required: true
    },

    // list props
    options: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  data: () => ({
    isOpen: false
  }),

  methods: {
    /**
     * shows the items list
     */
    show () {
      this.isOpen = true
      this.$emit('show')
    },

    /**
     * hides the items list
     */
    hide () {
      this.isOpen = false
      this.$emit('hide')
    },

    /**
     * shows or hides the items list according to internal state
     */
    handleSelectInnerClick () {
      if (this.isOpen) {
        this.hide()
      } else {
        this.show()
      }
    },

    /**
     * emits the input event to make this component compatible with v-model directive
     */
    handleEmitValue (value) {
      this.$emit('input', value)
      this.isOpen = false
    }
  }
}
</script>
