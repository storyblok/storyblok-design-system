import { debounce } from 'throttle-debounce'

/**
 * @type {Object}
 */
const DEFAULT_BREAKPOINTS = {
  MOBILE: 480,
  TABLET: 768,
  DESKTOP: 880,
}

/**
 * @typedef {{MOBILE: number, TABLET: number, DESKTOP: number}} BreakpointsEnum
 *
 * @typedef {Object} FnOptions
 * @property {BreakpointsEnum} breakpoints - indicates the breakpoints to use
 * @property {Number} debounce - number in milisseconds to debounce function
 *
 * @method WindowResizeObserverMixin
 * @param  {FnOptions} options
 * @return {Vue.Component}
 */
const WindowResizeObserverMixin = (options = {}) => {
  const debounceFunction = options.debounce || 300

  // @vue/component
  return {
    data: () => ({
      windowWidth: null,
      $_handleResizeFn: null,
    }),

    computed: {
      breakpoints() {
        const BREAKPOINTS = {
          ...DEFAULT_BREAKPOINTS,
          ...options.breakpoints,
        }

        if (this.hideLabelActionsBreakpoint) {
          return {
            ...BREAKPOINTS,
            DESKTOP: this.hideLabelActionsBreakpoint,
          }
        }

        return BREAKPOINTS
      },

      isOnMobile() {
        return this.windowWidth <= this.breakpoints.MOBILE
      },

      isOnTablet() {
        return (
          this.windowWidth > this.breakpoints.MOBILE &&
          this.windowWidth <= this.breakpoints.DESKTOP
        )
      },

      isOnDesktop() {
        return this.windowWidth > this.breakpoints.DESKTOP
      },

      isOnMobileOrTablet() {
        return this.isOnMobile || this.isOnTablet
      },

      isOnTabletOrDesktop() {
        return this.isOnTablet || this.isOnDesktop
      },
    },

    created() {
      this.$_registerHandleResizeFn()
    },

    destroyed() {
      window.removeEventListener('resize', this.$_handleResizeFn)
    },

    methods: {
      /**
       * update the windowWidth property with the window width
       */
      $_updateWindowWidth() {
        this.windowWidth = window.innerWidth
      },

      /**
       * register a handler to resize event
       */
      $_registerHandleResizeFn() {
        this.$_handleResizeFn = debounce(debounceFunction, () => {
          this.$_updateWindowWidth()
        })

        window.addEventListener('resize', this.$_handleResizeFn)

        this.$_updateWindowWidth()
      },
    },
  }
}

export default WindowResizeObserverMixin
