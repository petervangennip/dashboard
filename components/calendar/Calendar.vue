<template>
  <div class="calendar">
    <h2 class="mb-8">📅 Aankomend verlof & vrije dagen</h2>
    <ul class="grid grid-cols-3 gap-4">
      <li
        v-for="event in sortedEvents"
        :key="event.id"
        class="relative mb-4 rounded-sm border-2 border-gray-600 bg-white p-4 text-center shadow-md transition-all duration-300"
        :class="isActivePeriod(event)"
      >
        <p
          v-if="event?.summary"
          :class="getUserColor(event?.creator?.email)"
          class="mb-4 text-xl font-bold"
        >
          {{ event.summary }}
        </p>
        <div>
          <span
            v-if="event?.start?.date"
            class="rounded-lg bg-gray-200 px-3 py-1 text-sm"
          >
            {{ formatIsoDate(event.start.date, 'dd-MM-yyyy') }}
          </span>
          -
          <span
            v-if="event?.end?.date"
            class="rounded-lg bg-gray-200 px-3 py-1 text-sm"
          >
            {{ formatIsoDate(event.end.date, 'dd-MM-yyyy') }}
          </span>
        </div>
        <a
          v-if="event?.htmlLink"
          :href="event.htmlLink"
          class="absolute bottom-0 left-0 right-0 top-0 h-full w-full no-underline"
          target="_blank"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
  const data = ref(null);
  const userColors = ref({}); // Store email-color mapping

  const colors = [
    'text-red-600',
    'text-blue-600',
    'text-green-600',
    'text-yellow-600',
    'text-purple-600',
    'text-pink-600',
    'text-indigo-600',
    'text-teal-600',
  ];

  // Assign unique colors to each user
  const getUserColor = (email) => {
    if (!userColors.value[email]) {
      const randomColor = colors[Object.keys(userColors.value).length % colors.length];
      userColors.value[email] = randomColor;
    }
    return userColors.value[email];
  };

  // Check if the event is currently active and return a class
  const isActivePeriod = (event) => {
    if (!event.start?.date || !event.end?.date) return '';

    const today = new Date();
    const startDate = new Date(event.start.date);
    const endDate = new Date(event.end.date);

    return today >= startDate && today <= endDate
      ? 'border-2 border-transparent animate-gradient-border shadow-2xl'
      : '';
  };

  async function fetchEvents() {
    try {
      const response = await fetch('/api/google-events'); // Call the backend route
      const result = await response.json();

      // Assign sorted events to data
      data.value = result;
    } catch (error) {
      console.error('Error fetching calendar events:', error);
    }
  }

  // Computed property to return sorted events
  const sortedEvents = computed(() => {
    if (!data.value || !data.value.items) return [];
    return [...data.value.items].sort((a, b) => new Date(a.start.date) - new Date(b.start.date));
  });

  onMounted(fetchEvents);
</script>

<style scoped>
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
</style>
