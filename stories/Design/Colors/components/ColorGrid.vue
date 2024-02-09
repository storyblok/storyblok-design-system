<script lang="ts" setup>
import { colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";
import ContrastResult from "./ContrastResult.vue";

extend([a11yPlugin]);

defineProps({
  colorsArr: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <table>
    <thead>
      <tr>
        <th v-for="columnColor in colorsArr" :style="{ color: columnColor.hex }"
          :key="columnColor.name" :id="columnColor.name">
        <td>
          {{ columnColor.parentColor }}-{{ columnColor.name }} <br>
          {{ columnColor.hex }} <br>
        </td>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(rowColor, rowKey) in colorsArr" :style="{ backgroundColor: rowColor.hex }">
        <td
          :style="{ display: 'grid', gridTemplateColumns: '1fr 4fr', textShadow: '0px 1px 2px ' + black, 'grid-gap': '5px' }">
          <div :style="{ backgroundColor: rowColor.hex }"></div>
          <div>
            {{ rowColor.parentColor }}-{{ rowColor.name }} <br>
            {{ rowColor.hex }} <br>
          </div>

        </td>
        <td v-for="(columnColor, columnKey) in colorsArr"
          :style="{ backgroundColor: rowColor.hex, color: columnColor.hex }">
          <ContrastResult :rowColor="rowColor" :colColor="columnColor" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
</style>
