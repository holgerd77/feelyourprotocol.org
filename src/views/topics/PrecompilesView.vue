<script setup lang="ts">
import EIP7883C from '@/components/eips/EIP7883C.vue'
import TopicView from '../TopicView.vue'
</script>

<template>
  <TopicView>
    <suspense>
      <EIP7883C />
    </suspense>
  </TopicView>
</template>
