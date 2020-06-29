// importing the addons
import { action } from '@storybook/addon-actions';
import { withKnobs, text, select } from '@storybook/addon-knobs';

// importing the component
import SBButton from '../src/components/Button';

// default export defines configurations to all stories
export default {
  title: 'Button',
  component: SBButton,
  decorators: [withKnobs]
};

// each named export will be a story
export const Text = () => ({
  components: { SBButton },
  template: '<SBButton @click="action" label="Click me" />',
  methods: {
    action: action('clicked')
  },
});

export const buttonWithKnobs = () => ({
  components: { SBButton },
  template: '<SBButton :label="label" :type="type" />',
  props: {
    label: {
      default: text('Label', 'Click me')
    },
    type: {
      default: select('Type', ['danger', 'primary'])
    }
  }
})
