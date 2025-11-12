<script setup lang="ts">
withDefaults(
  defineProps<{
    nameId?: string
    hasBorder?: boolean
  }>(),
  {
    hasBorder: true,
  },
)

const getImageUrl = (nameId: string) =>
  new URL(`../assets/imgs/dancers/${nameId}.webp`, import.meta.url).href
</script>

<template>
  <div
    :class="{ 'border-2': hasBorder ?? true }"
    class="border-blue-200 bg-clip-border p-6 rounded-xl"
  >
    <img v-if="nameId" :src="getImageUrl(nameId)" />
    <div v-else class="text-center p-6 mt-20 text-blue-900 text-2xl font-bold">Dancer missing.</div>
  </div>
</template>
