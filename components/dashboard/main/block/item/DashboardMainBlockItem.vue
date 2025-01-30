<template>
  <div
    class="border-2 border-gray-500 py-4"
    :class="props.color"
  >
    <div class="flex flex-col items-center">
      <span class="mb-2 text-5xl font-bold leading-10">
        {{ props.length }}
      </span>
      <span class="text-lg font-bold uppercase">{{ props.name }}</span>
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
