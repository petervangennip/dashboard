<template>
  <div class="border bg-white px-8 py-6 shadow">
    <p
      v-if="props.result?.created_at"
      class="mb-8 w-fit rounded-sm bg-gray-200 px-2 py-1 text-sm"
    >
      {{ formatIsoDate(props.result.created_at, 'dd-MM-yyyy') }}
    </p>
    <h3 class="mb-8 font-semibold">{{ result.url }}</h3>

    <div class="grid grid-cols-4 gap-4">
      <DashboardMainBlockItem
        v-if="props.result?.results?.passes"
        :length="props.result.results.passes.length"
        color="bg-green-400"
        name="Passes"
      />

      <DashboardMainBlockItem
        v-if="props.result?.results?.violations"
        :length="props.result.results.violations.length"
        color="bg-red-400"
        name="Violations"
      />

      <DashboardMainBlockItem
        v-if="props.result?.results?.inapplicable"
        :length="props.result.results.inapplicable.length"
        color="bg-yellow-400"
        name="Inapplicable"
      />

      <DashboardMainBlockItem
        v-if="props.result?.results?.incomplete"
        :length="props.result.results.incomplete.length"
        color="bg-blue-400"
        name="Incomplete"
      />
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    result: {
      type: Object,
      default: () => ({}),
    },
  });
</script>
