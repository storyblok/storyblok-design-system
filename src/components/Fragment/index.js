/**
 * This component is inspired by the Fragment component from chakra-ui-vue library
 * Fragment component to render multiple child sibling nodes in the place of
 * their parent in the DOM. This is a temporary solution to create fragments in Vue 2
 */
const SbFragment = {
  name: 'SbFragment',

  directives: {
    fragment: {
      inserted(el) {
        const fragment = document.createDocumentFragment()
        Array.from(el.childNodes).forEach((child) =>
          fragment.appendChild(child)
        )
        if (el.parentNode) {
          el.parentNode.insertBefore(fragment, el)
          el.parentNode.removeChild(el)
        }
      },
    },
  },

  render(h) {
    return h(
      'div',
      {
        directives: [{ name: 'fragment' }],
      },
      this.$slots.default
    )
  },
}

export default SbFragment
