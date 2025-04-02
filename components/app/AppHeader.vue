<template>
  <header class="relative z-50 bg-white py-6 shadow dark:bg-gray-800">
    <BaseGridContainer>
      <BaseGridCol100>
        <h1 class="h1 flex items-center">
          <span class="mr-4 text-green-600">Twentyseven</span>
          <span class="dark:text-white">Dashboard</span>
          <Icon
            name="ic:baseline-dashboard-customize"
            class="ml-4 text-green-700"
          />
        </h1>
        <span class="text-lg font-bold">{{ props.countdown }}</span>
      </BaseGridCol100>
    </BaseGridContainer>
  </header>
  <ProgressBar
    :progress="progress"
    class="mb-12"
  />
</template>

<script setup>
  // const config = useRuntimeConfig();

  const props = defineProps({
    progress: {
      type: Number,
      default: 3000,
    },
  });
</script>
