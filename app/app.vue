<script setup>
useHead({
  htmlAttrs: { lang: "en" },
  link: [{ rel: "icon", href: "/icon.png" }],
});

useSeoMeta({
  viewport: "width=device-width, initial-scale=1.0",
  title: "Locanet",
  description: "Detect user access location data along with IP address",
  ogImage: "/banner.png",
  twitterImage: "/banner.png",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <NuxtPwaManifest />
  <UApp>
    <UContainer class="min-h-screen flex flex-col pt-4 space-y-8">
      <UCard variant="subtle" color="primary">
        <template #header>
          <Header />
        </template>
        <ClientOnly>
          <Suspense>
            <template #default>
              <Info />
            </template>
            <template #fallback>
              <div class="p-4">
                <div class="animate-pulse space-y-2">
                  <div class="h-4 w-full bg-gray-200 rounded" />
                  <div class="h-4 w-full bg-gray-200 rounded" />
                  <div class="h-4 w-full bg-gray-200 rounded" />
                </div>
              </div>
            </template>
          </Suspense>
        </ClientOnly>
      </UCard>
      <Landing />
      <USeparator class="my-4" />
      <Footer />
    </UContainer>
  </UApp>
</template>
