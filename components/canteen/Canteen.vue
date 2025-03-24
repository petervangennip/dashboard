<template>
  <div class="calendar relative">
    <section class="mb-8">
      <h2 class="mb-8">
        <Icon
          name="twemoji:fork-and-knife"
          class="mr-2 size-8"
        />
        Eerstvolgende Kantinedienst
      </h2>

      <LoaderSpinnerSimple
        v-if="isLoading"
        :is-transparent="true"
      />

      <div
        class="relative mb-4 max-w-[33%] rounded-sm border-2 border-gray-600 bg-white p-4 text-center shadow-md transition-all duration-300"
      >
        <CalendarItemCanteen :event="nextCanteenEvent" />
      </div>
    </section>
  </div>
</template>

<script setup>
  const canteenData = ref(null);
  const isLoading = ref(true);

  // Fetch Canteen events
  async function fetchCanteenEvents() {
    try {
      const response = await fetch('/api/google-events-canteen-service'); // Call the backend route
      const result = await response.json();

      // Assign sorted events to data
      canteenData.value = result;
    } catch (error) {
      console.error('Error fetching calendar events:', error);
    } finally {
      isLoading.value = false; // Hide loader once data is fetched
    }
  }

  const nextCanteenEvent = computed(() => {
    if (!canteenData.value || !canteenData.value.items) return null;

    const today = new Date().toISOString().split('T')[0]; // Huidige datum in 'YYYY-MM-DD' formaat

    return [...canteenData.value.items]
      .filter((event) => event.start?.date >= today) // Filter alleen toekomstige events
      .sort((a, b) => new Date(a.start.date) - new Date(b.start.date)) // Sorteer op startdatum
      .at(0); // Pak het eerste event (dichtstbijzijnde)
  });

  onMounted(() => {
    fetchCanteenEvents();
  });
</script>

<style scoped lang="postcss">
  @keyframes gradientFlow {
    0% {
      border-image-source: linear-gradient(45deg, #ff0000, #ff00ff, #0000ff, #00ff00);
      border-image-slice: 1;
    }
    25% {
      border-image-source: linear-gradient(135deg, #ff0000, #ff00ff, #0000ff, #00ff00);
      border-image-slice: 1;
    }
    50% {
      border-image-source: linear-gradient(225deg, #ff0000, #ff00ff, #0000ff, #00ff00);
      border-image-slice: 1;
    }
    75% {
      border-image-source: linear-gradient(315deg, #ff0000, #ff00ff, #0000ff, #00ff00);
      border-image-slice: 1;
    }
    100% {
      border-image-source: linear-gradient(45deg, #ff0000, #ff00ff, #0000ff, #00ff00);
      border-image-slice: 1;
    }
  }

  /* Apply the gradient border animation to active events */
  .animate-gradient-border {
    border-width: 2px;
    border-style: solid;
    animation: gradientFlow 4s infinite linear;
    border-image-slice: 1;
  }

  .is-current {
    background: repeating-linear-gradient(135deg, rgba(0, 175, 90, 0.25) 0%, rgba(0, 122, 64, 0.25) 10%),
      radial-gradient(circle farthest-side at 0% 0%, rgba(0, 175, 90, 0.25) 0%, rgba(0, 0, 255, 0) 100%),
      radial-gradient(circle farthest-side at 100% 100%, rgba(0, 255, 135, 0.25) 0%, rgba(0, 0, 255, 0) 100%);
    background-blend-mode: soft-light;
  }
</style>
