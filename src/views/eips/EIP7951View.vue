<script setup lang="ts">
import EIPView from '../EIPView.vue'
import EIP7951C from '@/components/eips/EIP7951C.vue'
import DancerView from '../DancerView.vue'
</script>

<template>
  <EIPView>
    <EIP7951C />
    <DancerView nameId="precompiles" />
  </EIPView>
</template>
