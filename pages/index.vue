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
            <div class="mb-8 grid grid-cols-12 gap-x-8 gap-y-12">
              <!-- Results Grid -->
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

  // Function to Fetch Accessibility Results from Supabase
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

  // Function to Add a New URL & Store Results in Supabase
  const addResult = async (url) => {
    if (!url) {
      alert('Please enter a valid URL.');
      return;
    }

    loading.value = true;

    try {
      // Fetch accessibility results (Axe)
      const a11yResponse = await $fetch('/api/a11y-check', {
        method: 'POST',
        body: { url },
      });

      if (a11yResponse?.data?.hasError) {
        console.error('Axe Error:', a11yResponse);
        alert('Failed to check accessibility.');
        loading.value = false;
        return;
      }

      // Fetch Lighthouse scores from your new endpoint
      const lighthouseResponse = await $fetch('/api/lighthouse', {
        method: 'POST',
        body: { url },
      });

      console.log(lighthouseResponse);

      if (lighthouseResponse?.error) {
        console.error('Lighthouse Error:', lighthouseResponse);
        alert('Failed to fetch Lighthouse scores.');
        loading.value = false;
        return;
      }

      const newResult = {
        url: url,
        accessibility_results: a11yResponse.results,
        lighthouse_scores: lighthouseResponse, // Store the entire Lighthouse response
        created_at: new Date().toISOString(),
      };

      // Store results in Supabase
      const { data, error } = await $supabase.from('accessibility_results').insert(newResult).select();

      if (error) {
        console.error('Error inserting:', error);
        alert('Failed to save to database.');
      } else {
        results.value = [...results.value, ...data];
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching accessibility and Lighthouse data.');
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
