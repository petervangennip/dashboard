<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
  .page-enter-active,
  .page-leave-active {
    transition: transform 0.5s ease-in-out;
    position: absolute;
    width: 100%;
  }

  .page-enter,
  .page-leave-to {
    transform: translateY(-100%);
  }

  .page-enter-to,
  .page-leave {
    transform: translateY(0);
  }
</style>
