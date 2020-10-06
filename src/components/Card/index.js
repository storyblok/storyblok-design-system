import './card.scss'
import { capitalize } from '../../utils'
import SbLink from '../Link'
import SbIcon from '../Icon'
// import SbLoading from '../Loading'

// @vue/component
const SbCardHeader = {
  name: 'SbCardHeader',

  render (h) {
    const renderTitle = () => {
      if (this.$slots.default) {
        return h('span', {
          staticClass: 'sb-card--title'
        },
        [capitalize(this.$slots.default[0].text.trim())]
        )
      }
      return null
    }
    return this.$slots.default[0].text.trim().split('').length ? renderTitle() : null
  }
}

// @vue/component
const SbCardFooter = {
  name: 'SbCardFooter',

  props: {
    url: {
      type: String,
      default: null
    },
    linkLabel: {
      type: String,
      default: null
    }
  },

  render (h) {
    const renderLink = () => {
      if (this.url) {
        return h(SbLink, {
          props: {
            label: capitalize(this.linkLabel || 'label'),
            href: this.url,
            title: `Link to ${capitalize(this.linkLabel || 'label')}.`,
            type: 'primary',
            iconRight: 'chevron-right'
          }
        })
      }
    }
    return renderLink()
  }
}

// @vue/component
const SbCardContent = {
  name: 'SbCardContent',

  props: {
    isLoading: {
      type: Boolean
    }
  },

  render (h) {
    const renderLoading = () => {
      return h(SbIcon, {
        staticClass: 'sb-card--loading',
        props: {
          name: 'loading',
          size: 'x-large',
          color: 'primary'
        }
      })
      // return h(SbLoading, {
      //   props: {
      //     type: 'spinner',
      //     size: 'small',
      //   }
      // })
    }

    const renderCardContent = () => {
      return h('div', {
        staticClass: 'sb-card--content',
        class: {
          'sb-card--no-content': !this.$slots.default || this.isLoading
        }
      },
      [
        this.isLoading ? renderLoading() : this.$slots.default
      ])
    }

    return renderCardContent()
  }
}

// @vue/component
const SbCardOptions = {
  name: 'SbCardOptions',

  render (h) {
    const renderOptions = () => {
      return h(SbIcon, {
        class: 'sb-card--option',
        props: {
          name: 'overflow-menu-vertic',
          size: 'small'
        }
      })
    }

    return renderOptions()
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
    isFullWidth: {
      type: Boolean
    },
    isThin: {
      type: Boolean
    }
  },

  render (h) {
    const renderCard = () => {
      return h('div', {
        staticClass: 'sb-card',
        class: {
          'sb-card--full-width': this.isFullWidth,
          'sb-card--no-labels': this.isThin
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
  SbCardOptions,
  SbCardFooter,
  SbCardContent
}
