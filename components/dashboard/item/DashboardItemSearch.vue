<template>
  <div class="h-full border bg-white px-8 py-6 shadow">
    <form
      class="mb-6"
      @submit.prevent="handleSubmit"
    >
      <label
        for="url"
        class="mb-2 block text-sm font-medium"
        >Website URL</label
      >
      <input
        id="url"
        v-model="formData"
        type="text"
        placeholder="https://example.com"
        class="mb-4 w-full rounded border p-2"
      />
      <button
        type="submit"
        class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Submit new site
      </button>
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
