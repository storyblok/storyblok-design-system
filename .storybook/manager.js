import { addons } from '@storybook/addons'
import storyblokTheme from './theme'

addons.setConfig({
  theme: storyblokTheme,
  panelPosition: 'right',
  addons: ['@storybook/addon-a11y']
})
