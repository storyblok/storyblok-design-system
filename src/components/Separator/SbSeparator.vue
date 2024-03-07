<template>
  <component
    :is="props.is"
    :class="{
      ['separator']: true,
      ['separator--horizontal']: props.orientation === 'horizontal',
      ['separator--vertical']: props.orientation === 'vertical',
      ['separator--centered']: props.centered,
      [`sb-my-${my}`]: props.my !== undefined,
      [`sb-mx-${mx}`]: props.mx !== undefined,
      [`sb-mt-${mt}`]: props.mt !== undefined,
      [`sb-mb-${mb}`]: props.mb !== undefined,
      [`sb-ml-${ml}`]: props.ml !== undefined,
      [`sb-mr-${mr}`]: props.mr !== undefined,
    }"
    :role="props.is !== 'hr' ? 'separator' : undefined"
  />
</template>

<script lang="ts" setup>
// TODO: use export from design tokens module instead. At the moment of writing this, such module has not yet been created.
export type Size = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export type SeparatorProps = {
  is?: string
  orientation?: 'vertical' | 'horizontal'
  centered?: boolean
  my?: Size
  mx?: Size
  mt?: Size
  mb?: Size
  ml?: Size
  mr?: Size
}
const props = withDefaults(defineProps<SeparatorProps>(), {
  is: 'hr',
  orientation: 'horizontal',
  centered: false,
  my: undefined,
  mx: undefined,
  mt: undefined,
  mb: undefined,
  ml: undefined,
  mr: undefined,
})
</script>
