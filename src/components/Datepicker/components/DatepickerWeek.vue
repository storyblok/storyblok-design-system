<template>
  <div class="sb-datepicker-week">
    <span v-for="weekLabel in WEEK_DAYS" :key="weekLabel">
      {{ weekLabel }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { WEEK_DAYS } from '../utils'
</script>
