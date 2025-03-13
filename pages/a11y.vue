<template>
  <section>
    <BaseGridContainer>
      <BaseGridCol100>
        <div class="flex h-screen">
          <div class="relative flex flex-1 flex-col">
            <LoaderSpinner v-if="loading" />

            <div class="col-span-12 mb-12 lg:col-span-6">
              <DashboardSearch @submit="addResult" />
            </div>

            <!-- Dashboard blocks -->
            <!-- <div class="mb-8 grid grid-cols-12 gap-x-8 gap-y-12">
              <div
                v-for="result in results"
                :key="result.id"
                class="col-span-12 lg:col-span-6"
              >
                <DashboardResult
                  :result="result"
                  @delete="deleteResult"
                />
              </div>
            </div> -->

            <!-- Grouped Dashboard -->
            <div class="mb-8 grid grid-cols-12 gap-x-8 gap-y-12">
              <div
                v-for="(pages, domain) in results"
                :key="domain"
                class="col-span-12 lg:col-span-6"
              >
                <!-- <div
                  class="relative cursor-pointer bg-white p-4 shadow"
                  @click="toggleDomain(domain)"
                >
                  <h2 class="text-lg font-semibold">{{ domain }}</h2>
                  <p class="text-sm text-gray-600">{{ pages.length }} pages checked</p>

                  <Icon
                    name="ph:caret-down"
                    class="absolute right-2 top-2 size-4 text-gray-950"
                    :class="{ 'rotate-180 transform transition-transform': isActive }"
                  />
                </div> -->

                <BaseCollapse class="accordion">
                  <BaseCollapseItem
                    id="1"
                    :icon-in-front="false"
                    :indent="false"
                  >
                    <template #header>
                      <div class="bg-tertiary-200 absolute right-2 top-2 z-10 flex rounded-full">
                        <Icon
                          name="ph:caret-down"
                          class="icon-pet size-6 transform text-gray-950 transition-transform"
                          :class="{ 'rotate-180': isActive }"
                        />
                      </div>
                      <div class="relative w-full cursor-pointer bg-white p-4 shadow">
                        <h2 class="text-left text-lg font-semibold">{{ domain }}</h2>
                        <p class="text-left text-sm text-gray-600">{{ pages.length }} pages checked</p>
                      </div>
                    </template>
                    <template #body>
                      <ul>
                        <li
                          v-for="page in pages"
                          :key="page.id"
                          class="py-8"
                        >
                          <DashboardResult
                            :result="page"
                            @delete="deleteResult"
                          />
                        </li>
                      </ul>
                    </template>
                  </BaseCollapseItem>
                </BaseCollapse>
              </div>
            </div>
          </div>
        </div>
      </BaseGridCol100>
    </BaseGridContainer>
  </section>
</template>

<script setup>
  const { $supabase } = useNuxtApp(); // This should now work correctly
  const loading = ref(false);
  const results = ref([]);

  // Extract domain from URL
  const extractDomain = (url) => {
    try {
      return new URL(url).hostname;
    } catch (error) {
      console.error('Invalid URL:', url);
      return null;
    }
  };

  // Function to Fetch Accessibility Results from Supabase
  const fetchResults = async () => {
    loading.value = true;
    const { data, error } = await $supabase.from('accessibility_results').select('*');

    if (error) {
      console.error('Error fetching results:', error);
    } else {
      // Group results by domain
      const grouped = data.reduce((acc, item) => {
        acc[item.domain] = acc[item.domain] || [];
        acc[item.domain].push(item);
        return acc;
      }, {});

      results.value = grouped;
    }
    loading.value = false;
  };

  // Function to Add a New URL & Store Results in Supabase
  const addResult = async (url) => {
    if (!url) {
      alert('Please enter a valid URL.');
      return;
    }

    loading.value = true;

    try {
      let urlsToCheck = [url];

      // Check if the input URL is a sitemap.xml file
      if (url.endsWith('.xml')) {
        const sitemapResponse = await fetch(url);
        if (!sitemapResponse.ok) throw new Error('Failed to fetch sitemap');

        const sitemapText = await sitemapResponse.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(sitemapText, 'text/xml');

        urlsToCheck = [...xmlDoc.querySelectorAll('loc')].map((loc) => loc.textContent);
      }

      for (const pageUrl of urlsToCheck) {
        console.log('Checking:', pageUrl);

        const domain = extractDomain(pageUrl);

        // Fetch accessibility results
        const a11yResponse = await $fetch('/api/a11y-check', {
          method: 'POST',
          body: { url: pageUrl },
        });

        if (a11yResponse?.data?.hasError) {
          console.error('Axe Error:', a11yResponse);
          continue; // Skip this URL and move to the next one
        }

        // Fetch Lighthouse scores
        // const lighthouseResponse = await $fetch('/api/lighthouse', {
        //   method: 'POST',
        //   body: { url: pageUrl },
        // });

        // if (lighthouseResponse?.error) {
        //   console.error('Lighthouse Error:', lighthouseResponse);
        //   continue; // Skip this URL
        // }

        const newResult = {
          url: pageUrl,
          domain, // Store domain
          accessibility_results: a11yResponse.results,
          // lighthouse_scores: lighthouseResponse,
          created_at: new Date().toISOString(),
        };

        // Store results in Supabase
        const { data, error } = await $supabase.from('accessibility_results').insert(newResult).select();

        if (error) {
          console.error('Error inserting:', error);
        } else {
          results.value = {
            ...results.value,
            [domain]: [...(results.value[domain] || []), ...data],
          };
        }
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while processing the URL.');
    } finally {
      loading.value = false;
    }
  };

  // Function to Remove Results from Supabase
  const deleteResult = async (id) => {
    if (!id) return;

    const confirmed = confirm('Are you sure you want to delete this result?');
    if (!confirmed) return;

    loading.value = true;

    const { error } = await $supabase.from('accessibility_results').delete().eq('id', id);

    if (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item.');
    } else {
      results.value = results.value.filter((item) => item.id !== id);
    }

    loading.value = false;
  };

  // Fetch results when component mounts
  onMounted(fetchResults);
</script>

<style lang="postcss">
  .accordion {
    .is-active {
      .icon-pet {
        @apply rotate-180 transform transition-transform;
      }
    }
  }
</style>
