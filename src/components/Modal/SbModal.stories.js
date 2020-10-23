import SbModal, {
  SbModalHeader,
  SbModalContent,
  SbModalFooter
} from './index'

import SbButton from '../Button'

const ModalTemplate = args => ({
  components: { SbModal, SbModalContent, SbModalFooter, SbModalHeader, SbButton },
  props: Object.keys(args),
  template: `
    <div>
      <SbModal>
        <SbModalHeader 
          v-bind="{
            title,
            icon,
            align,
          }"
        />

        <SbModalContent>
          <p>It works!</p>
        </SbModalContent>
        
        <SbModalFooter>
          <SbButton label="Save" type="primary"/>
          <SbButton label="Cancel" type="danger"/>
        </SbModalFooter>

      </SbModal>
    </div>
  `
})

export default {
  title: 'SbModal',
  component: SbModal,
  parameters: {
    docs: {
      description: {
        component: 'Modals focus the user’s attention exclusively on one task or piece of information via a window that sits on top of the page content.'
      }
    }
  },
  args: {
    title: 'Main title',
    icon: 'success-pictogram',
    align: 'center'
  },
  argTypes: {
    title: {
      name: 'title',
      description: 'The prop `title` is exactly what the name says, it will be the title rendered in the `SbModalHeader` component, the rendered tag is an `<h1>`',
      control: {
        type: 'text'
      }
    },
    icon: {
      name: 'icon',
      description: 'The prop `icon` is the name of the icon you want to render.',
      control: {
        type: 'text'
      }
    },
    align: {
      name: 'align',
      description: 'Prop `align` works to change the type of header alignment, center alignment is the default.',
      control: {
        type: 'select',
        options: ['center', 'left']
      }
    }
  }
}

export const Default = ModalTemplate.bind({})
