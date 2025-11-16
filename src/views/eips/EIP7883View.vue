<script setup lang="ts">
import EIPView from '../EIPView.vue'
import EIP7883C from '@/components/eips/EIP7883C.vue'
import DancerView from '../DancerView.vue'
</script>

<template>
  <EIPView>
    <EIP7883C />
    <DancerView nameId="precompiles" />
  </EIPView>
</template>
