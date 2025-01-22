# Storyblok's Design System

This Design System is an open-source collection of components that are used in app.storyblok.com and is continiously developed to improve Storyblok.

## Important Announcement: This Repository Will Be Archived

We want to inform you that this repository, will be archived on 2025-01-27. This means the repository will remain publicly accessible in a read-only state, but we will no longer actively maintain or update it for the foreseeable future. This also means that we will not update the NPM package.

### Why Is This Happening?

As our focus and priorities evolve, we’ve decided to pause active development on the public Design System. While this decision wasn’t made lightly, it allows us to direct our resources to other initiatives.

### What Does Archiving Mean?

- **Read-Only Access**: You’ll still be able to clone, fork, and view the repository’s contents.
- **No Updates or Support**: We won’t be addressing issues, reviewing pull requests, or providing updates.
- **Preservation of Content**: The repository will remain available to reference as-is for historical and educational purposes.

If you have questions or concerns, feel free to reach out via our support channels.

## Demo

You can see the Design System live under <https://next.blok.ink>

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

Then you can use all Blok.Ink components everywhere in your app.

```vue
<template>
  <SbIcon name="search" />
</template>
```

### Only install specific components

You can also only install a few components, by specifying the option `withComponents`.

```js
import BlokInk from '@storyblok/design-system'
import '@storyblok/design-system/dist/storyblok-design-system.css'

app.use(BlokInk, {
  withComponents: ['SbButton', 'SbIcon'],
})
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
