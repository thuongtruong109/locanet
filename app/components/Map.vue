<template>
  <div class="relative h-full w-full">
    <div id="svgMap" ref="map" class="h-full w-full" />
  </div>
</template>

<script setup lang="ts">
import svgMap from "svgmap";

interface Props {
  countryCode?: string;
  countryName?: string;
}

const props = withDefaults(defineProps<Props>(), {
  countryCode: "VN",
  countryName: "Vietnam",
});

const map = ref<any>(null);

onMounted(async () => {
  map.value = new (svgMap as any)({
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
        [props.countryCode]: {
          countresidents: 99999999999,
        },
      },
    },
  });

  setTimeout(() => {
    highlightCountry(props.countryCode);
  }, 100);
});

/**
 * Highlight a country on the SVG map
 */
const highlightCountry = (id: string): void => {
  if (import.meta.client) {
    const el = document.querySelector<SVGElement>(`[data-id="${id}"]`);
    if (el) {
      el.setAttribute("fill", "#ff0000");
    }
  }
};

watch(
  () => props.countryCode,
  (newVal) => {
    highlightCountry(newVal);
  },
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
