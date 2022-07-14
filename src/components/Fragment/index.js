import { Fragment } from 'vue-fragment'

/**
 * This wrapper component to vue-fragment library
 */
const SbFragment = {
  name: 'SbFragment',

  components: { Fragment },

  render(h) {
    return h('Fragment', this.$slots.default())
  },
}

export default SbFragment
