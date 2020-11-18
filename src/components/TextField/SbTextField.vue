<template>
  <div class="sb-textfield">
    <label v-if="label" :for="id" class="sb-textfield__label">{{
      label
    }}</label>
    <div class="sb-textfield__inner">
      <span
        v-if="prefix"
        class="sb-textfield__inner__input--with-text-model-left"
        >{{ prefix }}</span
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
        v-if="iconLeft && type != 'password'"
        size="small"
        :name="iconLeft"
        class="sb-textfield__inner__sb-icon--left"
      />
      <SbIcon
        v-if="(iconRight || error) && type != 'password'"
        size="small"
        :name="iconRight"
        class="sb-textfield__inner__sb-icon--right"
      />
      <SbIcon
        v-if="type == 'password'"
        size="small"
        :name="internalIconRight"
        class="sb-textfield__inner__sb-icon--right"
        @click="handleShowHidePassword"
      />
      <SbIcon
        v-if="clearable"
        size="small"
        name="x-clear"
        class="sb-textfield__inner__sb-icon--right"
        @click="computedValue = null"
      />
      <span
        v-if="suffix"
        class="sb-textfield__inner__input--with-text-model-right"
        >{{ suffix }}</span
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
  name: 'SbTextfield',

  components: { SbIcon },

  mixins: [TextfieldMixin],

  computed: {
    hasSpecialClass() {
      return [
        this.error && 'sb-textfield__inner__input--error',
        this.ghost && 'sb-textfield__inner__input--ghost',
        !this.error && !this.ghost && 'sb-textfield__inner__input--default',
      ]
    },
    hasIcon() {
      return [
        this.iconLeft && 'sb-textfield__inner__input--with-icon-left',
        this.iconRight && 'sb-textfield__inner__input--with-icon-right',
      ]
    },
    hasTextOnSide() {
      return [
        this.withTextLeft && 'sb-textfield__inner__input--with-text-left',
        this.withTextRight && 'sb-textfield__inner__input--with-text-right',
      ]
    },
    componentClasses() {
      return [...this.hasTextOnSide, ...this.hasIcon, ...this.hasSpecialClass]
    },
  },
  methods: {
    handleShowHidePassword() {
      this.internalType === 'password'
        ? (this.internalType = 'text')
        : (this.internalType = 'password')
      this.internalIconRight === 'eye'
        ? (this.internalIconRight = 'eye-off')
        : (this.internalIconRight = 'eye')
    },
  },
}
</script>
