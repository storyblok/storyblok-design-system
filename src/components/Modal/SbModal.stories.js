import {
  SbModal,
  SbModalHeader,
  SbModalContent,
  SbModalFooter
} from './index'

import SbButton from '../Button'

const ModalTemplate = args => ({
  components: { SbModal, SbModalContent, SbModalFooter, SbModalHeader, SbButton },
  props: Object.keys(args),
  methods: {
    handleShowModal () {
      this.showModal = true
    }
  },
  data: () => ({
    showModal: false
  }),
  template: `
    <div>
      <SbButton
        label="Open Modal!"
        type="primary"
        @click="handleShowModal"
        v-if="!showModal"
        style="margin: 0 auto; display: flex; margin-top: 30%;"
      />
      <SbModal :is-open-modal="showModal" v-on:hide="showModal = false">
        <SbModalHeader 
          v-bind="{
            title,
            icon,
            align,
          }"
        />

        <SbModalContent>
          <p style="font-size: 16px; color: rgb(84, 91, 111); text-align: center;">The body copy that explains empty state</p>
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
    align: 'center',
    isOpenModal: false
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
    },
    isOpenModal: {
      name: 'isOpenModal',
      description: '',
      control: {
        type: 'boolean'
      }
    }
  }
}

export const Default = ModalTemplate.bind({})

export const ModalWithoutFooter = args => ({
  components: { SbModal, SbModalHeader, SbModalContent, SbButton },
  props: Object.keys(args),
  template: `
  <SbModal v-bind="{ isOpenModal }">
    <SbModalHeader 
      v-bind="{
        title,
      }"
    />

    <SbModalContent>
      <p style="font-size: 16px; color: rgb(84, 91, 111); text-align: center;">The body copy that explains empty state</p>
    </SbModalContent>
    
    <SbButton label="Click me!" type="primary"/>
  </SbModal>
  `
})

ModalWithoutFooter.args = {
  isOpenModal: true,
  title: 'This Modal dont have footer !'
}

ModalWithoutFooter.parameters = {
  docs: {
    description: {
      story: 'SbModal components are versatile, the user can add or not a footer'
    }
  }
}
