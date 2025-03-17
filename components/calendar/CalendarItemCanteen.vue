<template>
  <p
    v-if="props?.event?.summary"
    class="mb-4 text-xl font-bold"
  >
    {{ props?.event.summary }}
  </p>
  <div v-if="props?.event?.start?.date && props?.event?.end?.date">
    <span
      v-if="props?.event?.start?.date"
      class="rounded-sm border border-gray-300 bg-gray-200 px-3 py-1 text-sm"
    >
      {{ formatIsoDate(props?.event.start.date, 'dd-MM-yyyy') }}
    </span>
  </div>
</template>

<script setup>
  const props = defineProps({
    event: {
      type: Object,
      default: () => {},
    },
  });
</script>
