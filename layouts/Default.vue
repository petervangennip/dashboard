<template>
  <main class="app bg-white dark:bg-gray-800">
    <AppHeader :progress="progress" />
    <slot />
  </main>
</template>

<script setup>
  import { usePageRotator } from '@/composables/usePageRotator';
  const { progress } = usePageRotator();
</script>
