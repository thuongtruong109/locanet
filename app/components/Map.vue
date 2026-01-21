<template>
  <div class="relative h-full w-full">
    <div id="svgMap" ref="map" class="h-full w-full" />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import svgMap from "svgmap";

const props = defineProps({
  countryCode: {
    type: String,
    default: "VN",
  },
  countryName: {
    type: String,
    default: "Vietnam",
  },
});

const map = ref(null);

onMounted(async () => {
  await new svgMap({
    targetElementID: "svgMap",
    mouseWheelZoomEnabled: false,
    hideFlag: false,
    countries: {
      [props.countryCode]: props.countryName,
    },
    data: {
      data: {
        countresidents: {
          format: "{0}",
          thousandSeparator: ",",
          thresholdMax: 50000,
          thresholdMin: 1000,
        },
      },
      applyData: "countresidents",
      values: {
        [props.countryCode]: { countresidents: 99999999999 },
      },
    },
  });

  setTimeout(() => {
    highlightCountry(props.countryCode);
  }, 100);
});

const highlightCountry = (id) => {
  if (import.meta.client) {
    const el = document?.querySelector(`[data-id="${id}"]`);
    if (el) {
      el.setAttribute("fill", "#ff0000");
    }
  }
};

watch(
  () => props.countryCode,
  (newVal) => {
    highlightCountry(newVal);
  }
);
</script>

<style>
.svgMap-tooltip,
.svgMap-tooltip-content-wrapper,
.svgMap-tooltip-pointer,
.svgMap-map-controls-wrapper,
.svgMap-map-controls-zoom,
.svgMap-control-button,
.svgMap-zoom-button,
.svgMap-zoom-out-button {
  display: none !important;
}

.svgMap-map-image {
  width: 100% !important;
  height: 100% !important;
  min-height: 270px !important;
}
</style>
