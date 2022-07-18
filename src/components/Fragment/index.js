import { Fragment } from 'vue-fragment'
import { h } from 'vue'

/**
 * This wrapper component to vue-fragment library
 */
const SbFragment = {
  name: 'SbFragment',

  components: { Fragment },

  render() {
    return h('Fragment', this.$slots?.default())
  },
}

export default SbFragment
