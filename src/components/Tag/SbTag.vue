<template>
  <div :class="computedClass" v-bind="$attrs">
    <SbAvatar
      v-if="user"
      class="sb-tag__avatar"
      :src="user.avatar"
      :friendly-name="user.friendly_name"
      :data-testid="`${dataTestid}-avatar`"
    />
    <span class="sb-tag__label" :data-testid="`${dataTestid}-label`">
      <slot>
        {{ label }}
      </slot>
    </span>
    <SbIcon
      v-if="closable"
      :data-testid="`${dataTestid}-remove-button`"
      v-tooltip="{
        label: 'Remove',
        position: 'bottom',
      }"
      name="x"
      size="small"
      @click="onClose"
    />
  </div>
</template>
<script>
import SbIcon from '../Icon'
import { Tooltip } from '../../directives'
import { includes } from '../../utils'
import { tagTypes } from './lib'
import SbAvatar from '../Avatar/SbAvatar.vue'

export default {
  name: 'SbTag',

  directives: {
    tooltip: Tooltip,
  },
  components: {
    SbAvatar,
    SbIcon,
  },
  props: {
    closable: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'light-grey',
      validator: (type) => includes(tagTypes, type),
    },
    user: {
      type: Object,
      default: null,
    },
  },

  emits: ['close'],

  computed: {
    dataTestid() {
      return this.$attrs['data-testid'] || 'sb-tag'
    },

    computedClass() {
      return [
        `sb-tag sb-tag--${this.type}`,
        { 'sb-tag--closable': this.closable },
      ]
    },
  },
  methods: {
    onClose(event) {
      this.$emit('close', event)
    },
  },
}
</script>
<style lang="scss" src="./tag.scss" />
