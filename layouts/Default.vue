<template>
  <main class="app">
    <AppHeader :progress="progress" />
    <slot />
  </main>
</template>

<script setup>
  import { usePageRotator } from '@/composables/usePageRotator';
  const { progress } = usePageRotator();
</script>
