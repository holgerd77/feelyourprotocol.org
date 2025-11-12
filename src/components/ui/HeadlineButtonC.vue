<script setup lang="ts">
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/solid'

defineProps({
  url: String,
})
</script>

<template>
  <span class="group relative inline-block">
    <a :href="url" target="_blank">
      <ArrowTopRightOnSquareIcon class="size-6 inline align-baseline text-blue-600" />
    </a>
    <span
      class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10"
    >
      {{ url }}
    </span>
  </span>
</template>
