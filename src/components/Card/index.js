import './card.scss'

import { SbMenu, SbMenuButton, SbMenuList } from '../Menu'
import SbLoading from '../Loading'

// @vue/component
const SbCardHeader = {
  name: 'SbCardHeader',

  props: {
    as: {
      type: String,
      default: 'span',
    },
    options: {
      type: Array,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
  },

  render(h) {
    const renderTitle = () => {
      if (this.title) {
        return h(
          this.as,
          {
            staticClass: 'sb-card__title',
          },
          this.title
        )
      }

      return this.$slots.default
    }

    return h(
      'div',
      {
        staticClass: 'sb-card__header',
        attrs: {
          ...this.$attrs,
        },
      },
      [
        renderTitle(),
        this.options &&
          h(SbCardOptions, {
            props: {
              options: this.options,
            },
          }),
      ]
    )
  },
}

// @vue/component
const SbCardOptions = {
  name: 'SbCardOptions',

  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },

  render(h) {
    return h(
      'div',
      {
        staticClass: 'sb-card__options',
      },
      [
        h(SbMenu, [
          h(SbMenuButton, {
            props: {
              iconName: 'menu-horizontal',
              hasIconOnly: true,
              variant: 'tertiary',
            },
          }),
          h(SbMenuList, {
            props: {
              items: this.options,
              placement: 'bottom-end',
            },
          }),
        ]),
      ]
    )
  },
}

// @vue/component
const SbCardFooter = {
  name: 'SbCardFooter',

  render(h) {
    return h(
      'div',
      {
        staticClass: 'sb-card__footer',
      },
      this.$slots.default
    )
  },
}

// @vue/component
const SbCardContent = {
  name: 'SbCardContent',

  inject: ['cardContext'],

  computed: {
    context() {
      return this.cardContext()
    },

    isLoading() {
      return this.context.isLoading
    },
  },

  render(h) {
    return h(
      'div',
      {
        staticClass: 'sb-card__content',
      },
      [
        this.$slots.default,

        this.isLoading &&
          h(
            'div',
            {
              staticClass: 'sb-card__loading',
            },
            [
              h(SbLoading, {
                props: {
                  size: 'x-large',
                  color: 'primary',
                },
              }),
            ]
          ),
      ]
    )
  },
}

/**
 * @vue/component
 *
 * SbCard component
 *
 * SbCard is a component to used to divide content elements on page.
 */

const SbCard = {
  name: 'SbCard',

  provide() {
    return {
      cardContext: () => this.cardContext,
    }
  },

  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    cardContext() {
      return {
        // states
        isLoading: this.isLoading,
      }
    },
  },

  render(h) {
    return h(
      'div',
      {
        staticClass: 'sb-card',
        class: {
          'sb-card--loading': this.isLoading,
        },
      },
      this.$slots.default
    )
  },
}

export { SbCard, SbCardHeader, SbCardOptions, SbCardFooter, SbCardContent }
