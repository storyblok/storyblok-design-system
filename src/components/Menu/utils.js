import { mount } from '@vue/test-utils'

/**
 * @method factoryMountComponent
 * @param  {VueClass} Component
 * @param  {MountOptions} options
 * @return {MountInstance}
 */
export const factoryMountComponent = (Component, options = {}) => {
  const divElement = document.createElement('div')

  divElement.id = 'root'

  document.body.appendChild(divElement)

  return mount(Component, {
    attachTo: '#root',
    ...options
  })
}
