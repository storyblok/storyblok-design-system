import { SbSkeleton } from './index'
import type { Args, Meta, StoryObj } from '@storybook/vue3'
type Story = StoryObj<typeof SbSkeleton>

const meta: Meta<typeof SbSkeleton> = {
  title: 'Interface/SbSkeleton',
  component: SbSkeleton,
  parameters: {
    docs: {
      inlineStories: false,
      description: {
        component: '',
      },
    },
  },
  args: {
    width: '100%',
    height: '2rem',
    shape: 'rectangle',
    animation: 'none',
  },
  argTypes: {
    width: {
      name: 'width',
      description: 'Width of the skeleton',
      control: { type: 'text' },
    },
    height: {
      name: 'height',
      description: 'Height of the skeleton',
      control: { type: 'text' },
    },
    size: {
      name: 'size',
      description: 'Size of the skeleton',
      control: { type: 'text' },
    },
    shape: {
      name: 'shape',
      description: 'Shape of the skeleton',
      control: {
        type: 'select',
      },
      options: ['circle', 'rectangle'],
    },
    animation: {
      name: 'animation',
      description: 'Animation of the skeleton',
      control: {
        type: 'select',
      },
      options: ['wave', 'none'],
    },
  },
}

export default meta

const renderFn = (args: Args): unknown => ({
  components: { SbSkeleton },
  setup(): Args {
    return { args }
  },
  template: `<SbSkeleton v-bind="args" />`,
})

export const Default: Story = {
  render: renderFn,
  args: {
    width: '100%',
    height: '1rem',
  },
}

export const Circle: Story = {
  render: renderFn,
  args: {
    size: '3rem',
    shape: 'circle',
  },
}

export const Animation: Story = {
  render: renderFn,
  args: {
    size: '3rem',
    animation: 'wave',
  },
}

export const FullExample: Story = {
  render: (): unknown => ({
    components: { SbSkeleton },
    template: `
    <ul class="list-none">
      <li class="sb-mb-3">
          <div class="flex">
              <SbSkeleton shape="circle" size="4rem" class="sb-mr-2" />
              <div class="align-self-center" style="flex: 1">
                  <SbSkeleton width="100%" class="sb-mb-2" />
                  <SbSkeleton width="75%"/>
              </div>
          </div>
      </li>
      <li class="sb-mb-3">
          <div class="flex">
              <SbSkeleton shape="rectangle" size="4rem" class="sb-mr-2" />
              <div class="align-self-center" style="flex: 1">
                  <SbSkeleton width="50%" height="2rem" class="sb-mb-2" />
                  <SbSkeleton width="200px" />
              </div>
          </div>
      </li>
    </ul>
    `,
  }),
}
