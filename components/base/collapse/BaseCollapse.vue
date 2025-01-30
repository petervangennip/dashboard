<template>
  <div class="base-accordion">
    <slot />
  </div>
</template>

<script setup>
  const props = defineProps({
    multiple: {
      type: Boolean,
      default: false,
    },
    openFirst: {
      type: Boolean,
      default: true,
    },
  });

  // Initialize activeItems based on openFirst prop
  const activeItems = ref(props.openFirst ? [0] : []);

  // Method to handle toggling an item
  const handleToggle = (id) => {
    if (activeItems.value.includes(id)) {
      // If it's already open, close it
      activeItems.value = activeItems.value.filter((itemId) => itemId !== id);
    } else {
      if (!props.multiple) {
        // If not allowing multiple, close all others
        activeItems.value = [id];
      } else {
        // Allow multiple items to be opened
        activeItems.value.push(id);
      }
    }
  };

  // Provide the active state and toggle method to slots
  provide('activeItems', activeItems);
  provide('handleToggle', handleToggle);
</script>
