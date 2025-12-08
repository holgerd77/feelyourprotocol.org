<script setup lang="ts">
import { PP_BOX_TEXT_SMALL } from '../lib/layout'

defineProps<{
  text: string
}>()
</script>

<template>
  <p :class="[PP_BOX_TEXT_SMALL, 'm-5', 'text-center']">{{ text }}</p>
</template>
