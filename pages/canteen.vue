<template>
  <section>
    <BaseGridContainer>
      <BaseGridCol100>
        <Canteen />
      </BaseGridCol100>
    </BaseGridContainer>
  </section>
</template>

<script setup>
  const router = useRouter();

  // Set an interval to switch pages every minute
  let currentPage = 'canteen';

  const navigate = () => {
    if (currentPage === 'index') {
      router.push('/canteen');
      currentPage = 'canteen';
    } else {
      router.push('/');
      currentPage = 'index';
    }
  };

  // Set interval to switch pages every 10 minutes (600000 ms)
  onMounted(() => {
    setInterval(navigate, 600000);
  });
</script>
