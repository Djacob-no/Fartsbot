<script lang="ts">
  import { onDestroy, onMount, createEventDispatcher } from "svelte";

  export let speed: number;
  const dispatch = createEventDispatcher();
  let currentPosition = null;
  let previousCoords: object | undefined;
  let watchId: number | undefined;
  let previousTimestamp: any; // Store timestamp outside the function

  onMount(() => {
    if ("geolocation" in navigator) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          currentPosition = position.coords;
          if (position.coords.speed !== null) {
            speed = parseFloat((position.coords.speed * 3.6).toFixed(1)); // m/s to km/h
          } else {
            speed = parseFloat(calcSpeedFromCoords(position.coords));
          }
          dispatch("update", { speed, position: currentPosition });
        },
        (error) => {
          console.error(error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 1000,
          timeout: 5000,
        }
      );
    }
  });

  onDestroy(() => {
    if (watchId) navigator.geolocation.clearWatch(watchId);
  });

  function calcSpeedFromCoords(coords: {
    latitude: number;
    longitude: number;
  }) {
    if (!previousTimestamp || !previousCoords) {
      previousTimestamp = Date.now();
      previousCoords = {
        latitude: coords.latitude,
        longitude: coords.longitude,
      };
      return "0";
    }

    const lat1 = coords.latitude;
    const lon1 = coords.longitude;
    const lat2 = previousCoords.latitude;
    const lon2 = previousCoords.longitude;
    const currentTime = Date.now();
    const timeElapsed = (currentTime - previousTimestamp) / 1000; // Time elapsed in seconds

    // Calculate the distance in meters using the Haversine formula
    const R = 6371e3; // meters
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // in metres

    previousTimestamp = currentTime; // Update the timestamp for the next call
    previousCoords = coords; // Update the previous coordinates
    let speedMetersPerSecond = distance / timeElapsed; // speed in m/s
    return (speedMetersPerSecond * 3.6).toFixed(1); // Convert to km/h
  }
</script>

<main>
  <h1>{speed ? `${speed} km/h` : "Venter på posisjonsdata..."}</h1>
</main>
