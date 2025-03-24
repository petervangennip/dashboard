<template>
  <div class="h-2 w-full overflow-hidden bg-gray-200">
    <div
      class="h-full bg-green-500"
      :class="transitionClass"
      :style="{ width: progress + '%' }"
    ></div>
  </div>
</template>

<script setup>
  const props = defineProps({
    progress: {
      type: Number,
      required: true,
    },
  });

  // Disable transition when progress is reset to 0%
  const transitionClass = computed(() =>
    props.progress === 0 ? 'no-transition' : 'transition-[width] duration-1000 ease-linear',
  );
</script>

<style>
  .no-transition {
    transition: none !important;
  }
</style>
