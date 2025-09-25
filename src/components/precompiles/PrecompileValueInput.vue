<script setup lang="ts">
defineProps(['title', 'len', 'hex'])
</script>

<template>
  <div class="bg-blue-400 bg-clip-border p-2 rounded-md mb-3">
    <div class="grid grid-cols-2 items-center">
      <p class="font-bold text-2xl text-blue-900">{{ title }}</p>
      <p class="text-right">
        <slot></slot>
      </p>

      <p class="font-semibold text-xs text-shadow-slate-500">{{ len }} Bytes</p>
      <p class="text-right font-mono text-sm text-slate-700 m-1">
        {{ hex }}
      </p>
    </div>
  </div>
</template>
