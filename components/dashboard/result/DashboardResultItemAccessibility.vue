<template>
  <div
    class="rounded-sm border border-gray-900 py-4 shadow"
    :class="props.color"
  >
    <div class="flex flex-col items-center">
      <span class="mb-2 text-3xl font-bold leading-8">
        {{ props.length }}
      </span>
      <span class="text-base font-bold">{{ props.name }}</span>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    length: {
      type: [String, Number],
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
  });
</script>
