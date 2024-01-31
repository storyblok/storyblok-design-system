// adding global.css to Storybook Preview Area
import '../src/assets/styles/global.scss'
import './preview.scss'
import BlokInkPlugin from '../src/main'
import { setup } from '@storybook/vue3'

const customViewports = {
  xxs: {
    name: 'XXS',
    styles: {
      width: '320px',
      height: '568px',
    },
  },
  xs: {
    name: 'XS',
    styles: {
      width: '480px',
      height: '800px',
    },
  },
  sm: {
    name: 'SM',
    styles: {
      width: '640px',
      height: '960px',
    },
  },
  md: {
    name: 'MD',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  lg: {
    name: 'LG',
    styles: {
      width: '1024px',
      height: '768px',
    },
  },
  xl: {
    name: 'XL',
    styles: {
      width: '1280px',
      height: '800px',
    },
  },
  '2xl': {
    name: '2XL',
    styles: {
      width: '1536px',
      height: '864px',
    },
  },
}
setup((app) => {
  app.use(BlokInkPlugin)
})

export const parameters = {
  options: {
    storySort: {
      method: '',
      order: [
        'Introduction',
        'Design',
        'Basic',
        'Forms',
        'Navigation',
        'Data',
        'Interface',
      ],
      locales: '',
    },
  },
  viewport: {
    viewports: customViewports,
  },
}
