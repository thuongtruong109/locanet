<template>
  <footer class="flex flex-col items-center">
    <span class="mb-2 flex items-center space-x-0.5 text-xs text-gray-400"
      ><UIcon name="akar-icons:question" /><span
        >We do not collect or store any users data</span
      ></span
    >
    <div class="flex w-full items-center justify-between">
      <p
        class="flex items-center space-x-0.5 text-center text-xs text-neutral-500 dark:text-neutral-400"
      >
        <span>Powered by</span>
        <a href="https://nuxt.com" class="text-(--ui-primary)">Nuxt</a>
        <UIcon name="charm:cross" size="10" />
        <a href="https://ui.nuxt.com" class="text-(--ui-primary)">NuxtUI</a>
      </p>
      <p
        class="flex items-center space-x-0.5 text-center text-xs text-neutral-500 dark:text-neutral-400"
      >
        <span>Ported by</span>
        <a
          href="https://github.com/thuongtruong109"
          class="text-(--ui-primary) text-center text-xs"
          >thuongtruong109</a
        >
      </p>
    </div>
  </footer>
</template>
