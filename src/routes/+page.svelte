<script lang="ts">
  import Counter from "./Counter.svelte";
  import welcome from "$lib/images/svelte-welcome.webp";
  import welcome_fallback from "$lib/images/svelte-welcome.png";
  import GpsSpeed from "./GpsSpeed.svelte";

  import { onMount } from "svelte";
  import { app, analytics } from "../Firebase.js";
  import SpeedLimitZone from "./SpeedLimitZone.svelte";

  onMount(() => {});
  let speedo = {
    speed: 0,
    speedLimit: 50,
  };
  let speeda = 0;
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
  <GpsSpeed on:message={(e) => (speeda = e.detail)} speed={speeda} />
  <SpeedLimitZone speed={speeda} speedLimit={50} />
  <SpeedLimitZone speed={speeda} speedLimit={60} />
  <SpeedLimitZone speed={speeda} speedLimit={70} />
  <SpeedLimitZone speed={speeda} speedLimit={80} />
  <SpeedLimitZone speed={speeda} speedLimit={110} />
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

  .welcome {
    display: block;
    position: relative;
    width: 100%;
    height: 0;
    padding: 0 0 calc(100% * 495 / 2048) 0;
  }

  .welcome img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    display: block;
  }
</style>
