import { SbSlideover } from './index'
import { SbModalHeader, SbModalContent, SbModalFooter } from '../Modal'
import SbButton from '../Button'
import { ref } from 'vue'
import type { Args, Meta, StoryObj } from '@storybook/vue3'

type Story = StoryObj<typeof SbSlideover>

const meta: Meta<typeof SbSlideover> = {
  title: 'Interface/SbSlideover',
  component: SbSlideover,
  parameters: {
    docs: { inlineStories: false, iframeHeight: 500 },
    layout: 'fullscreen',
  },
  args: {
    orientation: 'right',
    title: 'Title',
  },
  argTypes: {
    orientation: {
      name: 'orientation',
      options: ['left', 'right'],
      description:
        'The prop `orientation` is used to define the position where the `Slideover` component will appear, the options are on the `left` or `right`, the default is on the `right`.',
      control: {
        type: 'select',
      },
    },
  },
  render: (args: Args) => ({
    components: {
      SbSlideover,
      SbButton,
      SbModalHeader,
      SbModalContent,
      SbModalFooter,
    },
    setup() {
      const show = ref(false)
      function handleToggleSlide() {
        show.value = !show.value
      }

      return {
        args,
        show,
        handleToggleSlide,
      }
    },
    template: `
      <div>
        <SbButton
          label="Open Slideover!"
          @click="handleToggleSlide"
          style="margin: 0 auto; display: flex; margin-top: 30%;"/>

        <SbSlideover :is-open="show" v-bind="args" @hide="handleToggleSlide">

          <SbModalHeader :title="args.title" align="left" />

          <SbModalContent style="flex: 1;">
            <p>Storyblok helps your team to tell your story and...</p>
          </SbModalContent>

          <SbModalFooter>
            <SbButton label="Label" variant="primary"/>
            <SbButton label="Label" variant="tertiary"/>
          </SbModalFooter>
        </SbSlideover>
      </div>
    `,
  }),
}

export default meta

export const Default: Story = {}
export const SlideoverOnLeft: Story = {
  args: {
    orientation: 'left',
  },
}
export const SlideoverWithoutFooter: Story = {
  render: (args: Args) => ({
    components: { SbSlideover, SbButton, SbModalHeader, SbModalContent },
    setup() {
      const show = ref(false)
      function handleToggleSlide() {
        show.value = !show.value
      }

      return {
        args,
        show,
        handleToggleSlide,
      }
    },
    template: `
    <div>
      <SbButton
        label="Open Slideover!"
        @click="handleToggleSlide"
        style="margin: 0 auto; display: flex; margin-top: 30%;"/>

      <SbSlideover :is-open="show" v-bind="args" @hide="handleToggleSlide" >

        <SbModalHeader title="Hi man" align="left" />

        <SbModalContent style="flex: 1;">
          <p>Storyblok helps your team to tell your story and...</p>
        </SbModalContent>
      </SbSlideover>
    </div>
  `,
  }),
}
export const SlideoverInMaxSize: Story = {
  render: (args: Args) => ({
    components: { SbSlideover, SbButton, SbModalHeader, SbModalContent },
    setup() {
      const show = ref(false)
      function handleToggleSlide() {
        show.value = !show.value
      }

      return {
        args,
        show,
        handleToggleSlide,
      }
    },
    template: `
    <div>
      <SbButton
        label="Open Slideover!"
        @click="handleToggleSlide"
        style="margin: 0 auto; display: flex; margin-top: 30%;"/>

      <SbSlideover :is-open="show" v-bind="args" @hide="handleToggleSlide">

        <SbModalHeader title="Hi man" align="left" />

        <SbModalContent style="flex: 1;">
          <p>Storyblok helps your team to tell your story and manage
          content for every use-case: corporate websites, e-commerce,
          helpdesks, mobile apps, and screen displays.</p>
        </SbModalContent>
      </SbSlideover>
    </div>
  `,
  }),
}
