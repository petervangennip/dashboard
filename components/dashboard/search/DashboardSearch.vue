<template>
  <div class="h-full border bg-white px-8 py-6 shadow">
    <form @submit.prevent="handleSubmit">
      <label
        for="url"
        class="mb-2 block text-sm font-medium"
        >Website URL</label
      >
      <div class="flex gap-4">
        <input
          id="url"
          v-model="formData"
          type="text"
          placeholder="https://example.com"
          class="w-full rounded-sm border border-gray-400 p-2"
        />
        <button
          type="submit"
          class="flex shrink-0 items-center justify-center rounded-sm bg-blue-500 px-3 py-1 text-white shadow hover:bg-blue-600"
        >
          Submit new site
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
  const emit = defineEmits(['submit']);
  const formData = ref(null);

  const handleSubmit = () => {
    emit('submit', formData.value);
  };
</script>
