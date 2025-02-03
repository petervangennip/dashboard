<template>
  <section>
    <BaseGridContainer>
      <BaseGridCol100>
        <div class="flex h-screen overflow-hidden">
          <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <LoaderSpinner v-if="loading" />

            <!-- Dashboard blocks -->
            <div class="mb-8 grid grid-cols-12 gap-8">
              <div class="col-span-12 lg:col-span-6">
                <div class="h-full border bg-white px-8 py-6 shadow">
                  <form
                    class="mb-6"
                    @submit.prevent="checkAccessibility"
                  >
                    <label
                      for="url"
                      class="mb-2 block text-sm font-medium"
                      >Website URL</label
                    >
                    <input
                      id="url"
                      v-model="url"
                      type="text"
                      placeholder="https://example.com"
                      class="mb-4 w-full rounded border p-2"
                    />
                    <button
                      type="submit"
                      class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                      @click="addResult"
                    >
                      Submit new site
                    </button>
                  </form>
                </div>
              </div>

              <!-- <DashboardMainBlock
                v-for="(result, index) in results"
                :key="index"
                :name="result.url"
                :number="result.passes.length"
                class="col-span-12 lg:col-span-6"
              /> -->

              <div
                v-for="(result, index) in results"
                :key="index"
                class="col-span-12 lg:col-span-6"
              >
                <nuxt-link
                  :to="{ name: 'details', params: { url: result.url } }"
                  class="no-underline"
                >
                  <div class="border bg-white px-8 py-6 shadow">
                    <p class="mb-8 w-fit rounded-sm bg-gray-200 px-2 py-1 text-sm">
                      {{ formatIsoDate(result.results.timestamp, 'dd-MM-yyyy') }}
                    </p>
                    <h3 class="mb-8 font-semibold">{{ result.url }}</h3>

                    <div class="grid grid-cols-4 gap-4">
                      <div class="border-2 border-gray-500 bg-green-400 py-4">
                        <div class="flex flex-col items-center">
                          <span class="mb-2 text-5xl font-bold leading-10">{{ result.results.passes.length }}</span>
                          <span class="text-lg font-bold uppercase">Passes</span>
                        </div>
                      </div>

                      <div class="border-2 border-gray-500 bg-red-400 py-4">
                        <div class="flex flex-col items-center">
                          <span class="mb-2 text-5xl font-bold leading-10">{{ result.results.violations.length }}</span>
                          <span class="text-lg font-bold uppercase">violations</span>
                        </div>
                      </div>

                      <div class="border-2 border-gray-500 bg-yellow-400 py-4">
                        <div class="flex flex-col items-center">
                          <span class="mb-2 text-5xl font-bold leading-10">{{
                            result.results.inapplicable.length
                          }}</span>
                          <span class="text-lg font-bold uppercase">inapplicable</span>
                        </div>
                      </div>

                      <div class="border-2 border-gray-500 bg-blue-400 py-4">
                        <div class="flex flex-col items-center">
                          <span class="mb-2 text-5xl font-bold leading-10">{{ result.results.incomplete.length }}</span>
                          <span class="text-lg font-bold uppercase">Incomplete</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </nuxt-link>
              </div>
            </div>

            <!-- Accessibility Results -->
            <div
              v-if="results"
              class="mb-8 rounded bg-white p-4 shadow"
            >
              <h2 class="mb-4 text-xl font-bold">Accessibility Results</h2>
              <!-- Collapse components for violations, passes, etc. -->
            </div>
          </div>
        </div>
      </BaseGridCol100>
    </BaseGridContainer>
  </section>
</template>

<script setup>
  import { ref, watch, onMounted } from 'vue';
  import { supabase } from '@/utils/supabaseClient';

  // Declare a variable for storing results
  // const results = ref([]);
  // import data from '@/components/results.json';

  const newUrl = ref('');
  const loading = ref(false);
  const results = ref(data);

  // Check for localStorage availability and load results from it
  onMounted(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('results')) {
      results.value = JSON.parse(localStorage.getItem('results'));
    }
  });

  // Watch for changes in the results array and save them to localStorage
  watch(results, (newResults) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('results', JSON.stringify(newResults));
    }
  });

  const addResult = async () => {
    if (!newUrl.value) {
      alert('Please enter a valid URL.');
      return;
    }

    loading.value = true;

    try {
      // Make API call to fetch accessibility data
      const response = await $fetch('/api/a11y-check', {
        method: 'POST',
        body: { url: newUrl.value },
      });

      if (response?.data?.hasError) {
        console.error('Error:', response);
        alert('Failed to check accessibility.');
      } else {
        const newResult = {
          url: newUrl.value,
          results: response.results,
        };
        // Add the result to the dashboard
        results.value.push(newResult);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching accessibility data.');
    } finally {
      loading.value = false;
    }

    // Reset input field
    newUrl.value = '';
  };
</script>
