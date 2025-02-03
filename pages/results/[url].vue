<template>
  <section>
    <BaseGridContainer>
      <BaseGridCol100>
        <div class="p-8">
          <button
            class="mb-4 rounded bg-gray-300 px-4 py-2"
            @click="$router.back()"
          >
            Back
          </button>

          <div class="mb-8 rounded bg-white p-8 shadow">
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
          </div>

          <!-- Results -->
          <div
            v-if="result?.results"
            class="mb-8 rounded bg-white p-8 shadow"
          >
            <h2 class="mb-4 text-xl font-bold">Accessibility Results</h2>

            <BaseCollapse
              v-if="result?.results?.violations && result?.results?.violations.length"
              :multiple="false"
              class="accordion"
            >
              <BaseCollapseItem id="1">
                <template #header>Violations</template>
                <template #body>
                  <ul class="list-disc pl-5">
                    <li
                      v-for="(violation, index) in result?.results?.violations"
                      :key="index"
                    >
                      <strong>{{ violation.id }}</strong
                      >: {{ violation.description }}
                      <ul class="list-disc pl-5 text-sm">
                        <li
                          v-for="(node, idx) in violation.nodes"
                          :key="idx"
                        >
                          Element: <code>{{ node.target }}</code> - {{ node.failureSummary }}
                        </li>
                      </ul>
                    </li>
                  </ul>
                </template>
              </BaseCollapseItem>
            </BaseCollapse>

            <BaseCollapse
              v-if="result?.results?.passes && result?.results?.passes.length"
              :multiple="false"
              class="accordion"
            >
              <BaseCollapseItem id="1">
                <template #header>Passes</template>
                <template #body>
                  <ul class="list-disc pl-5">
                    <li
                      v-for="(pass, index) in result?.results?.passes"
                      :key="index"
                    >
                      <strong>{{ pass.id }}</strong
                      >: {{ pass.description }}
                    </li>
                  </ul>
                </template>
              </BaseCollapseItem>
            </BaseCollapse>

            <!-- Incomplete -->
            <BaseCollapse
              v-if="result?.results?.incomplete && result?.results?.incomplete.length"
              :multiple="false"
              class="accordion"
            >
              <BaseCollapseItem id="1">
                <template #header>Incomplete</template>
                <template #body>
                  <ul class="list-disc pl-5">
                    <li
                      v-for="(incomplete, index) in result?.results?.incomplete"
                      :key="index"
                    >
                      <strong>{{ incomplete.id }}</strong
                      >: {{ incomplete.description }}
                    </li>
                  </ul>
                </template>
              </BaseCollapseItem>
            </BaseCollapse>

            <!-- Inapplicable -->
            <BaseCollapse
              v-if="result?.results?.inapplicable && result?.results?.inapplicable.length"
              :multiple="false"
              class="accordion"
            >
              <BaseCollapseItem id="1">
                <template #header>Inapplicable</template>
                <template #body>
                  <ul class="list-disc pl-5">
                    <li
                      v-for="(inapplicable, index) in result?.results.inapplicable"
                      :key="index"
                    >
                      <strong>{{ inapplicable.id }}</strong>
                    </li>
                  </ul>
                </template>
              </BaseCollapseItem>
            </BaseCollapse>
          </div>

          <div
            v-if="result?.results"
            class="rounded bg-white p-8 shadow"
          >
            <h2 class="mb-4 text-xl font-bold">Accessibility Results</h2>
            <!-- Additional Information -->
            <div class="mt-4">
              <h3 class="mb-2 text-lg font-semibold">Test Details</h3>
              <ul>
                <li>
                  <strong>Engine:</strong> {{ result?.results?.testEngine?.name }} v{{
                    result?.results?.testEngine?.version
                  }}
                </li>
                <li><strong>Environment:</strong> {{ result?.results?.testEnvironment?.userAgent }}</li>
                <li><strong>Runner:</strong> {{ result?.results?.testRunner?.name }}</li>
                <li><strong>URL Tested:</strong> {{ result?.results?.url }}</li>
                <li><strong>Timestamp:</strong> {{ result?.results?.timestamp }}</li>
              </ul>
            </div>
          </div>
        </div>
      </BaseGridCol100>
    </BaseGridContainer>
  </section>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useNuxtApp } from '#app';

  const { $supabase } = useNuxtApp();
  const route = useRoute();
  const result = ref(null);
  const loading = ref(false);

  // Function to fetch the result from Supabase based on the pretty URL
  const fetchResult = async () => {
    loading.value = true;

    try {
      const prettyUrl = route.params.url; // Get the pretty URL from the route params
      console.log('Fetching result for:', prettyUrl);
      const { data, error } = await $supabase.from('accessibility_results').select('*').eq('id', prettyUrl).single(); // Use .single() since we expect only one result

      if (error) {
        console.error('Error fetching result:', error);
      } else {
        result.value = data; // Set the result data
      }
    } catch (error) {
      console.error('Error fetching result:', error);
    } finally {
      loading.value = false;
    }
  };

  // Fetch the result when the component is mounted
  onMounted(fetchResult);
</script>
