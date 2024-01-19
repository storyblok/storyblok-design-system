import { mount } from '@vue/test-utils'

/**
 * Wait for given ms
 *
 * @param {number} duration
 */
export const waitMs = (ms = 0) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * @method mountAttachingComponent
 * @param  {VueClass} Component
 * @param  {MountOptions} options
 */
export const mountAttachingComponent = (Component, options = {}) => {
  const divElement = document.createElement('div')

  divElement.id = 'root'

  document.body.appendChild(divElement)

  return mount(Component, {
    attachTo: '#root',
    ...options,
  })
}
