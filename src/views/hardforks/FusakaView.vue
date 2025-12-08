<script setup lang="ts">
import EIP7594C from '@/components/eips/EIP7594C.vue'
import EIP7951C from '@/components/eips/EIP7951C.vue'
import HardforkView from '../HardforkView.vue'
import DancerView from '../DancerView.vue'
</script>

<template>
  <HardforkView>
    <Suspense>
      <EIP7594C />
    </Suspense>
    <DancerView nameId="fusaka" />
    <Suspense>
      <EIP7951C />
    </Suspense>
  </HardforkView>
</template>
