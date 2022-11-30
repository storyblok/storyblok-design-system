# Storyblok's Design System

This Design System is an open-source collection of components that are used in app.storyblok.com and is continiously developed to improve Storyblok.

## Demo

You can see the Design System live under <https://new.blok.ink>

## Compatibility 
The `@storyblok/design-system` package is compatible with Vue 3 only. For Vue 2, please use the `storyblok-design-system` package.

## Getting started

To install the Design System in your project you need to install the package first

```sh
npm install @storyblok/design-system --save
yarn add @storyblok/design-system
```

Then you need to install and use the Design System in your Vue project:

```js
import BlokInk from '@storyblok/design-system'
import '@storyblok/design-system/dist/storyblok-design-system.css'
 
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


---

<p align="center">
  <h5 align="center">Powered by <a href="https://www.storyblok.com/" title="link to the Storyblok website">Storyblok</a></h5>
</p>
