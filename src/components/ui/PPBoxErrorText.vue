<script setup lang="ts">
import { PP_BOX_TEXT_SMALL } from '../lib/layout'

defineProps<{
  text: string
}>()
</script>

<template>
  <div :class="[PP_BOX_TEXT_SMALL, 'm-5', 'text-center']">
    <p class="text-red-400">
      {{ text }}
    </p>
    <p class="mt-2">(Wrong error? Report on GitHub.)</p>
  </div>
</template>
