<script>
import {
  SbBreadcrumbs,
  SbBreadcrumbItem,
  SbBreadcrumbSeparator
} from '../../Breadcrumbs'

export default {
  name: 'SbMinibrowserBreadcrumbs',

  inject: ['browserContext'],

  props: {
    items: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    context () {
      return this.browserContext()
    },

    breadcrumbItems () {
      return this.items.map(navItem => {
        return {
          label: navItem.label,
          href: navItem.label,
          title: navItem.label
        }
      })
    },

    lastIndex () {
      return this.breadcrumbItems.length - 1
    }
  },

  methods: {
    /**
     * fires the clearNavigation method in the SbMinibrowser component
     */
    clearNavigation () {
      this.context.clearNavigation()
    },

    /**
     * fires the navigateTo method in the SbMinibrowser component
     * @param {Number} index
     */
    navigateTo (index = 0) {
      this.context.navigateTo(index)
    }
  },

  render (h) {
    return h('div', {
      staticClass: 'sb-minibrowser__breadcrumbs'
    }, [
      h(SbBreadcrumbs, [
        h(SbBreadcrumbItem, {
          props: {
            label: 'Global'
          },
          on: {
            click: this.clearNavigation
          }
        }),

        h(SbBreadcrumbSeparator),

        ...this.breadcrumbItems.reduce((acc, item, index) => {
          acc.push(
            h(SbBreadcrumbItem, {
              props: {
                ...item,
                isActive: index === this.lastIndex
              },
              on: {
                click: (event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  this.navigateTo(index)
                }
              }
            })
          )

          if (index < this.lastIndex) {
            acc.push(
              h(SbBreadcrumbSeparator)
            )
          }

          return acc
        }, [])
      ])
    ])
  }
}
</script>
