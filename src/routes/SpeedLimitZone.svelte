<script lang="ts">
  export let speed: number;
  export let speedLimit: number;

  $: fine = calculateFine(speed, speedLimit);

    function calculateFine(currentSpeed: number, limit: number) {
    const overSpeed = currentSpeed - limit;
    if (overSpeed <= 0) return "Ingen bot";

    if (limit <= 60) {
      if (overSpeed <= 5) return "1 200 kr";
      if (overSpeed <= 10) return "3 250 kr";
      if (overSpeed <= 15) return "5 800 kr";
      if (overSpeed <= 20) return "8 400 kr";
      if (overSpeed <= 25) return "13 050 kr";
    } else {
      if (overSpeed <= 5) return "1 200 kr";
      if (overSpeed <= 10) return "3 250 kr";
      if (overSpeed <= 15) return "5 200 kr";
      if (overSpeed <= 20) return "7 250 kr";
      if (overSpeed <= 25) return "9 800 kr";
      if (overSpeed <= 30) return "13 050 kr";
      if (overSpeed <= 35) return "15 600 kr";
      if (limit >= 90 && overSpeed <= 40) return "16 250 kr";

        
      if (limit === 50 && currentSpeed >= 92) return "samfunnsstraff";
      if (limit === 60 && currentSpeed >= 110) return "samfunnsstraff";
      if (limit === 70 && currentSpeed >= 120) return "samfunnsstraff";
      if (limit === 80 && currentSpeed >= 130) return "samfunnsstraff";
      if (limit === 90 && currentSpeed >= 142) return "samfunnsstraff";
      if (limit === 100 && currentSpeed >= 155) return "samfunnsstraff";
        

    }
    return "Høyere hastighet";
  }

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
  <div class="current-speed">
    Din fart = {speed}
  </div>
  <div class="speed-limit">
      Hastighet = {speedLimit}
    </div>
  <div class="fine">Bot = {fine}</div>
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
    .fine{
        font-weight: bold;
        
    }
</style>
