import {
  SbModal,
  SbModalHeader,
  SbModalContent,
  SbModalFooter,
  SbModalType,
} from './index'

import SbButton from '../Button'

const ModalTemplate = (args) => ({
  components: {
    SbModal,
    SbModalContent,
    SbModalFooter,
    SbModalHeader,
    SbButton,
  },
  props: Object.keys(args),
  methods: {
    handleShowModal() {
      this.showModal = true
    },
  },
  data: () => ({
    showModal: false,
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
      <SbModal
        :is-open="showModal"
        :full-width="fullWidth"
        @hide="showModal = false"
      >
        <SbModalHeader
          v-bind="{
            title,
            icon,
            align,
          }"
        />

        <SbModalContent>
          <p>The body copy that explains empty state</p>
        </SbModalContent>

        <SbModalFooter>
          <SbButton label="Label" type="primary"/>
          <SbButton label="Label" type="ghost"/>
        </SbModalFooter>

      </SbModal>
    </div>
  `,
})

export default {
  title: 'SbModal',
  component: SbModal,
  parameters: {
    docs: {
      description: {
        component:
          'Modals focus the user’s attention exclusively on one task or piece of information via a window that sits on top of the page content.',
      },
    },
  },
  args: {
    title: 'Main title',
    icon: 'success-pictogram',
    align: 'center',
    isOpen: false,
    fullWidth: false,
  },
  argTypes: {
    title: {
      name: 'title',
      description:
        'The prop `title` is exactly what the name says, it will be the title rendered in the `SbModalHeader` component, the rendered tag is an `<h1>`',
      control: {
        type: 'text',
      },
    },
    icon: {
      name: 'icon',
      description:
        'The prop `icon` is the name of the icon you want to render.',
      control: {
        type: 'text',
      },
    },
    align: {
      name: 'align',
      description:
        'Prop `align` works to change the type of header alignment, center alignment is the default.',
      control: {
        type: 'select',
        options: ['center', 'left'],
      },
    },
    isOpen: {
      name: 'isOpen',
      description: 'The `isOpen` prop works to open the modal with the prop.',
      control: {
        type: 'boolean',
      },
    },
    fullWidth: {
      name: 'fullWidth',
      description:
        'The `fullWidth` prop works to remove the default size from the modal, thus being able to adapt the `width` of the content.',
      control: {
        type: 'boolean',
      },
    },
  },
}

export const Default = ModalTemplate.bind({})

export const ModalWithoutFooter = (args) => ({
  components: { SbModal, SbModalHeader, SbModalContent, SbButton },
  props: Object.keys(args),
  methods: {
    handleShowModal() {
      this.showModal = true
    },
  },
  data: () => ({
    showModal: false,
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
    <SbModal :is-open="showModal" v-on:hide="showModal = false">
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
  </div>
  `,
})

ModalWithoutFooter.args = {
  title: 'This Modal dont have footer !',
}

ModalWithoutFooter.parameters = {
  docs: {
    description: {
      story:
        'SbModal components are versatile, the user can add or not a footer',
    },
  },
}

export const ModalWithoutHeader = (args) => ({
  components: { SbModal, SbModalContent, SbButton, SbModalFooter },
  props: Object.keys(args),
  methods: {
    handleShowModal() {
      this.showModal = true
    },
  },
  data: () => ({
    showModal: false,
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
    <SbModal :is-open="showModal" v-on:hide="showModal = false">
      <SbModalContent>
        <p style="text-align: center;">This awesome dont have Title or Header!</p>
      </SbModalContent>

      <SbModalFooter>
        <SbButton label="Click me!" type="primary"/>
      </SbModalFooter>
    </SbModal>
  </div>`,
})

ModalWithoutHeader.parameters = {
  docs: {
    description: {
      story:
        'The `SbModal` component was built to be versatile, so you can use it without the header, and or footer.',
    },
  },
}

export const ModalWithMediumSize = (args) => ({
  components: {
    SbModal,
    SbModalHeader,
    SbModalContent,
    SbButton,
    SbModalFooter,
  },
  props: Object.keys(args),
  methods: {
    handleShowModal() {
      this.showModal = true
    },
  },
  data: () => ({
    showModal: false,
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
    <SbModal :is-open="showModal" v-on:hide="showModal = false">
      <SbModalHeader :align="align" :title="title" />

      <SbModalContent>
        <div style="width: 100%; height: 300px;"><p style="text-align: left; margin: 0;">The body copy that explains empty state</p></div>
      </SbModalContent>

      <SbModalFooter>
        <SbButton label="Label" type="primary"/>
        <SbButton label="Label" type="ghost"/>
      </SbModalFooter>
    </SbModal>
  </div>`,
})

ModalWithMediumSize.parameters = {
  docs: {
    description: {
      story:
        'The `SbModal` component has a variable `height` so you can add content with the height you want the member to adjust to.',
    },
  },
}

ModalWithMediumSize.args = {
  title: 'Main Title',
  align: 'left',
}

export const ModalInFullWidth = ModalTemplate.bind({})

ModalInFullWidth.args = {
  fullWidth: true,
}

export const ModalTypeComponentConfirm = (args) => ({
  props: Object.keys(args),
  components: { SbModalType },
  methods: {
    handleShowModal() {
      this.$refs.modal.show()
    },
  },
  template: `
    <div>
      <SbButton
        label="Open Modal!"
        type="primary"
        @click="handleShowModal"
        style="margin: 0 auto; display: flex; margin-top: 30%;"
      />
      <SbModalType
        ref="modal"
        :title="title"
        :align="align"
        :message="message"
        :type="type"
        :cancelButtonLabel="cancelButtonLabel"
        :actionButtonLabel="actionButtonLabel"
      />
    </div>
  `,
})

ModalTypeComponentConfirm.args = {
  title: 'Confirm',
  align: 'center',
  message: 'A confirm message',
  type: 'confirmation',
  cancelButtonLabel: "No, don't create",
  actionButtonLabel: 'Ok, create it!',
}

ModalTypeComponentConfirm.parameters = {
  docs: {
    description: {
      story:
        'The component `SbModaType` is a type of modal with a predefined style, the idea is to standardize the type of modal to `confirm` an action, so we can maintain the consistency of the DS.',
    },
  },
}

export const ModalTypeComponentDelete = (args) => ({
  props: Object.keys(args),
  components: { SbModalType },
  methods: {
    handleShowModal() {
      this.$refs.modal.show()
    },
  },
  template: `
    <div>
      <SbButton
        label="Open Modal!"
        type="primary"
        @click="handleShowModal"
        style="margin: 0 auto; display: flex; margin-top: 30%;"
      />
      <SbModalType
        ref="modal"
        :title="title"
        :align="align"
        :message="message"
        :type="type"
        :cancelButtonLabel="cancelButtonLabel"
        :actionButtonLabel="actionButtonLabel"
      />
    </div>
  `,
})

ModalTypeComponentDelete.args = {
  title: 'Delete This Project',
  align: 'center',
  message: 'A delete message',
  type: 'delete',
  cancelButtonLabel: "No, don't delete it",
  actionButtonLabel: 'Ok, delete it!',
}

ModalTypeComponentDelete.parameters = {
  docs: {
    description: {
      story:
        'The component `SbModaType` is a type of modal with a predefined style, the idea is to standardize the type of modal to `delete` an action, so we can maintain the consistency of the DS.',
    },
  },
}
