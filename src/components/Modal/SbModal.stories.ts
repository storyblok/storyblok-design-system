import {
  SbModal,
  SbModalHeader,
  SbModalContent,
  SbModalFooter,
  SbModalType,
} from './index'

import SbButton from '../Button'
import type { Args, Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

const ModalTemplate: Story = (customTemplate: string = '') => ({
  render: (args: Args) => ({
    components: {
      SbModal,
      SbModalContent,
      SbModalFooter,
      SbModalHeader,
      SbButton,
    },

    setup: () => {
      const showModal = ref(false)

      const handleShowModal = () => {
        showModal.value = true
      }

      return { args, showModal, handleShowModal }
    },

    template: customTemplate.length
      ? customTemplate
      : `
    <div>
      <SbButton
        label="Open Modal!"
        variant="primary"
        @click="handleShowModal"
        v-if="!showModal"
        style="margin: 0 auto; display: flex; margin-top: 30%;"
      />
      <SbModal
        v-bind="args"
        :is-open="showModal"
        @hide="showModal = false"
      >
        <SbModalHeader
          v-bind="{
            title: args.title,
            icon: args.icon,
            align: args.align,
          }"
        />

        <SbModalContent>
          <p style="text-align:center">The body copy that explains empty state</p>
        </SbModalContent>

        <SbModalFooter>
          <SbButton label="Label" variant="primary"/>
          <SbButton label="Label" variant="tertiary"/>
        </SbModalFooter>

      </SbModal>
    </div>
  `,
  }),
})

type Story = StoryObj<typeof SbModal>

const meta: Meta<typeof SbModal> = {
  title: 'Interface/SbModal',
  component: SbModal,
  parameters: {
    docs: {
      description: {
        component:
          'Modals focus the user’s attention exclusively on one task or piece of information via a window that sits on top of the page content.',
      },
    },
    // Sets a delay for the component's stories
    // the animation of the Modal is 0.5s or 500ms
    chromatic: { delay: 600 },
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
      options: ['center', 'left'],
      control: {
        type: 'select',
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
  render: ModalTemplate().render,
}

export default meta

export const Default: Story = {}

export const ModalWithoutFooter: Story = {
  render: ModalTemplate(`
  <div>
    <SbButton
      label="Open Modal!"
      variant="primary"
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

      <SbButton label="Click me!" variant="primary" style="margin: 0 auto;display: flex"/>
    </SbModal>
  </div>
  `).render,
  args: {
    title: 'This Modal dont have footer !',
  },
  parameters: {
    docs: {
      description: {
        story:
          'SbModal components are versatile, the user can add or not a footer',
      },
    },
  },
}

export const ModalWithoutHeader: Story = {
  render: ModalTemplate(`
  <div>
    <SbButton
      label="Open Modal!"
      variant="primary"
      @click="handleShowModal"
      v-if="!showModal"
      style="margin: 0 auto; display: flex; margin-top: 30%;"
    />
    <SbModal :is-open="showModal" v-on:hide="showModal = false">
      <SbModalContent>
        <p style="text-align: center;">This awesome dont have Title or Header!</p>
      </SbModalContent>

      <SbModalFooter>
        <SbButton label="Click me!" variant="primary"/>
      </SbModalFooter>
    </SbModal>
  </div>`).render,
  parameters: {
    docs: {
      description: {
        story:
          'The `SbModal` component was built to be versatile, so you can use it without the header, and or footer.',
      },
    },
  },
}

export const ModalWithMediumSize: Story = {
  render: ModalTemplate(`
  <div>
    <SbButton
      label="Open Modal!"
      variant="primary"
      @click="handleShowModal"
      v-if="!showModal"
      style="margin: 0 auto; display: flex; margin-top: 30%;"
    />
    <SbModal v-bind="args" :is-open="showModal" v-on:hide="showModal = false">
      <SbModalHeader :align="align" :title="title" />

      <SbModalContent>
        <div style="width: 100%; height: 300px;"><p style="text-align: left; margin: 0;">The body copy that explains empty state</p></div>
      </SbModalContent>

      <SbModalFooter>
        <SbButton label="Label" variant="primary"/>
        <SbButton label="Label" variant="tertiary"/>
      </SbModalFooter>
    </SbModal>
  </div>`).render,
  parameters: {
    docs: {
      description: {
        story:
          'The `SbModal` component has a variable `height` so you can add content with the height you want the member to adjust to.',
      },
    },
  },
  args: {
    title: 'Main Title',
    align: 'left',
  },
}

export const ModalInFullWidth: Story = {
  args: {
    fullWidth: true,
  },
}

export const ModalTypeComponentConfirm: Story = {
  args: {
    title: 'Confirm',
    align: 'center',
    message: 'A confirm message',
    type: 'confirmation',
    cancelButtonLabel: "No, don't create",
    actionButtonLabel: 'Ok, create it!',
  },

  parameters: {
    docs: {
      description: {
        story:
          'The component `SbModaType` is a type of modal with a predefined style, the idea is to standardize the type of modal to `confirm` an action, so we can maintain the consistency of the DS.',
      },
    },
  },
}

export const ModalTypeComponentDelete: Story = {
  args: {
    title: 'Delete This Project',
    align: 'center',
    message: 'A delete message',
    type: 'delete',
    cancelButtonLabel: "No, don't delete it",
    actionButtonLabel: 'Ok, delete it!',
  },
  parameters: {
    docs: {
      description: {
        story:
          'The component `SbModaType` is a type of modal with a predefined style, the idea is to standardize the type of modal to `delete` an action, so we can maintain the consistency of the DS.',
      },
    },
  },
}

export const ModalClosingWithEsc: Story = {
  render: ModalTemplate(`
  <div>
    <SbButton
      label="Open Modal!"
      variant="primary"
      @click="handleShowModal"
      v-if="!showModal"
      style="margin: 0 auto; display: flex; margin-top: 30%;"
    />
    <SbModal :is-open="showModal" :esc-closes="true" v-on:hide="showModal = false">
      <SbModalHeader :align="align" :title="title" />

      <SbModalContent>
        <div style="width: 100%; height: 300px;"><p style="text-align: left; margin: 0;">The body copy that explains empty state</p></div>
      </SbModalContent>

      <SbModalFooter>
        <SbButton label="Label" variant="primary"/>
        <SbButton label="Label" variant="tertiary"/>
      </SbModalFooter>
    </SbModal>
  </div>`).render,
  parameters: {
    docs: {
      description: {
        story:
          'The `SbModal` component has the optional choice of being closed when the user press `ESC` on the keyboard',
      },
    },
  },
  args: {
    title: 'Main Title',
    align: 'left',
  },
}

export const ModalCloseOnHeader: Story = {
  render: ModalTemplate(`
  <div>
    <SbButton
      label="Open Modal!"
      variant="primary"
      @click="handleShowModal"
      v-if="!showModal"
      style="margin: 0 auto; display: flex; margin-top: 30%;"
    />
    <SbModal :is-open="showModal" v-on:hide="showModal = false" close-on-header>
      <SbModalHeader :align="align" :title="title" />
      <SbModalContent>
        <div style="width: 100%;"><p style="text-align: left; margin: 0;">This Modal has a Close button on the header !</p></div>
      </SbModalContent>
    </SbModal>
  </div>`).render,
  parameters: {
    docs: {
      description: {
        story: `This storie is to show that too we can render the close button directly in the modal header to add new design possibilities,
        to activate this function, pass the prop 'close-on-header'. You will also need to add a template with slot:actions to add
        other buttons next to the close button.`,
      },
    },
  },
  args: {
    title: 'Main Title',
    align: 'left',
  },
}

export const ModalTarget: Story = {
  render: ModalTemplate(`
  <div id="boxModal" style="width: 500px; height: 400px">
    <SbButton
      label="Open Modal!"
      variant="primary"
      @click="handleShowModal"
      v-if="!showModal"
      style="margin: 0 auto; display: flex; margin-top: 30%;"
    />
    <SbModal :is-open="showModal" v-on:hide="showModal = false" disabled-target-default="true" target="#boxModal" overlay-position="relative" >
      <SbModalContent>
        <div style="width: 100%;"><p style="text-align: left; margin: 0;">This modal opens inside the div with id "boxModal"</p></div>
      </SbModalContent>
    </SbModal>
  </div>`).render,
  parameters: {
    docs: {
      description: {
        story: `This storie is to show that we can also render the modal inside any div, and not necessarily in the body of the document.
      For that we need to pass the 'target' and 'disabled-target-default' props.`,
      },
    },
  },
  args: {
    disabledTargetDefault: true,
  },
}

export const MultipleModals: Story = {
  render: (args: Args) => ({
    components: {
      SbModal,
      SbModalContent,
      SbButton,
    },

    setup: () => {
      const isModalOneVisible = ref(false)
      const isModalTwoVisible = ref(false)

      const handleShowModal = (type: string) => {
        if (type === 'one') {
          isModalOneVisible.value = true
        }
        if (type === 'two') {
          isModalTwoVisible.value = true
        }
      }

      return { args, isModalOneVisible, isModalTwoVisible, handleShowModal }
    },

    template: `
    <div>
      <SbButton
        label="Show Modal One"
        variant="primary"
        @click="handleShowModal('one')"
      />
      <SbModal
        v-bind="args"
        :is-open="isModalOneVisible"
        @hide="isModalOneVisible = false"
      >
        <SbModalContent>
          <p style="text-align:center">This is modal one</p>
          <SbButton
            label="Show Modal Two"
            variant="primary"
            @click="handleShowModal('two')"
          />
        </SbModalContent>
      </SbModal>
      <SbModal
        v-bind="args"
        :is-open="isModalTwoVisible"
        @hide="isModalTwoVisible = false"
      >
        <SbModalContent>
          <p style="text-align:center">This is modal two</p>
        </SbModalContent>
      </SbModal>
    </div>
  `,
  }),
}
