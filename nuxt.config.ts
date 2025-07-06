export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@nuxt/eslint", "@nuxt/icon", "@vite-pwa/nuxt"],
  devtools: { enabled: false },
  css: ["~/assets/main.css"],
  runtimeConfig: {
    public: {
      mediumApiUrl: process.env.NUXT_PUBLIC_MEDIUM_API_URL,
      largeApiUrl: process.env.NUXT_PUBLIC_LARGE_API_URL,
      v6ApiUrl: process.env.NUXT_PUBLIC_V6_API_URL,
      sunsetApiUrl: process.env.NUXT_PUBLIC_SUNSET_API_URL,
    },
  },
  future: { compatibilityVersion: 4 },
  compatibilityDate: "2025-06-28",
  eslint: {
    config: {
      stylistic: {
        quotes: "single",
        commaDangle: "never",
      },
    },
  },
  head: {
    meta: [
      {
        httpEquiv: "Content-Security-Policy",
        content: "upgrade-insecure-requests",
      },
    ],
  },
  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "Locanet",
      short_name: "Locanet",
      description:
        "Detect user access location information along with IP address",
      theme_color: "#ffffff",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },
    devOptions: {
      enabled: true,
    },
  },
});
