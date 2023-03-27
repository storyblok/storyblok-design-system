// adding global.css to Storybook Preview Area
import '../src/assets/styles/global.scss'
import './preview.css'
import BlokInkPlugin from '../src/main'
import { setup } from '@storybook/vue3';

setup((app) => {
  app.use(BlokInkPlugin)
})
