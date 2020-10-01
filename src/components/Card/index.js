import './card.scss'
import { capitalize } from '../../utils'
import SbLink from '../Link'
import SbIcon from '../Icon'
// import SbLoading from '../Loading'

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
    title: {
      type: String,
      default: null
    },
    linkLabel: {
      type: String,
      default: null
    },
    url: {
      type: String,
      default: null
    },
    isLoading: {
      type: Boolean
    },
    options: {
      type: Array,
      default: () => []
    },
    isFullWidth: {
      type: Boolean
    }
  },

  render (h) {
    const renderTitle = () => {
      if (this.title) {
        return h('span', {
          staticClass: 'sb-card--title'
        },
        [capitalize(this.title)])
      }
      return null
    }

    const renderOptions = () => {
      if (this.options.length) {
        return h(SbIcon, {
          class: 'sb-card--option',
          props: {
            name: 'overflow-menu-vertic',
            size: 'small'
          }
        })
      }
    }

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

    const renderCard = () => {
      return h('div', {
        staticClass: 'sb-card',
        class: {
          'sb-card--full-width': this.isFullWidth,
          'sb-card--no-labels': (!this.title && !this.options.length)
        }
      },
      [
        renderTitle(),
        renderOptions(),
        renderCardContent(),
        renderLink()
      ])
    }

    return renderCard()
  }
}

export default SbCard
