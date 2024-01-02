<script lang="ts">
  export let speed: number;
  export let speedLimit: number;

  // Calculate thresholds based on speedLimit
  $: yellowThreshold = speedLimit;
  $: redThreshold = determineRedThreshold(); // 60% more than speedLimit

  function determineRedThreshold() {
    if (speedLimit < 70) return speedLimit + 26;
    if (speedLimit >= 70 && speedLimit < 90) return speedLimit + 36;
    if (speedLimit >= 90) return speedLimit + 41;
    return 80;
  }
  // Determine background color based on thresholds
  $: backgroundColor =
    speed < yellowThreshold ? "green" : speed < redThreshold ? "yellow" : "red";
  // Determine text color based on background color
  $: textColor = backgroundColor === "yellow" ? "black" : "white";
</script>

<div
  class="speed-indicator"
  style="background-color: {backgroundColor};color:{textColor}"
>
  <div class="speed-limit">
    <svg viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="white"
        stroke="red"
        stroke-width="5"
      />
      <text
        x="50%"
        y="55%"
        text-anchor="middle"
        fill="black"
        font-size="35px"
        dy=".3em">{speedLimit}</text
      >
    </svg>
  </div>
  <!-- <div class="current-speed">
    Din fart = {speed}
  </div> -->
  <div class="lappegrensa">
    Lappegrensa = {redThreshold}
  </div>
</div>

<style>
  .speed-indicator {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%; /* Set the width to 100% */

    padding: 10px;
    color: white;
    font-size: 1.3em;
  }

  .speed-limit {
    width: 100px;
    height: 100px;
  }

  .current-speed {
    font-weight: bold;
  }
</style>
