<template>
  <div class="relative h-full rounded-sm border bg-white p-8 shadow transition-all hover:shadow-lg">
    <span
      v-if="props.result?.created_at"
      class="absolute top-[-22px] -z-10 mb-2 mr-4 block w-fit border border-gray-300 bg-gray-400 px-2 text-xs font-normal leading-6 text-white"
    >
      {{ formatIsoDate(props.result.created_at, 'dd-MM-yyyy') }}
    </span>

    <h3 class="mb-8 flex items-center break-all font-bold">
      {{ cleanUrl(result.url) }}
    </h3>

    <div class="mb-4 grid grid-cols-4 gap-4">
      <DashboardResultItemAccessibility
        v-if="props.result?.accessibility_results?.passes"
        :length="props.result.accessibility_results.passes.length"
        color="bg-green-400"
        name="Passes"
      />

      <DashboardResultItemAccessibility
        v-if="props.result?.accessibility_results?.violations"
        :length="props.result.accessibility_results.violations.length"
        color="bg-red-400"
        name="Violations"
      />

      <DashboardResultItemAccessibility
        v-if="props.result?.accessibility_results?.inapplicable"
        :length="props.result.accessibility_results.inapplicable.length"
        color="bg-yellow-400"
        name="Inapplicable"
      />

      <DashboardResultItemAccessibility
        v-if="props.result?.accessibility_results?.incomplete"
        :score="props.result.accessibility_results.incomplete.length"
        color="bg-blue-400"
        name="Incomplete"
      />
    </div>

    <!-- Lighthouse Scores -->
    <div class="mb-4 grid grid-cols-4 gap-4">
      <DashboardResultItemLighthouse
        v-if="props.result?.lighthouse_scores?.scores?.performance"
        :score="props.result.lighthouse_scores.scores?.performance"
        color="bg-blue-400"
        name="Performance"
      />

      <DashboardResultItemLighthouse
        v-if="props.result?.lighthouse_scores?.accessibility"
        :score="props.result.lighthouse_scores.accessibility"
        color="bg-green-400"
        name="Accessibility"
      />

      <DashboardResultItemLighthouse
        v-if="props.result?.lighthouse_scores?.bestPractices"
        :score="props.result.lighthouse_scores.bestPractices"
        color="bg-yellow-400"
        name="Best Practices"
      />

      <DashboardResultItemLighthouse
        v-if="props.result?.lighthouse_scores?.seo"
        :length="props.result.lighthouse_scores.seo"
        color="bg-red-400"
        name="SEO"
      />
    </div>

    <nuxt-link
      :to="{ name: `results-url`, params: { url: result.id } }"
      class="absolute bottom-0 left-0 right-0 top-0 z-[2] no-underline"
    />

    <button
      class="relative z-[3] mt-auto flex items-center rounded-sm bg-red-500 px-3 py-1 text-white shadow hover:bg-red-600"
      @click="$emit('delete', result.id)"
    >
      <Icon
        name="ic:baseline-delete"
        class="mr-2"
      />
      <span>Delete</span>
    </button>
  </div>
</template>

<script setup>
  const props = defineProps({
    result: {
      type: Object,
      default: () => ({}),
    },
  });

  const cleanUrl = (url) => {
    return url
      .replace(/^https?:\/\//, '') // Remove http(s)://
      .replace(/^www\./, '') // Remove www.
      .replace(/\/+$/, ''); // Remove trailing slashes
  };

  defineEmits(['delete']);
</script>
