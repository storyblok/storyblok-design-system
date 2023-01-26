import { addons } from '@storybook/addons'
import storyblokTheme from './theme'

addons.setConfig({
  theme: storyblokTheme,
  addons: ['@storybook/addon-viewport', '@storybook/addon-a11y']
})
