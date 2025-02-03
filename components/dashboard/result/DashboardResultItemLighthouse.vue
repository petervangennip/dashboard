<template>
  <div class="circle-container">
    <!-- Outer Circle (Border Based on Score) -->
    <div
      class="circle"
      :style="getCircleBorderStyle"
    >
      <div class="circle-inner">
        <span class="score-text">{{ score }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    score: {
      type: Number,
      required: true,
    },
  });

  // Calculate the border width based on score, converting it to a percentage of the 360 degree border
  const getCircleBorderStyle = computed(() => {
    const percentage = Math.min(Math.max(props.score, 0), 100); // Ensure the score is between 0 and 100
    const borderDegrees = (percentage / 100) * 360; // Calculate the border size

    return {
      background: `conic-gradient(#4caf50 ${borderDegrees}deg, transparent 0deg)`, // The dynamic border
    };
  });
</script>

<style scoped>
  .circle-container {
    position: relative;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: conic-gradient(#4caf50 0deg, transparent 0deg); /* Dynamic border using conic-gradient */
    position: absolute;
    border: 4px solid transparent; /* Static border thickness */
  }

  .circle-inner {
    width: 80px;
    height: 80px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }

  .score-text {
    font-size: 14px;
    color: #333;
  }
</style>
