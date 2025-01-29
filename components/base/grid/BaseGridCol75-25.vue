<template>
  <div
    class="col-7525 grid grid-cols-12"
    :class="{ 'gap-4 lg:gap-6': !props.noGap }"
  >
    <div class="col-span-12 lg:col-span-9">
      <slot name="col-1"></slot>
    </div>

    <div class="col-span-12 lg:col-span-3">
      <slot name="col-2"></slot>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    noGap: {
      type: Boolean,
      default: false,
    },
  });
</script>
