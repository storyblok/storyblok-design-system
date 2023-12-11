import { mount } from '@vue/test-utils'

import Tooltip from '..'

const mountWithTemplate = (template) => {
  return mount({
    directives: {
      tooltip: Tooltip,
    },

    template,
  })
}

const findTarget = (wrapper) => wrapper.find('[data-testid="target"]')

const findTooltip = () => document.querySelector('[role="tooltip"]')

describe('Vtooltip directive', () => {
  it('does not render the tooltip component when mounting the component', () => {
    const wrapper = mountWithTemplate(`
      <span
        data-testid="target"
        v-tooltip="{ label: 'Tooltip label', position: 'top' }"
      > Target element
      </span>
    `)

    expect(findTarget(wrapper).text()).toBe('Target element')

    expect(findTooltip()).toBeNull()
  })

  it('should render the tooltip with a string label', async () => {
    const wrapper = mountWithTemplate(`
      <span
        data-testid="target"
        v-tooltip="'Just a label string'"
      > Target element
      </span>
    `)

    await findTarget(wrapper).trigger('mouseover')

    const tooltipEl = findTooltip()
    expect(tooltipEl.innerText).toBe('Just a label string')
    expect(tooltipEl.getAttribute('data-popper-placement')).toBe('top')
    expect(tooltipEl.className.includes('sb-tooltip--text--center')).toBe(true)

    await findTarget(wrapper).trigger('mouseleave')
  })

  it('should cleanup tooltip when destroy component', async () => {
    const wrapper = mountWithTemplate(`
      <span
        data-testid="target"
        v-tooltip="'Just a label string'"
      > Target element
      </span>
    `)

    await findTarget(wrapper).trigger('mouseover')

    const tooltipEl = findTooltip()
    expect(tooltipEl.innerText).toBe('Just a label string')

    wrapper.unmount()

    expect(findTooltip()).toBeNull()
  })

  it('should render the tooltip when focus/blur in the target element', async () => {
    const wrapper = mountWithTemplate(`
      <span
        tabindex="0"
        data-testid="target"
        v-tooltip="{ label: 'Tooltip label', position: 'top' }"
      > Target element
      </span>
    `)

    const targetEl = findTarget(wrapper)

    await targetEl.trigger('focus')

    expect(findTooltip().innerText).toBe('Tooltip label')

    await targetEl.trigger('blur')

    expect(findTooltip()).toBeNull()
  })

  it('should render the tooltip when mouseover/mouseleave in the target element', async () => {
    const wrapper = mountWithTemplate(`
      <span
        data-testid="target"
        v-tooltip="{ label: 'Tooltip label', position: 'top' }"
      > Target element
      </span>
    `)

    const targetEl = findTarget(wrapper)

    await targetEl.trigger('mouseover')

    expect(findTooltip().innerText).toBe('Tooltip label')

    await targetEl.trigger('mouseleave')

    expect(findTooltip()).toBeNull()
  })

  it('should hide the tooltip when escape keydown', async () => {
    const wrapper = mountWithTemplate(`
      <span
        tabindex="0"
        data-testid="target"
        v-tooltip="{ label: 'Tooltip label', position: 'top' }"
      > Target element
      </span>
    `)

    const targetEl = findTarget(wrapper)

    await targetEl.trigger('focus')

    expect(findTooltip().innerText).toBe('Tooltip label')

    await targetEl.trigger('keydown', {
      key: 'Escape',
    })

    expect(findTooltip()).toBeNull()
  })

  it('should update the tooltip value when change the logic', async () => {
    const wrapper = mount({
      directives: {
        tooltip: Tooltip,
      },

      data: () => ({
        label: 'Tooltip label',
        position: 'top',
        textAlign: 'center',
      }),

      template: `
        <span
          tabindex="0"
          data-testid="target"
          v-tooltip="{ label, position, textAlign }"
        > Target element
        </span>
      `,
    })

    const targetEl = findTarget(wrapper)

    await targetEl.trigger('focus')

    let tooltipEl = findTooltip()

    expect(tooltipEl.innerText).toBe('Tooltip label')
    expect(tooltipEl.getAttribute('data-popper-placement')).toBe('top')
    expect(tooltipEl.className.includes('sb-tooltip--text--center')).toBe(true)

    await targetEl.trigger('blur')

    await wrapper.setData({
      label: 'Tooltip label changed',
      position: 'bottom',
      textAlign: 'left',
    })

    await targetEl.trigger('mouseover')

    tooltipEl = findTooltip()

    expect(tooltipEl.innerText).toBe('Tooltip label changed')
    expect(tooltipEl.getAttribute('data-popper-placement')).toBe('bottom')
    expect(tooltipEl.className.includes('sb-tooltip--text--left')).toBe(true)

    await targetEl.trigger('mouseleave')
  })

  it('should not render the tooltip with the label is empty', async () => {
    const wrapper = mountWithTemplate(`
      <span
        tabindex="0"
        data-testid="target"
        v-tooltip="{ label: '', position: 'top' }"
      > Target element
      </span>
    `)

    const targetEl = findTarget(wrapper)

    await targetEl.trigger('focus')

    expect(findTooltip()).toBeNull()
  })
})
