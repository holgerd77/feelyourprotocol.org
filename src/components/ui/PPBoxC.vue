<script setup lang="ts">
import { PP_BOX, PP_BOX_TITLE } from '../lib/layout'

defineProps<{
  title: string
  left?: boolean
}>()
</script>

<template>
  <div :class="[PP_BOX, left ? 'text-left pre-hardfork' : 'text-right post-hardfork', 'pp-box']">
    <div class="mb-2.5">
      <span :class="PP_BOX_TITLE">{{ title }}</span>
    </div>
    <slot />
  </div>
</template>
