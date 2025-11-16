<script setup lang="ts">
import EIP7951C from '@/components/eips/EIP7951C.vue'
import HardforkView from '../HardforkView.vue'
import DancerView from '../DancerView.vue'
</script>

<template>
  <HardforkView>
    <Suspense>
      <EIP7951C />
    </Suspense>
    <DancerView nameId="fusaka" />
  </HardforkView>
</template>
