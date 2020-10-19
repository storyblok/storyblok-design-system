import './card.scss'

// @vue/component
const SbCardHeader = {
  name: 'SbCardHeader',

  props: {
    as: {
      type: String,
      default: 'span'
    },
    title: {
      type: String,
      default: null
    }
  },

  render (h) {
    const renderTitle = () => {
      if (this.title) {
        return h(this.as, {
          staticClass: 'sb-card__title'
        }, this.title)
      }

      return this.$slots.default
    }

    return h('div', {
      staticClass: 'sb-card__header',
      attrs: {
        ...this.$attrs
      }
    }, [
      renderTitle()
    ])
  }
}

// @vue/component
const SbCardFooter = {
  name: 'SbCardFooter',

  render (h) {
    return h('div', {
      staticClass: 'sb-card__footer'
    }, this.$slots.default)
  }
}

// @vue/component
const SbCardContent = {
  name: 'SbCardContent',

  render (h) {
    return h('div', {
      staticClass: 'sb-card__content'
    }, this.$slots.default)
  }
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

  props: {
    isFullWidth: Boolean
  },

  render (h) {
    const renderCard = () => {
      return h('div', {
        staticClass: 'sb-card',
        class: {
          'sb-card--full-width': this.isFullWidth
        }
      },
      [
        this.$slots.default
      ])
    }

    return renderCard()
  }
}

export {
  SbCard,
  SbCardHeader,
  SbCardFooter,
  SbCardContent
}
