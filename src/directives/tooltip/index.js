import { createPopper } from '@popperjs/core/lib/popper-lite'
import {
  flip,
  offset,
  preventOverflow,
  arrow,
} from '@popperjs/core/lib/modifiers'

import { randomString, includes } from '../../utils'

import { availablePositions } from '../../components/Tooltip/lib'

const DEFAULTS = {
  VARIANT: 'dark',
  POSITION: 'top',
  OFFSET: [0, 10],
  SHOW: true,
  TEXT_ALIGN: 'center',
  IS_FULL_LENGTH: false,
}

/**
 * @function getLabel
 * @param    {Object} binding
 * @return   {String}
 */
function getLabel(binding) {
  const { value } = binding

  if (typeof value === 'string') {
    return value
  }

  if (typeof value.label === 'string') {
    return value.label
  }

  return ''
}

/**
 * @function getOptions
 * @param    {Object} binding
 * @return   {TooltipOptions}
 */
function getOptions(binding) {
  const { value } = binding

  if (typeof value === 'string') {
    return {
      offset: DEFAULTS.OFFSET,
      placement: DEFAULTS.POSITION,
      show: DEFAULTS.SHOW,
      textAlign: DEFAULTS.TEXT_ALIGN,
      variant: DEFAULTS.VARIANT,
      isFullLength: DEFAULTS.IS_FULL_LENGTH,
    }
  }

  return {
    offset: value.offset || DEFAULTS.OFFSET,
    placement: value.position || DEFAULTS.POSITION,
    show: typeof value.show === 'undefined' ? DEFAULTS.SHOW : value.show,
    textAlign: value.textAlign || DEFAULTS.TEXT_ALIGN,
    variant: value.variant || DEFAULTS.VARIANT,
    isFullLength: value.isFullLength || DEFAULTS.IS_FULL_LENGTH,
  }
}

/**
 * @function createPopperInstance
 * @param {HTMLElement} el tooltip target element
 * @param {HTMLElement} popover tooltip element
 * @param {TooltipOptions} options tooltip options
 * @returns {HTMLElement}
 */
function createPopperInstance(el, popover, options = {}) {
  return createPopper(el, popover, {
    placement: options.placement,
    modifiers: [
      flip,
      preventOverflow,
      offset,
      {
        name: 'offset',
        options: {
          offset: options.offset,
        },
      },
      arrow,
    ],
  })
}

/**
 * @function createTooltip
 * @param {String} label
 * @param {TooltipOptions} options
 * @returns {HTMLElement}
 */
function createTooltip(label, options) {
  const tooltipEl = document.createElement('div')
  tooltipEl.innerText = label
  tooltipEl.style.display = 'unset'
  tooltipEl.style.zIndex = 5
  tooltipEl.style.maxWidth = options.isFullLength ? '100%' : '180px'
  tooltipEl.className = `sb-tooltip sb-tooltip--${options.variant} sb-tooltip--text--${options.textAlign}`
  tooltipEl.setAttribute('role', 'tooltip')

  const arrowElement = document.createElement('div')
  arrowElement.setAttribute('data-popper-arrow', true)
  arrowElement.setAttribute('role', 'presentation')

  tooltipEl.appendChild(arrowElement)

  document.body.appendChild(tooltipEl)

  return tooltipEl
}

/**
 * @function cleanup
 * @param {HTMLElement} el the binded element
 */
function cleanup(el) {
  el.__tooltip.tooltipEl.remove()
  el.__tooltip.popperInstance.destroy()
  el.__tooltip.popperInstance = null
}

/**
 * @function validateBinding
 * @param   {Object} binding
 * @returns {Boolean}
 */
function validateBinding(binding) {
  if (
    typeof binding.value === 'object' &&
    typeof binding.value.position === 'string'
  ) {
    const value = includes(availablePositions, binding.value.position)

    if (!value) {
      console.warn(
        `[v-tooltip] position ${binding.value.position} is not valid`
      )
    }

    return value
  }

  return true
}

/**
 * v-tooltip directive
 *
 * This directive accepts as argument:
 * - Just a label string
 * - An object containing the same properties to SbTooltip component,
 * like id, label, position, textAlign and variant
 *
 * @example
 * - v-tooltip="{ label: 'Tooltip label', position: 'bottom' }"
 * - v-tooltip="'Tooltip label'"
 */
export default {
  /**
   * According to the Vue Doc: this will be "called only once, when the directive is first bound to the element."
   *
   * @method bind
   * @param  {HTMLElement} el node element that the directive is bind to
   * @param  {Object} binding
   */
  bind(el, binding) {
    if (!validateBinding(binding)) {
      return
    }

    const options = getOptions(binding)
    const label = getLabel(binding)
    let checkdelay

    function showHandler(e) {
      if (
        el.__tooltip.popperInstance === null &&
        el.__tooltip.label.length &&
        el.__tooltip.options.show
      ) {
        const tooltip = createTooltip(el.__tooltip.label, el.__tooltip.options)
        const tooltipId =
          el.__tooltip.tooltipId || `sb-tooltip-${randomString(5)}`
        const tooltipTargetId =
          el.__tooltip.targetId || `sb-tooltip-target-${randomString(4)}`

        tooltip.setAttribute('id', tooltipId)
        el.setAttribute('aria-describedby', tooltipId)

        el.__tooltip.targetId = tooltipTargetId
        el.__tooltip.tooltipId = tooltipId
        el.__tooltip.tooltipEl = tooltip
        el.__tooltip.popperInstance = createPopperInstance(
          el,
          tooltip,
          el.__tooltip.options
        )

        checkdelay = setInterval(function() {
          if (!el.offsetHeight && el.__tooltip.popperInstance) {
            el.__tooltip.popperInstance.destroy()
            el.__tooltip.popperInstance = null
          }

          if (!el.__tooltip.popperInstance) {
            clearInterval(checkdelay)
          }
        }, 150)
      }
    }

    function hideHandler() {
      if (el.__tooltip.popperInstance !== null) {
        cleanup(el)
      }
    }

    function handleKeydown(event) {
      if (event.key === 'Escape') {
        hideHandler()
      }
    }

    el.__tooltip = {
      // options
      label,
      options,

      // instance properties
      popperInstance: null,
      tooltipEl: null,

      // methods
      showHandler,
      hideHandler,
      handleKeydown,
    }

    el.addEventListener('mouseover', showHandler)
    el.addEventListener('mouseleave', hideHandler)

    el.addEventListener('focus', showHandler)
    el.addEventListener('blur', hideHandler)

    el.addEventListener('keydown', handleKeydown)
  },

  /**
   * This method will be called when in directive binding update or
   * the node update
   *
   * @method update
   * @param  {HTMLElement} el node element that the directive is bind to
   * @param  {Object} binding
   */
  update(el, binding) {
    if (!validateBinding(binding)) {
      return
    }

    el.__tooltip.label = getLabel(binding)
    el.__tooltip.options = getOptions(binding)
  },

  /**
   * According to the docs: "called only once, when the directive is unbound from the element"
   * It is used to cleanup the DOM and remove listeners
   *
   * @method unbind
   * @param  {HTMLElement} el node element that the directive is bind to
   * @param  {Object} binding
   */
  unbind(el, _) {
    if (el.__tooltip.popperInstance) {
      cleanup(el)

      el.removeEventListener('mouseover', el.__tooltip.showHandler)
      el.removeEventListener('mouseleave', el.__tooltip.hideHandler)

      el.removeEventListener('focus', el.__tooltip.showHandler)
      el.removeEventListener('blur', el.__tooltip.hideHandler)

      el.removeEventListener('keydown', el.__tooltip.handleKeydown)
    }
  },
}

/**
 * Tooltip options to use when creating the Popper instance
 * @typedef {Object} TooltipOptions
 * @property {[number, number]} offset
 * @property {String} placement
 * @property {String} position
 */
