export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@nuxt/eslint", "@nuxt/icon", "@vite-pwa/nuxt"],
  devtools: { enabled: false },
  app: {
    head: {
      title: "Nuxt",
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      meta: [
        {
          httpEquiv: "Content-Security-Policy",
          content: "upgrade-insecure-requests",
        },
      ],
    },
  },
  css: ["~/assets/main.css"],
  runtimeConfig: {
    mediumApiUrl: process.env.MEDIUM_API_URL,
    largeApiUrl: process.env.LARGE_API_URL,
    sunsetApiUrl: process.env.SUNSET_API_URL,
    countryApiUrl: process.env.COUNTRY_API_URL,
  },
  routeRules: {
    "/api/**": {
      cors: true,
      headers: { "access-control-allow-methods": "GET" },
    },
  },
  future: { compatibilityVersion: 4 },
  compatibilityDate: "2026-01-20",
  eslint: {
    config: {
      stylistic: {
        quotes: "single",
        commaDangle: "never",
      },
    },
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
