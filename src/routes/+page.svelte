<script lang="ts">
  import { onMount } from "svelte";
  import GpsSpeed from "./GpsSpeed.svelte";
  import SpeedLimitZone from "./SpeedLimitZone.svelte";

  let data = { speed: 0, position: null };
  let osmSpeedLimit = -1; // Speed limit from OSM
  let lastFetch = 0; // Timestamp of the last fetch

  function handleUpdate(event) {
    data = event.detail;
    if (data.position) {
      fetchSpeedLimit(data.position.latitude, data.position.longitude);
    }
  }

  async function fetchSpeedLimit(lat, lon) {
    const now = Date.now();
    if (now - lastFetch < 10000) return; // Skip if less than 10 seconds since last fetch
    lastFetch = now;

    const query = `
      [out:json];
      way(around:100, ${lat}, ${lon})[highway][maxspeed];
      out body;
    `;
    const encodedQuery = encodeURIComponent(query);
    const url = `https://overpass-api.de/api/interpreter?data=${encodedQuery}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.elements && data.elements.length > 0) {
        const firstWay = data.elements[0];
        const maxspeed = firstWay.tags.maxspeed;
        osmSpeedLimit = parseInt(maxspeed, 10) || -1; // Parse maxspeed to number, default to -1 if invalid
      } else {
        osmSpeedLimit = -1; // No speed limit found
      }
    } catch (error) {
      console.error("Error fetching speed limit:", error);
      osmSpeedLimit = -1; // Reset to -1 on error
    }
  }
</script>

<svelte:head>
  <title>Lappegrenser</title>
  <meta name="description" content="Lappegrenser i Norge" />
</svelte:head>

<section>
  <GpsSpeed on:update={handleUpdate} />

  {#if osmSpeedLimit !== -1}
    <p>Current speed limit from OSM: {osmSpeedLimit} km/h</p>
    <SpeedLimitZone speed={data.speed} speedLimit={osmSpeedLimit} />
  {:else}
    <p>No speed limit found from OSM. Using predefined limits.</p>
    <SpeedLimitZone speed={data.speed} speedLimit={50} />
    <SpeedLimitZone speed={data.speed} speedLimit={60} />
    <SpeedLimitZone speed={data.speed} speedLimit={70} />
    <SpeedLimitZone speed={data.speed} speedLimit={80} />
    <SpeedLimitZone speed={data.speed} speedLimit={110} />
  {/if}
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0.6;
  }

  h1 {
    width: 100%;
  }
</style>
