<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
  .page-enter-active {
    animation: slideInRight 500ms;
  }

  .page-leave-active {
    animation: slideOutLeft 500ms;
  }
</style>
