<template>
  <SelectButton
    v-bind="props"
    :class="activeClasses"
    :pt="{
      root: 'sb-group-button',
      button: 'sb-group-button__button',
    }"
    unstyled
    @update:model-value="handleUpdateModelValue"
  >
    <template #option="slotProps">
      <SbButton
        :variant="props.variant"
        :size="props.size"
        :type="props.type"
        :is-borderless="props.isBorderless"
        :is-transparent="props.isTransparent"
        v-bind="{ ...slotProps.option }"
        @keyup.enter="
          handleUpdateModelValue(slotProps.option[props.optionValue])
        "
      />
    </template>
  </SelectButton>
</template>

<script lang="ts" setup>
import SelectButton from 'primevue/selectbutton'
import SbButton from '../Button'
import { computed } from 'vue'
import { availableVariants, availableButtonsTypes } from '../Button/lib'
import { availableSizes } from '../../utils'

const props = defineProps({
  modelValue: null,
  options: {
    type: Array,
    default: () => [],
  },
  optionLabel: {
    type: String,
    default: 'label',
  },
  optionValue: {
    type: String,
    default: 'value',
  },
  optionDisabled: null,
  multiple: Boolean,
  unselectable: {
    type: Boolean,
    default: true,
  },
  allowEmpty: {
    type: Boolean,
    default: true,
  },
  disabled: Boolean,
  dataKey: null,
  ariaLabelledby: {
    type: String,
    default: null,
  },
  hasSpaces: {
    type: Boolean,
  },
  isBorderless: {
    type: Boolean,
    default: false,
  },
  isTransparent: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    validator: (size: string) => availableSizes.includes(size),
    default: 'small',
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (type: string) => availableVariants.includes(type),
  },
  type: {
    type: String,
    default: null,
    validator: (type: string) => availableButtonsTypes.includes(type),
  },
  pt: {
    type: Object,
    default: () => ({}),
  },
})

const emits = defineEmits(['update:modelValue'])

const activeClasses = computed(() => {
  return {
    'sb-group-button--has-spaces': props.hasSpaces,
  }
})

const handleUpdateModelValue = (optionValue: string) => {
  emits('update:modelValue', optionValue)
}
</script>

<style lang="scss" src="./group-button.scss" />
