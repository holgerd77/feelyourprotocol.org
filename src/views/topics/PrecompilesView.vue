<script setup lang="ts">
import EIP7951C from '@/components/eips/EIP7951C.vue'
import DancerView from '../DancerView.vue'
import TopicView from '../TopicView.vue'
</script>

<template>
  <TopicView>
    <suspense>
      <EIP7951C />
    </suspense>
    <DancerView nameId="precompiles" />
  </TopicView>
</template>
