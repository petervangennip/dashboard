export const usePageRotator = (ms = 10000) => {
  const router = useRouter();
  const pages = Object.keys(import.meta.glob('../pages/*.vue')).map((path) =>
    path.replace('../pages/', '').replace('.vue', '') === 'index'
      ? ''
      : path.replace('../pages/', '').replace('.vue', ''),
  );

  const currentIndex = ref(0);
  const progress = ref(0);
  let timer = null;

  const changePage = () => {
    if (!pages.length) return;

    // Make sure 100% is reached and displayed
    progress.value = 100;

    // Wait 500ms before switching pages to show full progress bar
    setTimeout(() => {
      router.push(`/${pages[currentIndex.value]}`);
      currentIndex.value = (currentIndex.value + 1) % pages.length;
      progress.value = 0; // Reset progress for the next page
      startRotation(); // Restart rotation after the page change
    }, 500);
  };

  const startRotation = () => {
    progress.value = 0;
    let step = 100 / (ms / 1000); // Step per second

    timer = setInterval(() => {
      progress.value += step;

      if (progress.value >= 100) {
        clearInterval(timer); // Stop the timer
        changePage(); // Switch page after showing full progress
      }
    }, 1000);
  };

  onMounted(() => {
    startRotation();
  });

  onUnmounted(() => {
    clearInterval(timer);
  });

  return { progress };
};
