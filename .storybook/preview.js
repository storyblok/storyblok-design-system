// adding global.css to Storybook Preview Area
import '../src/assets/styles/global.scss'
import './preview.css'
import BlokInkPlugin from '../src/main'
import { setup } from '@storybook/vue3';

setup((app) => {
  app.use(BlokInkPlugin)
})

export const parameters = {
  layout: 'centered',
  options: {
    storySort: {
      method: '',
      order: ['Introduction', 'Design', 'Basic', 'Forms', 'Navigation', 'Data', 'Interface'],
      locales: '',
    },
  },
};
