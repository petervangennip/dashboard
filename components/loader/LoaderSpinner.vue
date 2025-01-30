<template>
  <div
    class="absolute bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center"
    :class="props.isTransparent ? 'bg-white/5' : 'bg-black/40'"
  >
    <Icon name="svg-spinners:90-ring-with-bg" size="64px" class="text-primary-900" />
  </div>
</template>

<script setup>
const props = defineProps({
  isTransparent: {
    type: Boolean,
    default: false,
  },
});
</script>
