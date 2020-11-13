<template>
  <div class="sb-textfield">
    <label v-if="label" :for="id" class="sb-textfield__label">{{
      label
    }}</label>
    <div class="sb-textfield__inner">
      <input
        :id="id"
        v-model="computedValue"
        class="sb-textfield__inner__input"
        :type="type"
        :placeholder="placeholder"
        :name="name"
        :value="nativeValue"
        :class="componentClasses"
        :required="required"
        :disabled="disabled"
      />
      <SbIcon
        v-if="icon"
        :size="icon.size"
        :name="icon.name"
        :class="'sb-textfield__inner__sb-icon--' + icon.side"
      />
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
    typeClass() {
      return [
        this.error && 'sb-textfield__inner__input--error',
        this.clearable && 'sb-textfield__inner__input--clearable',
        this.ghost && 'sb-textfield__inner__input--ghost',
        this.withIconBefore && 'sb-textfield__inner__input--with-icon-before',
        this.withIconAfter && 'sb-textfield__inner__input--with-icon-after',
        this.withTextLeft && 'sb-textfield__inner__input--with-text-left',
        this.withTextRight && 'sb-textfield__inner__input--with-text-right',
      ]
    },
    componentClasses() {
      return this.typeClass.some((elem) => elem !== false)
        ? this.typeClass
        : 'sb-textfield__inner__input--default'
    },
  },
}
</script>
