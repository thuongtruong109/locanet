<script setup lang="ts">
const colorMode = useColorMode();

const isDarkMode = computed({
  get: () => colorMode.preference === "dark",
  set: () =>
    (colorMode.preference = colorMode.value === "dark" ? "light" : "dark"),
});
</script>

<template>
  <h3
    class="flex items-center space-x-0.5 text-xl font-semibold leading-6 drop-shadow-sm"
  >
    <Logo />
    <NuxtLink
      to="/"
      class="translate-y-px bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent"
      >Locanet</NuxtLink
    >
  </h3>
  <UButton
    type="button"
    title="Toggle Dark Mode"
    aria-label="Toggle Dark Mode"
    square
    variant="ghost"
    color="neutral"
    :icon="
      $colorMode.preference === 'dark' || $colorMode.preference === 'system'
        ? 'i-lucide-moon'
        : 'i-lucide-sun'
    "
    @click="isDarkMode = !isDarkMode"
  />
</template>
