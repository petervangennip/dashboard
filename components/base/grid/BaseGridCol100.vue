<template>
  <div
    class="col-100 grid grid-cols-12"
    :class="{ 'gap-4 lg:gap-6': !props.noGap }"
  >
    <div :class="indent">
      <slot />
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    noGap: {
      type: Boolean,
      default: false,
    },
    narrow: {
      type: Boolean,
      default: false,
    },
  });

  const indent = computed(() => {
    return props.narrow ? 'col-span-12 lg:col-start-3 lg:col-span-8 xl:col-start-4 xl:col-span-6' : 'col-span-12';
  });
</script>
