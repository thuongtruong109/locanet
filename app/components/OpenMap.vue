<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LIcon } from "@vue-leaflet/vue-leaflet";

const zoom = ref<number>(7);
defineProps<{
  center: [number, number];
}>();
</script>

<template>
  <ClientOnly>
    <div class="h-80 w-full">
      <LMap
        ref="map"
        v-model:zoom="zoom"
        :use-global-leaflet="false"
        :center="center"
        class="h-full w-full"
      >
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        />
        <LMarker :lat-lng="center" :radius="3" :fill-opacity="0.1" color="red">
          <LIcon icon-url="/location.svg" :icon-size="[20, 20]" />
        </LMarker>
      </LMap>
    </div>
  </ClientOnly>
</template>

<style>
.leaflet-container {
  border-radius: 0.5rem;
  border: 2px solid #3da8ff;
}

.leaflet-control-attribution {
  display: none;
}
</style>
