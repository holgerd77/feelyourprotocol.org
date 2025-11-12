<script setup lang="ts">
import TooltipC from './TooltipC.vue'

defineProps({
  icon: Object,
  tooltip: String,
})
</script>

<template>
  <span class="group relative inline-block">
    <component
      :is="icon"
      class="size-4 inline align-baseline border-blue-900 border-1 text-blue-900 p-0.5 rounded-xs"
    />
    <TooltipC :tooltip="tooltip" />
  </span>
</template>
