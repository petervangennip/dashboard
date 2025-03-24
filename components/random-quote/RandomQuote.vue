<template>
  <div class="quote-container m-4 mx-auto max-w-5xl rounded-md bg-green-200 p-4 text-center">
    <p
      v-if="quote"
      class="mb-4 text-3xl font-bold text-black"
    >
      "{{ quote.q }}"
    </p>
    <p
      v-if="quote"
      class="quote-author italic"
    >
      — {{ quote.a }}
    </p>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';

  const quote = ref(null);

  // Fetch the quote when the component is mounted
  const fetchQuote = async () => {
    const response = await $fetch('/api/random-quote');
    quote.value = response;
  };

  onMounted(fetchQuote);
</script>
