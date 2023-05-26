import { debounce } from 'throttle-debounce'

/**
 * @method getScrollTop
 * @param  {Element} element
 * @return {Number}
 */
const getScrollTop = function (element) {
  if (element === window) {
    return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop)
  }

  return element.scrollTop
}

const getComputedStyle = document.defaultView.getComputedStyle

/**
 * @method getScrollEventTarget
 * @param  {Element} element
 * @return {Element | Window}
 */
const getScrollEventTarget = function (element) {
  let currentNode = element
  // bugfix, see http://w3help.org/zh-cn/causes/SD9013 and http://stackoverflow.com/questions/17016740/onscroll-function-is-not-working-for-chrome
  while (
    currentNode &&
    currentNode.tagName !== 'HTML' &&
    currentNode.tagName !== 'BODY' &&
    currentNode.nodeType === 1
  ) {
    const overflowY = getComputedStyle(currentNode).overflowY
    if (overflowY === 'scroll' || overflowY === 'auto') {
      return currentNode
    }
    currentNode = currentNode.parentNode
  }
  return window
}

/**
 * @method getVisibleHeight
 * @param  {Element} element
 * @return {Number}
 */
const getVisibleHeight = function (element) {
  if (element === window) {
    return document.documentElement.clientHeight
  }

  return element.clientHeight
}

const getElementTop = function (element) {
  if (element === null) {
    return
  }
  if (element === window) {
    return getScrollTop(window)
  }
  return element.getBoundingClientRect().top + getScrollTop(window)
}

/**
 * @method getListener
 * @param  {Element} el
 * @return {Function}
 */
const getListener = (el) => () => {
  if (!el || !el.__infiniteScroll) {
    return
  }

  const scrollEventTarget = el.__infiniteScroll.scrollEventTarget
  const distance = el.__infiniteScroll.distance

  const viewportScrollTop = getScrollTop(scrollEventTarget)
  const viewportBottom = viewportScrollTop + getVisibleHeight(scrollEventTarget)

  let shouldTrigger = false

  if (scrollEventTarget === el) {
    shouldTrigger = scrollEventTarget.scrollHeight - viewportBottom <= distance
  } else {
    const elementBottom =
      getElementTop(el) -
      getElementTop(scrollEventTarget) +
      el.offsetHeight +
      viewportScrollTop

    shouldTrigger = viewportBottom + distance >= elementBottom
  }

  if (shouldTrigger) {
    el.__infiniteScroll.handler()
  }
}

const InfiniteScroll = {
  /**
   * @typedef  {Object} InfiniteScrollOptions
   * @property {Function} handler
   * @property {Number} distance
   *
   * @method inserted
   * @param  {Element} el element binded to directive
   * @param  {{ value: InfiniteScrollOptions }} binding  object with arguments to directive
   */
  mounted(el, binding) {
    if (typeof binding.value.handler !== 'function') {
      console.warn(
        '[v-infinite-scroll] - it should need to specify a function as a handler'
      )
      return
    }

    el.__infiniteScroll = {
      distance: binding.value.distance || 100,
      handler: binding.value.handler,
      scrollListener: null,
      scrollEventTarget: null,
    }

    el.__infiniteScroll.scrollEventTarget = getScrollEventTarget(el)
    el.__infiniteScroll.scrollListener = debounce(200, getListener(el))
    el.__infiniteScroll.scrollEventTarget.addEventListener(
      'scroll',
      el.__infiniteScroll.scrollListener
    )
  },

  /**
   * @method unbind
   * @param  {Element} el element binded to directive
   */
  unmounted(el) {
    if (!el.__infiniteScroll) return

    if (el.__infiniteScroll.scrollEventTarget) {
      el.__infiniteScroll.scrollEventTarget.removeEventListener(
        'scroll',
        el.__infiniteScroll.scrollListener
      )
    }

    delete el.__infiniteScroll
  },
}

export default InfiniteScroll
