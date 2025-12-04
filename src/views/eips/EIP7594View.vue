<script setup lang="ts">
import EIPView from '../EIPView.vue'
import EIP7594C from '../../components/eips/EIP7594C.vue'
import DancerView from '../DancerView.vue'
</script>

<template>
  <EIPView>
    <EIP7594C />
    <DancerView nameId="fusaka" />
  </EIPView>
</template>
