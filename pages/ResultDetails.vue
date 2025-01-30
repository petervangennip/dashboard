<template>
  <div class="p-8">
    <button
      class="mb-4 rounded bg-gray-300 px-4 py-2"
      @click="$router.back()"
    >
      Back
    </button>
    <h1 class="text-2xl font-bold">{{ result?.url }}</h1>

    <div class="mt-4 grid grid-cols-4 gap-4">
      <div class="bg-green-400 p-4">
        <h2 class="text-lg font-bold">Passes</h2>
        <p class="text-4xl">{{ result?.results?.passes.length }}</p>
      </div>
      <div class="bg-red-400 p-4">
        <h2 class="text-lg font-bold">Violations</h2>
        <p class="text-4xl">{{ result?.results?.violations.length }}</p>
      </div>
    </div>

    <div v-if="result?.results?.violations.length">
      <h2 class="mt-6 text-xl font-bold">Violations</h2>
      <ul>
        <li
          v-for="(violation, index) in result.results.violations"
          :key="index"
        >
          {{ violation.description }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const results = ref([]);

  onMounted(() => {
    const storedResults = JSON.parse(localStorage.getItem('results')) || [];
    results.value = storedResults;
  });

  const result = ref(null);
  onMounted(() => {
    result.value = results.value.find((r) => r.url === route.params.url);
  });
</script>
