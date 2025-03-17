<template>
  <div class="calendar">
    <section class="mb-8">
      <h2 class="mb-8">
        <Icon
          name="twemoji:calendar"
          class="mr-2 size-8"
        />

        Aankomend verlof & vrije dagen
      </h2>
      <ul class="grid grid-cols-3 gap-4">
        <li
          v-for="event in sortedEvents"
          :key="event.id"
          class="relative mb-4 rounded-sm border-2 border-gray-600 bg-white p-4 text-center shadow-md transition-all duration-300"
          :class="isActivePeriod(event)"
        >
          <CalendarItemLeave :event="event" />
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
  const leaveData = ref(null);

  // Check if the event is currently active and return a class
  const isActivePeriod = (event) => {
    if (!event.start?.date || !event.end?.date) return '';

    const today = new Date();
    const startDate = new Date(event.start.date);
    const endDate = new Date(event.end.date);

    return today >= startDate && today <= endDate
      ? 'border-2 border-transparent animate-gradient-border shadow-2xl rounded-sm is-current'
      : '';
  };

  // Fetch Leave events
  async function fetchLeaveEvents() {
    try {
      const response = await fetch('/api/google-events-leave'); // Call the backend route
      const result = await response.json();

      // Assign sorted events to data
      leaveData.value = result;
    } catch (error) {
      console.error('Error fetching calendar events:', error);
    }
  }

  // Computed property to return sorted events
  // const sortedEvents = computed(() => {
  //   if (!leaveData.value || !leaveData.value.items) return [];
  //   return [...leaveData.value.items].sort((a, b) => new Date(a.start.date) - new Date(b.start.date));
  // });

  // Computed property to get sorted and filtered upcoming events, including ongoing events
  const sortedEvents = computed(() => {
    if (!leaveData.value || !leaveData.value.items) return [];

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Zet tijd op middernacht voor vergelijking

    return [...leaveData.value.items]
      .filter((event) => {
        const eventStart = event.start.dateTime ? new Date(event.start.dateTime) : new Date(event.start.date);
        const eventEnd = event.end?.dateTime
          ? new Date(event.end.dateTime)
          : event.end?.date
            ? new Date(event.end.date)
            : null;

        // Evenementen die vandaag beginnen of in de toekomst starten of die nu nog gaande zijn
        return eventStart >= today || (eventEnd && eventEnd >= today);
      })
      .sort((a, b) => {
        const dateA = a.start.dateTime ? new Date(a.start.dateTime) : new Date(a.start.date);
        const dateB = b.start.dateTime ? new Date(b.start.dateTime) : new Date(b.start.date);
        return dateA - dateB; // Sorteer op startdatum
      });
  });

  onMounted(() => {
    fetchLeaveEvents();
    setInterval(
      () => {
        window.location.reload(); // Reloads the page
      },
      60 * 60 * 1000,
    );
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
