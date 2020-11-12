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
      <SbButton label="Open Slideover!" @click="handleOpenSlide" />
      
      <SbSlideover
        :is-open="show"
        @hide="show = false">
        
        <SbModalHeader title="Hi man" align="left" />

        <SbModalContent>
          <p>Storyblok helps your team to tell your story and manage 
          content for every use-case: corporate websites, e-commerce, 
          helpdesks, mobile apps, and screen displays.</p>
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
  },
}

export const Default = SlideoverTemplate.bind({})

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
      <SbButton label="Open Slideover!" @click="handleOpenSlide" />
      
      <SbSlideover
        :is-open="show"
        @hide="show = false">
        
        <SbModalHeader title="Hi man" align="left" />

        <SbModalContent>
          <p>Storyblok helps your team to tell your story and manage 
          content for every use-case: corporate websites, e-commerce, 
          helpdesks, mobile apps, and screen displays.</p>
        </SbModalContent>

      </SbSlideover>
    </div>
  `,
})
