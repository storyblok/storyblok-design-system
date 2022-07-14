/**
 * SbDataTableInput
 *
 * Render a input checkbox
 */
import { h } from 'vue'

export const SbDataTableInput = {
  props: {
    disable: {
      type: Boolean,
      default: false,
    },
    falseValue: {
      type: Boolean,
      default: false,
    },
    indeterminateValue: {
      default: null,
    },
    toggleIndeterminate: {
      type: Boolean,
    },
    trueValue: {
      type: Boolean,
      default: true,
    },
    value: {
      default: null,
    },
  },

  computed: {
    isTrue() {
      return this.value === this.trueValue
    },

    isFalse() {
      return this.value === this.falseValue
    },

    innerClass() {
      const state =
        this.isTrue === true
          ? 'truthy'
          : this.isFalse === true
          ? 'falsy'
          : 'indet'
      return `sb-input-checkbox__inner--${state}`
    },

    formAttrs() {
      const prop = { type: 'checkbox' }

      this.name &&
        Object.assign(prop, {
          checked: this.isTrue,
          name: this.name,
          value: this.trueValue,
        })

      return prop
    },
  },

  methods: {
    getNextValue() {
      if (this.isTrue && !this.toggleIndeterminate) {
        return this.falseValue
      } else if (this.isFalse && !this.toggleIndeterminate) {
        return this.trueValue
      }

      return this.indeterminateValue
    },

    handleKeydown(e) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        this.stopAndPrevent(e)
      }
    },

    handleKeyup(e) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        this.toggle(e)
      }
    },

    stopAndPrevent(e) {
      e.cancelable && e.preventDefault()
      e.stopPropagation()
    },

    toggle(e) {
      if (e) {
        this.stopAndPrevent(e)
      }

      if (!this.disable) {
        this.$emit('click', this.getNextValue(), e)
      }
    },
  },

  render() {
    const renderInputCheckbox = () => {
      return [
        h(
          'div',
          {
            staticClass: 'sb-input-checkbox__bg',
          },
          [
            h(
              'svg',
              {
                staticClass: 'sb-input-checkbox__svg',
                attrs: {
                  focusable: 'false',
                  viewBox: '0 0 24 24',
                },
              },
              [
                h('path', {
                  staticClass: 'sb-input-checkbox__truthy',
                  attrs: {
                    fill: 'none',
                    d: 'M1.73,12.91 8.1,19.28 22.79,4.59',
                  },
                }),

                h('path', {
                  staticClass: 'sb-input-checkbox__indet',
                  attrs: {
                    d: 'M5,14H18V10H5',
                  },
                }),
              ]
            ),
          ]
        ),
      ]
    }

    const inner = renderInputCheckbox(h)

    !this.disable &&
      inner.unshift(
        h('input', {
          staticClass: 'hidden',
          class: 'sb-input-checkbox__native',
          attrs: this.formAttrs,
        })
      )

    const children = [
      h(
        'div',
        {
          staticClass: 'sb-input-checkbox__inner',
          class: [this.innerClass, this.disable ? ' disabled' : ''],
        },
        inner
      ),
    ]

    return h(
      'div',
      {
        staticClass: 'sb-input-checkbox',
        on: {
          click: this.toggle,
          keydown: this.handleKeydown,
          keyup: this.handleKeyup,
        },
      },
      children
    )
  },
}
