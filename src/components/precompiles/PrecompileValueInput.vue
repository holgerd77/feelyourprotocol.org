<script setup lang="ts">
defineProps(['title', 'len', 'hex'])
</script>

<template>
  <div class="bg-blue-400 bg-clip-border p-2 rounded-md mb-1">
    <div class="grid grid-cols-4 items-center">
      <p class="font-bold text-2xl col-span-1 text-blue-900">{{ title }}</p>
      <slot></slot>

      <p class="font-semibold col-span-1 text-xs text-shadow-slate-500">{{ len }} Bytes</p>
      <p
        class="text-right font-mono col-span-3 text-xs text-slate-700 mt-1 break-words w-full overflow-hidden"
      >
        {{ hex }}
      </p>
    </div>
  </div>
</template>
