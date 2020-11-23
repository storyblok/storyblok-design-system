import { SbSlideover } from './index'
import { SbModalHeader, SbModalContent, SbModalFooter } from '../Modal'
import SbButton from '../Button'

const SlideoverTemplate = (args) => ({
  components: {
    SbSlideover,
    SbButton,
    SbModalHeader,
    SbModalContent,
    SbModalFooter,
  },
  props: Object.keys(args),
  methods: {
    handleOpenSlide() {
      this.show = true
    },
  },
  data: () => ({
    show: false,
  }),
  template: `
    <div>
      <SbButton
        label="Open Slideover!"
        @click="handleOpenSlide"
        style="margin: 0 auto; display: flex; margin-top: 30%;"/>
      
      <SbSlideover
        :is-open="show"
        @hide="show = false"
        :orientation="orientation">
        
        <SbModalHeader title="Title" align="left" />

        <SbModalContent style="flex: 1;">
          <p>Storyblok helps your team to tell your story and...</p>
        </SbModalContent>

        <SbModalFooter>
          <SbButton label="Label" type="primary"/>
          <SbButton label="Label" type="ghost"/>
        </SbModalFooter>
      </SbSlideover>
    </div>
  `,
})

export default {
  title: 'SbSlideover',
  component: SbSlideover,
  parameters: {
    docs: {
      description: {
        component:
          'Slideover focus the user’s attention exclusively on one task or piece of information via a window that sits on top of the page content.',
      },
    },
    args: {
      orientation: 'right',
    },
    argTypes: {
      orientation: {
        name: 'orientation',
        description:
          'The prop `orientation` is used to define the position where the `Slideover` component will appear, the options are on the `left` or `right`, the default is on the `right`.',
        control: {
          type: 'select',
          options: ['left', 'right'],
        },
      },
    },
  },
}

export const Default = SlideoverTemplate.bind({})

export const SlideoverOnLeft = SlideoverTemplate.bind({})

SlideoverOnLeft.args = {
  orientation: 'left',
}

export const SlideoverWithoutFooter = (args) => ({
  components: { SbSlideover, SbButton, SbModalHeader, SbModalContent },
  props: Object.keys(args),
  methods: {
    handleOpenSlide() {
      this.show = true
    },
  },
  data: () => ({
    show: false,
  }),
  template: `
    <div>
      <SbButton
        label="Open Slideover!"
        @click="handleOpenSlide"
        style="margin: 0 auto; display: flex; margin-top: 30%;"/>

      <SbSlideover
        :is-open="show"
        @hide="show = false"
        :orientation="orientation">

        <SbModalHeader title="Hi man" align="left" />

        <SbModalContent style="flex: 1;">
          <p>Storyblok helps your team to tell your story and...</p>
        </SbModalContent>
      </SbSlideover>
    </div>
  `,
})

export const SlideoverInMaxSize = (args) => ({
  components: { SbSlideover, SbButton, SbModalHeader, SbModalContent },
  props: Object.keys(args),
  methods: {
    handleOpenSlide() {
      this.show = true
    },
  },
  data: () => ({
    show: false,
  }),
  template: `
    <div>
      <SbButton
        label="Open Slideover!"
        @click="handleOpenSlide"
        style="margin: 0 auto; display: flex; margin-top: 30%;"/>

      <SbSlideover
        :is-open="show"
        @hide="show = false"
        :orientation="orientation">

        <SbModalHeader title="Hi man" align="left" />

        <SbModalContent style="flex: 1;">
          <p>Storyblok helps your team to tell your story and manage 
          content for every use-case: corporate websites, e-commerce, 
          helpdesks, mobile apps, and screen displays.</p>
        </SbModalContent>
      </SbSlideover>
    </div>
  `,
})
