<template>
  <div
    class="col-252550 grid grid-cols-12"
    :class="{ 'gap-4 lg:gap-6': !props.noGap }"
  >
    <div class="col-span-12 md:col-span-6 lg:col-span-3">
      <slot name="col-1"></slot>
    </div>

    <div class="col-span-12 md:col-span-6 lg:col-span-3">
      <slot name="col-2"></slot>
    </div>

    <div class="col-span-12 md:col-span-6 lg:col-span-6">
      <slot name="col-3"></slot>
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
