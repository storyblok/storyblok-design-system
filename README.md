# Storyblok's Design System

This Design System is an open-source collection of components that are used in app.storyblok.com and is continiously developed to improve Storyblok.

## Demo

You can see the Design System live under <https://blok.ink>
## Compatibility 
The Design System is compatible with Vue.js 2 and Vue.js 3. For Vue 2 please use the versions below 3.0.0. For Vue 3 you need to use the version above >= 3.0.0

## Getting started

To install the Design System in your project you need to install the package first

```sh
npm install storyblok-design-system --save
yarn add storyblok-design-system
```

Then you need to install and use the Design System in your Vue project:

```js
import Vue from 'vue' // vue 2 only
import BlokInk from 'storyblok-design-system'
import 'storyblok-design-system/dist/storyblok-design-system.css'
 
Vue.use(BlokInk) // vue 2
app.use(BlokInk) // vue 3
```

For more information on the usage of the Design System go to:
[https://www.storyblok.com/docs/guide/in-depth/design-system](https://www.storyblok.com/docs/guide/in-depth/design-system)
## Development

To develop within the Design System you can use Storybook that has all components setup:
### Start & Execute Storybook
```sh
yarn # or npm install
yarn storybook
```

### Compiles and minifies for production
```sh
yarn build
```

### Run your unit tests
```sh
yarn test:unit
```

### Lints and fixes files
```sh
yarn lint
```


## Thanks to

<a href="https://www.chromatic.com/"><img src="https://user-images.githubusercontent.com/321738/84662277-e3db4f80-af1b-11ea-88f5-91d67a5e59f6.png" width="153" height="30" alt="Chromatic" /></a>

Thanks to [Chromatic](https://www.chromatic.com/) for providing the visual testing platform that helps us review UI changes and catch visual regressions.

---

<p align="center">
  <h5 align="center">Powered by <a href="https://www.storyblok.com/" title="link to the Storyblok website">Storyblok</a></h5>
</p>
