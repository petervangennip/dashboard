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
                <DashboardItemSearch @submit="addNewUrl" />
              </div>
              <!-- Results Grid -->
              <div
                v-for="result in results"
                :key="result.id"
                class="col-span-12 lg:col-span-6"
              >
                <nuxt-link
                  :to="{ name: `results-url`, params: { url: result.id } }"
                  class="no-underline"
                >
                  <DashboardMainBlock :result="result" />
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </BaseGridCol100>
    </BaseGridContainer>
  </section>
</template>

<script setup>
  import DashboardItemSearch from '~/components/dashboard/item/DashboardItemSearch.vue';

  const { $supabase } = useNuxtApp(); // This should now work correctly
  const loading = ref(false);
  const results = ref([]);

  // ✅ Function to Fetch Accessibility Results from Supabase
  const fetchResults = async () => {
    loading.value = true;
    const { data, error } = await $supabase.from('accessibility_results').select('*');

    if (error) {
      console.error('Error fetching results:', error);
    } else if (data) {
      results.value = data;
    }

    loading.value = false;
  };

  // ✅ Function to Add a New URL & Store Results in Supabase
  const addNewUrl = async (url) => {
    if (!url) {
      alert('Please enter a valid URL.');
      return;
    }

    loading.value = true;

    try {
      // Call API to check accessibility
      const response = await $fetch('/api/a11y-check', {
        method: 'POST',
        body: { url: url },
      });

      if (response?.data?.hasError) {
        console.error('Error:', response);
        alert('Failed to check accessibility.');
      } else {
        const newResult = {
          url: url,
          results: response.results,
          created_at: new Date().toISOString(),
        };

        // Insert data into Supabase and return inserted row
        const { data, error } = await $supabase.from('accessibility_results').insert(newResult).select();

        if (error) {
          console.error('Error inserting:', error);
          alert('Failed to save to database.');
        } else {
          results.value = [...results.value, ...data]; // Append the new row correctly
        }
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching accessibility data.');
    } finally {
      loading.value = false;
    }
  };

  // ✅ Fetch results when component mounts
  onMounted(fetchResults);
</script>
