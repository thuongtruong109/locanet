<template>
  <ClientOnly>
    <div class="w-full pt-4 text-center">
      <UButton
        class="mb-2 cursor-pointer"
        variant="solid"
        color="primary"
        :disabled="testing"
        @click="runSpeedTest"
      >
        <UIcon
          :name="testing ? 'tdesign:load' : 'ic:outline-network-check'"
          :class="{
            'animate-spin': testing,
          }"
        />
        <span>{{ testing ? "Testing ..." : "Speed Test" }}</span>
      </UButton>

      <p v-if="testing" class="animate-pulse text-sm text-gray-500">
        Testing... please wait
      </p>

      <div
        v-if="!testing && downloadSpeed && uploadSpeed"
        class="mx-auto w-full"
      >
        <div
          class="flex h-2.5 w-full overflow-hidden rounded-full bg-gray-200 shadow-inner"
          :class="{
            'animate-pulse': testing,
          }"
        >
          <div
            class="bg-blue-500 transition-all duration-500"
            :style="{ width: uploadPercent + '%' }"
            title="Upload"
          />
          <div
            class="bg-green-500 transition-all duration-500"
            :style="{ width: downloadPercent + '%' }"
            title="Download"
          />
        </div>

        <div class="mt-2 flex justify-between text-sm">
          <span class="text-blue-600">Upload: {{ uploadSpeed }} Mbps</span>
          <span class="text-green-600">Download: {{ downloadSpeed }} Mbps</span>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const downloadSpeed = ref<number>(0); // MB/s
const uploadSpeed = ref<number>(0); // MB/s
const testing = ref<boolean>(false);

// Total speed (avoid divide-by-zero)
const totalSpeed = computed<number>(() => {
  const total = downloadSpeed.value + uploadSpeed.value;
  return total > 0 ? total : 1;
});

const uploadPercent = computed<string>(() => {
  return ((uploadSpeed.value / totalSpeed.value) * 100).toFixed(2);
});

const downloadPercent = computed<string>(() => {
  return ((downloadSpeed.value / totalSpeed.value) * 100).toFixed(2);
});

const runSpeedTest = async (): Promise<void> => {
  testing.value = true;

  try {
    // Download test
    const downloadUrl =
      "https://raw.githubusercontent.com/thuongtruong109/locanet/main/public/banner.png";

    const startDownload = performance.now();
    const downloadResp = await fetch(downloadUrl, { cache: "no-store" });
    const blob = await downloadResp.blob();
    const endDownload = performance.now();

    const sizeMB = blob.size / (1024 * 1024);
    const durationSec = (endDownload - startDownload) / 1000;
    downloadSpeed.value = Number((sizeMB / durationSec).toFixed(2));

    // Upload test (5MB)
    const data = new Uint8Array(5 * 1024 * 1024);
    const uploadStart = performance.now();

    await fetch("https://httpbin.org/post", {
      method: "POST",
      body: data,
    });

    const uploadEnd = performance.now();
    const uploadDurationSec = (uploadEnd - uploadStart) / 1000;
    uploadSpeed.value = Number((5 / uploadDurationSec).toFixed(2));
  } catch (err) {
    console.error("Speed test failed:", err);
    downloadSpeed.value = 0;
    uploadSpeed.value = 0;
  } finally {
    testing.value = false;
  }
};
</script>
