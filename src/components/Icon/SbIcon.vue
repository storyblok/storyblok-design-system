<template>
  <svg
    :class="classes"
    :role="role || 'presentation'"
    :viewBox="icon.viewBox"
    v-on="$listeners"
    v-html="icon.path"
  ></svg>
</template>

<script>
import iconPaths from '../../lib/internal-icons'
import { availableColors } from '../../utils'
import { iconSizes } from './utils'

export default {
  name: 'SbIcon',
  props: {
    color: {
      type: String,
      default: null,
      validator: (color) => availableColors.indexOf(color) !== -1,
    },
    backgroundColor: {
      type: String,
      default: null,
      validator: (color) => availableColors.indexOf(color) !== -1,
    },
    name: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: 'presentation',
    },
    size: {
      type: String,
      default: null,
      validator: (size) => iconSizes.indexOf(size) !== -1,
    },
  },
  computed: {
    icon() {
      const iconDeff = iconPaths[this.name]

      if (!iconDeff) {
        console.warn(`[SbIcon] - this ${this.name} icon does not exists`)
      }

      return {
        path: iconDeff ? iconDeff.path : '',
        viewBox: iconDeff ? iconDeff.viewbox || '0 0 24 24' : '',
      }
    },
    classes() {
      return [
        'sb-icon',
        this.size ? `sb-icon--${this.size}` : null,
        this.color ? `sb-icon--color-${this.color}` : null,
        this.backgroundColor ? `sb-icon--bg-${this.backgroundColor}` : null,
      ]
    },
  },
}
</script>

<style lang="scss">
$icon-colors: (
  'primary': $color-primary,
  'primary-dark': $color-primary-dark,
  'secondary': $color-secondary,
  'positive': $color-positive,
  'negative': $color-negative,
  'warning': $color-warning,
  'white': $color-white,
  'green': $green,
  'yellow': $yellow,
  'blue': $blue,
  'orange': $orange,
  'light': $light,
  'light-gray': $light-gray,
);

$bg-colors: (
  'primary': $sb-green-25,
  'primary-dark': $sb-dark-blue-25,
  'secondary': $sb-green-25,
  'positive': $green-25,
  'negative': $red-25,
  'warning': $orange-25,
  'white': $color-white,
  'green': $green-25,
  'yellow': $yellow-25,
  'blue': $blue-25,
  'orange': $orange-25,
  'light': $light-25,
  'light-gray': $light,
);

@mixin setIconSize($size) {
  width: $size;
  height: $size;
}

@mixin setIconColor($color) {
  color: $color;
  fill: $color;
}

.sb-icon {
  @include setIconSize($icon-default-size);
  @include setIconColor(currentColor);

  display: inline-block;
  vertical-align: middle;
  stroke-width: 2px;

  &--small {
    @include setIconSize($icon-small-size);
  }

  &--large {
    @include setIconSize($icon-large-size);
  }

  &--x-large {
    @include setIconSize($icon-extra-large-size);
  }

  &--color {
    @each $name, $colorVariable in $icon-colors {
      &-#{$name} {
        @include setIconColor($colorVariable);
      }
    }
  }

  &--bg {
    @each $name, $colorVariable in $bg-colors {
      &-#{$name} {
        padding: 12px;
        background-color: $colorVariable;
        border-radius: 100%;
      }
    }
  }
}
</style>
