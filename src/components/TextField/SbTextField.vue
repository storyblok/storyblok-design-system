<template>
  <div class="sb-textfield">
    <label v-if="label" :for="id" class="sb-textfield__label">{{
      label
    }}</label>
    <div class="sb-textfield__inner">
      <span
        v-if="sideText && sideText.side == 'left'"
        class="sb-textfield__inner__input--with-text-model-left"
        >{{ sideText.text }}</span
      >
      <input
        :id="id"
        v-model="computedValue"
        class="sb-textfield__inner__input"
        :type="internalType"
        :placeholder="placeholder"
        :name="name"
        :value="nativeValue"
        :class="componentClasses"
        :required="required"
        :disabled="disabled"
      />
      <SbIcon
        v-if="icon && (withIconLeft || withIconRight || error)"
        :size="icon.size"
        :name="icon.name"
        :class="'sb-textfield__inner__sb-icon--' + icon.side"
      />
      <SbIcon
        v-if="clearable"
        size="small"
        name="x-clear"
        class="sb-textfield__inner__sb-icon--right"
        @click="computedValue = null"
      />
      <SbIcon
        v-if="icon && type == 'password'"
        size="small"
        :name="icon.name"
        class="sb-textfield__inner__sb-icon--right"
        @click="handleShowHidePassword"
      />
      <span
        v-if="sideText && sideText.side == 'right'"
        class="sb-textfield__inner__input--with-text-model-right"
        >{{ sideText.text }}</span
      >
    </div>
    <span v-if="error && errorMessage" class="sb-textfield__message--error">{{
      errorMessage
    }}</span>
  </div>
</template>

<script>
import SbIcon from '../Icon'
import TextfieldMixin from '../../mixins/textfield-mixin'

export default {
  name: 'SbTextField',

  components: { SbIcon },

  mixins: [TextfieldMixin],

  computed: {
    hasSpecialClass() {
      var specialClasses = []
      var inputClasses = [
        this.error && 'sb-textfield__inner__input--error',
        this.ghost && 'sb-textfield__inner__input--ghost',
      ]
      inputClasses.some((elem) => {
        if (elem !== false) {
          specialClasses.push(elem)
        }
      })
      if (specialClasses.length === 0) {
        specialClasses.push('sb-textfield__inner__input--default')
      }
      return specialClasses
    },
    hasIcon() {
      var icons = []
      var iconsClasses = [
        this.withIconLeft && 'sb-textfield__inner__input--with-icon-left',
        this.withIconRight && 'sb-textfield__inner__input--with-icon-right',
      ]
      iconsClasses.some((elem) => {
        if (elem !== false) {
          icons.push(elem)
        }
      })
      return icons
    },
    hasTextOnSide() {
      var textOnSide = []
      var textOnSideClasses = [
        this.withTextLeft && 'sb-textfield__inner__input--with-text-left',
        this.withTextRight && 'sb-textfield__inner__input--with-text-right',
      ]
      textOnSideClasses.some((elem) => {
        if (elem !== false) {
          textOnSide.push(elem)
        }
      })
      return textOnSide
    },
    componentClasses() {
      return (
        this.hasSpecialClass +
        ' ' +
        this.hasIcon +
        ' ' +
        this.hasTextOnSide
      ).replace(',', ' ')
    },
  },
  methods: {
    handleShowHidePassword() {
      this.internalType === 'password'
        ? (this.internalType = 'text')
        : (this.internalType = 'password')
      this.icon.name === 'eye-off'
        ? (this.icon.name = 'eye')
        : (this.icon.name = 'eye-off')
    },
  },
}
</script>
