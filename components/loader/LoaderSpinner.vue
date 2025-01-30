<template>
  <div
    class="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center"
    :class="props.isTransparent ? 'bg-white/5' : 'bg-black/50'"
  >
    <!-- <Icon name="svg-spinners:90-ring-with-bg" size="64px" class="text-primary-900" /> -->
    <div class="loader"></div>
  </div>
</template>

<script setup>
  const props = defineProps({
    isTransparent: {
      type: Boolean,
      default: false,
    },
  });
</script>

<style lang="postcss">
  .loader {
    width: fit-content;
    font-size: 120px;
    line-height: 1.5;
    font-family: system-ui, sans-serif;
    font-weight: bold;
    text-transform: uppercase;
    color: #0000;
    -webkit-text-stroke: 1px #000;
    background:
      radial-gradient(1.13em at 50% 1.6em, #00b45a 99%, #0000 101%) calc(50% - 1.6em) 0/3.2em 100% text,
      radial-gradient(1.13em at 50% -0.8em, #0000 99%, #00b45a 101%) 50% 0.8em/3.2em 100% repeat-x text;
    animation: l9 2s linear infinite;
  }
  .loader:before {
    content: 'Loading';
  }
  @keyframes l9 {
    to {
      background-position:
        calc(50% + 1.6em) 0,
        calc(50% + 3.2em) 0.8em;
    }
  }
</style>
