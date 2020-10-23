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
        <SbModalHeader title="Main Title"/>

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
  }
  // args: {
  //   type: 'spinner',
  // },
  // argTypes: {
  //   type: {
  //     name: 'type',
  //     description: '',
  //     control: {
  //       type: 'select',
  //       options: ['spinner', 'bar']
  //     }
  //   }
  // }
}

export const Default = ModalTemplate.bind({})
