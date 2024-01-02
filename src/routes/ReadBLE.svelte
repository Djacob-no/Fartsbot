<script lang="ts">
  import { onMount } from "svelte";

  let deviceName = "Your Device Name"; // Replace with your device name
  let serviceUuid = "service_uuid"; // Replace with your service UUID
  let characteristicUuid = "characteristic_uuid"; // Replace with your characteristic UUID
  let device, characteristic;

  onMount(() => {
    if (!navigator.bluetooth) {
      console.error("Web Bluetooth is not available in this browser.");
      return;
    }

    // Function to start Bluetooth device discovery
    async function discoverDevices() {
      try {
        device = await navigator.bluetooth.requestDevice({
          filters: [{ name: deviceName }],
          optionalServices: [serviceUuid],
        });

        connectToDevice(device);
      } catch (error) {
        console.error("Device discovery error:", error);
      }
    }

    // Function to connect to the device and get the characteristic
    async function connectToDevice(device) {
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(serviceUuid);
      characteristic = await service.getCharacteristic(characteristicUuid);
      readCharacteristicValue();
    }

    // Function to read the characteristic value
    async function readCharacteristicValue() {
      try {
        const value = await characteristic.readValue();
        console.log("Characteristic value:", new TextDecoder().decode(value));
      } catch (error) {
        console.error("Read characteristic error:", error);
      }
    }

    // Start discovery
    discoverDevices();
  });

  function onButtonClick() {
    const options = {
      acceptAllDevices: true,
    };

    navigator.bluetooth
      .requestDevice(options)
      .then((device) => {
        console.log("> Name:             " + device.name);
        console.log("> Id:               " + device.id);
        console.log("> Connected:        " + device.gatt.connected);
      })
      .catch((error) => {
        console.log("Argh! " + error);
      });
  }
</script>

<main>
  <h1>BLE Device Interaction</h1>
  <button on:click={onButtonClick}>Discover Devices</button>
</main>
