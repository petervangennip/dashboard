<template>
  <div class="col-span-3">
    <div class="border bg-white px-8 py-6 shadow">
      <h2 class="font-semibold">{{ props.name }}</h2>
      <p class="text-7xl font-bold">{{ props.number }}</p>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    name: {
      type: String,
      default: '',
    },
    number: {
      type: [String, Number],
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
  });
</script>
