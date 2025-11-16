<script setup lang="ts">
import EIP7883C from '@/components/eips/EIP7883C.vue'
import EIP7951C from '@/components/eips/EIP7951C.vue'
import DancerView from '../DancerView.vue'
import TopicView from '../TopicView.vue'
</script>

<template>
  <TopicView>
    <suspense>
      <EIP7883C />
    </suspense>
    <DancerView nameId="precompiles" />
    <Suspense>
      <EIP7951C />
    </Suspense>
  </TopicView>
</template>
