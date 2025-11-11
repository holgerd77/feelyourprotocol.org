<script setup lang="ts">
import HeadlineButtonC from '@/components/ui/HeadlineButtonC.vue'
import TooltipC from '@/components/ui/TooltipC.vue'
import { useRoute } from 'vue-router'
import { TOPICS, type Topic } from './lib/structure'

const route = useRoute()
// @ts-expect-error route.name doesn't seem to be properly typed
const topic: Topic = TOPICS[route.name]
</script>

<template>
  <main>
    <div class="grid grid-cols-1 mb-3">
      <p class="text-right text-3xl">
        <HeadlineButtonC :url="topic.url" />
        <span class="ml-3">{{ topic.title }}</span>
      </p>
    </div>
    <TooltipC :tooltip="topic.url" />
    <div class="grid md:grid-cols-2 gap-4">
      <slot></slot>
    </div>
  </main>
</template>
