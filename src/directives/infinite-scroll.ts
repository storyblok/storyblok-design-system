/* copied and adapted from: https://github.com/kurt-liao/vue-infinite-scroll */

import type { ObjectDirective } from 'vue'
import { throttle } from 'throttle-debounce'
import { isFunction } from '@vue/shared' // eslint-disable-line vue/prefer-import-from-vue
import { nextTick } from 'vue'

/**
 * constants
 */
const PREFIX = 'InfiniteScroll'
const ATTR_PREFIX = 'infinite-scroll-'

/**
 * types
 */
type Callback = () => void
type CustomHTMLElement = HTMLElement & {
  [PREFIX]: {
    onScroll: Callback
  }
}

const getAttributes = (
  el: HTMLElement
): { delay: number; disabled: boolean } => {
  const delayFromAttr = el.getAttribute(`${ATTR_PREFIX}delay`)

  let delay = 300
  if (delayFromAttr !== null) {
    const _delay = parseInt(delayFromAttr, 10)
    delay = !isNaN(_delay) ? _delay : delay
  }

  const disabled =
    el.getAttribute(`${ATTR_PREFIX}disabled`) === 'true' ? true : false

  return {
    delay,
    disabled,
  }
}

const handleScroll = (el: CustomHTMLElement, callback: Callback): void => {
  const { disabled } = getAttributes(el)

  // do nothing if is disabled
  if (disabled) return

  const { scrollTop, clientHeight, scrollHeight } = el

  if (scrollTop + clientHeight >= scrollHeight - 10) {
    callback && callback()
  }
}

const InfiniteScroll: ObjectDirective<CustomHTMLElement, Callback> = {
  async mounted(el, binding) {
    // make sure component is mounted
    await nextTick()

    const { value: callback } = binding

    // Callback must be a function
    if (!isFunction(callback)) {
      throw new Error('infinite-scroll directive value must be a function!')
    }

    const { delay } = getAttributes(el)

    const onScroll = throttle(delay, handleScroll.bind(null, el, callback))

    el.addEventListener('scroll', onScroll)

    // store it for removing event while unmount
    el[PREFIX] = {
      onScroll,
    }
  },

  unmounted(el) {
    const { onScroll } = el && el[PREFIX]
    el.removeEventListener('scroll', onScroll)
  },
}

export default InfiniteScroll
