<script setup lang="ts">
import EIP7823EVM from '@/components/EIP7823EVM.vue'
</script>

<template>
  <div class="bg-blue-300 bg-clip-border p-5 rounded-xl">
    <div class="grid grid-cols-2 mb-3">
      <h3 class="font-bold text-xl text-blue-900">Modexp upper bounds</h3>
      <h3 class="font-mono text-right text-xl">EIP-7823</h3>
    </div>

    <div class="text-blue-900 font-mono text-xs mb-6">
      The modexp precompile provides upper bounds for the input values. There is a lot more to say
      here, but we won't say it right now.
    </div>

    <suspense>
      <EIP7823EVM />
    </suspense>
  </div>
</template>
