import {
  SbModal,
  SbModalHeader,
  SbModalContent,
  SbModalFooter,
  SbModalType,
} from './index'

import SbButton from '../Button'

/**
 * this code is always inject the story viewMode in the v6.0.0 of Storyblok
 * when it tries to update the v6.1.11 (the current version) it finds some
 * bugs to code execution, like the stories components execute twice
 *
 * So, we implement this mixin to inject the story viewMode context to
 * know which context the story is executed to prevent the overflow of modals
 * in docs
 */
const StorybookInjectionsMixin = (storyContext) => {
  const viewMode = storyContext.viewMode || 'story'

  // @vue/component
  return {
    __STORYBOOK_VIEW_MODE: viewMode,

    computed: {
      isInDocs() {
        return this.$options.__STORYBOOK_VIEW_MODE === 'docs'
      },
    },
  }
}

const StoriesModalMixin = (args, storyContext) => {
  // @vue/component
  return {
    mixins: [StorybookInjectionsMixin(storyContext)],

    props: Object.keys(args),

    data: () => ({
      showModal: false,
    }),

    methods: {
      handleShowModal() {
        this.showModal = true
      },
    },
  }
}

const ModalTemplate = (args, storyContext) => ({
  mixins: [StoriesModalMixin(args, storyContext)],

  components: {
    SbModal,
    SbModalContent,
    SbModalFooter,
    SbModalHeader,
    SbButton,
  },

  template: `
    <div>
      <SbButton
        label="Open Modal!"
        variant="primary"
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
          <p style="text-align:center">The body copy that explains empty state</p>
        </SbModalContent>

        <SbModalFooter>
          <SbButton label="Label" variant="primary"/>
          <SbButton label="Label" variant="tertiary"/>
        </SbModalFooter>

      </SbModal>
    </div>
  `,
})

const ModalTypeTemplate = (args, storyContext) => ({
  mixins: [StorybookInjectionsMixin(storyContext)],

  props: Object.keys(args),

  components: { SbModalType },

  computed: {
    buttonVariant() {
      return this.type === 'confirmation' ? 'primary' : 'danger'
    },
  },

  methods: {
    handleShowModal() {
      this.$refs.modal.show()
    },
  },

  template: `
    <div>
      <SbButton
        label="Open Modal!"
        :variant="buttonVariant"
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

export default {
  title: 'Design System/Components/SbModal',
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

export const ModalWithoutFooter = (args, storyContext) => ({
  components: { SbModal, SbModalHeader, SbModalContent, SbButton },

  mixins: [StoriesModalMixin(args, storyContext)],

  template: `
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

export const ModalWithoutHeader = (args, storyContext) => ({
  components: { SbModal, SbModalContent, SbButton, SbModalFooter },

  mixins: [StoriesModalMixin(args, storyContext)],

  template: `
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

export const ModalWithMediumSize = (args, storyContext) => ({
  mixins: [StoriesModalMixin(args, storyContext)],

  components: {
    SbModal,
    SbModalHeader,
    SbModalContent,
    SbButton,
    SbModalFooter,
  },

  template: `
  <div>
    <SbButton
      label="Open Modal!"
      variant="primary"
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
        <SbButton label="Label" variant="primary"/>
        <SbButton label="Label" variant="tertiary"/>
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

export const ModalTypeComponentConfirm = ModalTypeTemplate.bind({})

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

export const ModalTypeComponentDelete = ModalTypeTemplate.bind({})

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

export const ModalClosingWithEsc = (args, storyContext) => ({
  mixins: [StoriesModalMixin(args, storyContext)],

  components: {
    SbModal,
    SbModalHeader,
    SbModalContent,
    SbButton,
    SbModalFooter,
  },

  template: `
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
  </div>`,
})

ModalClosingWithEsc.parameters = {
  docs: {
    description: {
      story:
        'The `SbModal` component has the optional choice of being closed when the user press `ESC` on the keyboard',
    },
  },
}

ModalClosingWithEsc.args = {
  title: 'Main Title',
  align: 'left',
}

export const ModalCloseOnHeader = (args, storyContext) => ({
  mixins: [StoriesModalMixin(args, storyContext)],

  components: {
    SbModal,
    SbModalHeader,
    SbModalContent,
  },

  template: `
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
  </div>`,
})

ModalCloseOnHeader.parameters = {
  docs: {
    description: {
      story: `This storie is to show that too we can render the close button directly in the modal header to add new design possibilities,
        to activate this function, pass the prop 'close-on-header'. You will also need to add a template with slot:actions to add
        other buttons next to the close button.`,
    },
  },
}

ModalCloseOnHeader.args = {
  title: 'Main Title',
  align: 'left',
}
export const ModalTarget = (args, storyContext) => ({
  mixins: [StoriesModalMixin(args, storyContext)],

  components: {
    SbModal,
    SbModalHeader,
    SbModalContent,
  },

  template: `
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
  </div>`,
})

ModalTarget.parameters = {
  docs: {
    description: {
      story: `This storie is to show that we can also render the modal inside any div, and not necessarily in the body of the document. 
      For that we need to pass the 'target' and 'disabled-target-default' props.`,
    },
  },
}

ModalTarget.args = {
  disabledTargetDefault: true,
}
