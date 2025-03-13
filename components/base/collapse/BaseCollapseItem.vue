<template>
  <div
    class="border-t border-gray-300 first:border-none last:border-b"
    :class="[{ 'is-active': isActive }]"
  >
    <div
      class="flex cursor-pointer items-center gap-3"
      @click="toggle"
    >
      <button
        class="accordion-item-button relative flex w-full text-base font-semibold leading-6 lg:text-xl lg:leading-8"
        type="button"
      >
        <slot name="header" />
      </button>
    </div>
    <div
      v-show="isActive"
      class="accordion-item-content mt mb-6 lg:mb-9 lg:mt-2"
      :class="{ 'ml-0 lg:ml-11': indent }"
    >
      <slot name="body" />
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    id: {
      type: [String, Number],
      required: true,
    },
    indent: {
      type: Boolean,
      default: true,
    },
  });

  // Inject the activeItems and handleToggle from Accordion
  const activeItems = inject('activeItems');
  const handleToggle = inject('handleToggle');

  // Compute whether this item is active
  const isActive = computed(() => activeItems.value.includes(props.id));

  // Toggle this item's state
  const toggle = () => {
    handleToggle(props.id);
  };
</script>
