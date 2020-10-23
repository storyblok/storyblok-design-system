<template>
  <div
    class="sb-modal-header"
    :class="{ 'sb-modal-header--left': returnAlignment }"
  >
    <SbIcon
      v-if="icon"
      :name="icon"
      size="x-large"
    />
    <h1 class="sb-modal-header__title">
      {{ title }}
    </h1>
    <slot />
  </div>
</template>

<script>
import SbIcon from '../../Icon'

export default {
  name: 'SbModalHeader',

  components: {
    SbIcon
  },

  props: {
    title: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    align: {
      type: String,
      default: 'center'
    }
  },
  computed: {
    returnAlignment () {
      return this.align === 'left'
    }
  }
}
</script>

<style lang="scss">
.sb-modal-header {
  width: 100%;
  min-height: 65px;
  margin: 0;
  padding: 35px;
  box-sizing: border-box;

  svg {
      margin: 0 auto;
      display: block;
      margin-bottom: 30px;
    }

    &--left {
      display: inline-flex;
      text-align: left;
      vertical-align: middle;
      line-height: 2;

      svg {
        margin: 0;
        margin-right: 25px;
      }
    }

  &__title {
    font-size: $text-header;
    font-weight: $font-weight-bold;
    text-align: center;
  }
}
</style>
