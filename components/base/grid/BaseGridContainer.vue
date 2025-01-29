<template>
  <div
    :id="props.anchorId"
    class="container mx-auto px-4"
  >
    <slot />
  </div>
</template>

<script setup>
  const props = defineProps({
    anchorId: {
      type: String,
      default: null,
    },
  });
</script>
