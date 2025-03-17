<template>
  <p
    v-if="props?.event?.summary"
    class="mb-4 text-xl font-bold"
  >
    {{ props?.event.summary }}
  </p>
  <div
    v-if="props?.event?.start?.dateTime && props?.event?.end?.dateTime"
    class="flex items-center gap-4"
  >
    <span
      v-if="props?.event?.start?.dateTime"
      class="rounded-sm border border-gray-300 bg-gray-200 px-3 py-1 text-sm"
    >
      {{ formatIsoDate(props?.event.start.dateTime, 'dd-MM-yyyy') }}
    </span>
    <span class="flex items-center gap-2">
      <span
        v-if="event?.start?.dateTime"
        class="rounded-sm border border-gray-300 bg-gray-200 px-3 py-1 text-sm"
      >
        {{ formatIsoDate(event.start.dateTime, 'HH:MM') }}
      </span>
      -
      <span
        v-if="event?.end?.dateTime"
        class="rounded-sm border border-gray-300 bg-gray-200 px-3 py-1 text-sm"
      >
        {{ formatIsoDate(event.end.dateTime, 'HH:MM') }}
      </span>
    </span>
  </div>
  <div v-if="props?.event?.start?.date && props?.event?.end?.date">
    <span
      v-if="props?.event?.start?.date"
      class="rounded-sm border border-gray-300 bg-gray-200 px-3 py-1 text-sm"
    >
      {{ formatIsoDate(props?.event.start.date, 'dd-MM-yyyy') }}
    </span>
    -
    <span
      v-if="props?.event?.end?.date"
      class="rounded-sm border border-gray-300 bg-gray-200 px-3 py-1 text-sm"
    >
      {{ formatIsoDate(props?.event.end.date, 'dd-MM-yyyy') }}
    </span>
  </div>
  <!-- <a
          v-if="event?.htmlLink"
          :href="event.htmlLink"
          class="absolute bottom-0 left-0 right-0 top-0 h-full w-full no-underline"
          target="_blank"
        /> -->
</template>

<script setup>
  // const userColors = ref({}); // Store email-color mapping
  // const colors = [
  //   'text-red-600',
  //   'text-blue-600',
  //   'text-green-600',
  //   'text-yellow-600',
  //   'text-purple-600',
  //   'text-pink-600',
  //   'text-indigo-600',
  //   'text-teal-600',
  // ];

  const props = defineProps({
    event: {
      type: Object,
      default: () => {},
    },
  });

  // // Assign unique colors to each user
  // const getUserColor = (email) => {
  //   if (!userColors.value[email]) {
  //     const randomColor = colors[Object.keys(userColors.value).length % colors.length];
  //     userColors.value[email] = randomColor;
  //   }
  //   return userColors.value[email];
  // };
</script>
