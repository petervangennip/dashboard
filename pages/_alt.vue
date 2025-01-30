<template>
  <section>
    <BaseGridContainer>
      <BaseGridCol100>
        <div class="flex h-screen overflow-hidden">
          <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <main>
              <LoaderSpinner v-if="loading" />

              <div class="p-4">
                <h1 class="h1 mb-6">Twentyseven Dashboard Overview</h1>
                <h1 class="mb-4 text-2xl font-bold">Accessibility Checker</h1>

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
                    class="bg-blue-500 hover:bg-blue-600 rounded px-4 py-2 text-white"
                  >
                    Check Accessibility
                  </button>
                </form>

                <div class="mb-8 grid grid-cols-12 gap-4">
                  <DashboardItem
                    v-if="results.passes && results.passes.length"
                    name="Passes"
                    :number="results?.passes.length"
                    color="bg-green-200"
                    class="col-span-3"
                  />

                  <DashboardItem
                    v-if="results.violations && results.violations.length"
                    name="Violations"
                    :number="results?.violations.length"
                    color="bg-red-200"
                    class="col-span-3"
                  />

                  <DashboardItem
                    v-if="results.incomplete && results.incomplete.length"
                    name="Incomplete"
                    :number="results?.incomplete.length"
                    color="bg-orange-200"
                    class="col-span-3"
                  />

                  <DashboardItem
                    v-if="results.inapplicable && results.inapplicable.length"
                    name="Inapplicable"
                    :number="results?.inapplicable.length"
                    color="bg-blue-200"
                    class="col-span-3"
                  />
                </div>

                <!-- Results -->
                <div
                  v-if="results"
                  class="mb-8 rounded bg-white p-4 shadow"
                >
                  <h2 class="mb-4 text-xl font-bold">Accessibility Results</h2>

                  <BaseCollapse
                    v-if="results.violations && results.violations.length"
                    :multiple="false"
                    class="accordion"
                  >
                    <BaseCollapseItem id="1">
                      <template #header>Violations</template>
                      <template #body>
                        <ul class="list-disc pl-5">
                          <li
                            v-for="(violation, index) in results.violations"
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
                    v-if="results.passes && results.passes.length"
                    :multiple="false"
                    class="accordion"
                  >
                    <BaseCollapseItem id="1">
                      <template #header>Passes</template>
                      <template #body>
                        <ul class="list-disc pl-5">
                          <li
                            v-for="(pass, index) in results.passes"
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
                    v-if="results.incomplete && results.incomplete.length"
                    :multiple="false"
                    class="accordion"
                  >
                    <BaseCollapseItem id="1">
                      <template #header>Incomplete</template>
                      <template #body>
                        <ul class="list-disc pl-5">
                          <li
                            v-for="(incomplete, index) in results.incomplete"
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
                    v-if="results.inapplicable && results.inapplicable.length"
                    :multiple="false"
                    class="accordion"
                  >
                    <BaseCollapseItem id="1">
                      <template #header>Inapplicable</template>
                      <template #body>
                        <ul class="list-disc pl-5">
                          <li
                            v-for="(inapplicable, index) in results.inapplicable"
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
                  v-if="results"
                  class="rounded bg-white p-4 shadow"
                >
                  <h2 class="mb-4 text-xl font-bold">Accessibility Results</h2>
                  <!-- Additional Information -->
                  <div class="mt-4">
                    <h3 class="mb-2 text-lg font-semibold">Test Details</h3>
                    <ul>
                      <li>
                        <strong>Engine:</strong> {{ results.testEngine?.name }} v{{ results.testEngine?.version }}
                      </li>
                      <li><strong>Environment:</strong> {{ results.testEnvironment?.userAgent }}</li>
                      <li><strong>Runner:</strong> {{ results.testRunner?.name }}</li>
                      <li><strong>URL Tested:</strong> {{ results.url }}</li>
                      <li><strong>Timestamp:</strong> {{ results.timestamp }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </BaseGridCol100>
    </BaseGridContainer>
  </section>
</template>

<script setup>
  import data from '@/components/results.json';
  const url = ref('');
  // const results = ref(null);
  const loading = ref(false);

  const results = ref(data);

  useSeoMeta({
    title: 'Twentyseven Dashboard',
    description: 'Twentyseven Dashboard',
  });

  const checkAccessibility = async () => {
    // Show loader
    loading.value = true;

    // if (!url.value) {
    //   alert("Please enter a valid URL.");
    //   return;
    // }

    try {
      const response = await $fetch('/api/a11y-check', {
        method: 'POST',
        body: { url: 'https://www.twentysevenagency.com' },
        // body: { url: url.value },
      });

      if (response?.data?.hasError) {
        console.error('Error:', response);
        alert('Failed to check accessibility.');
      } else {
        results.value = response.results;
      }
    } catch {
      // handle network or other errors
    } finally {
      // Hide loader
      loading.value = false;
    }
  };

  // checkAccessibility();
</script>
