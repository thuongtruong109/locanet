export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/fonts",
    "@vite-pwa/nuxt",
  ],
  devtools: { enabled: false },
  app: {
    head: {
      title: "Locanet",
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "Detect user access location data along with IP address",
        },
        {
          "http-equiv": "Content-Security-Policy",
          content: "upgrade-insecure-requests",
        },
      ],
    },
  },
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      mediumApiUrl: process.env.NUXT_PUBLIC_MEDIUM_API_URL,
      largeApiUrl: process.env.NUXT_PUBLIC_LARGE_API_URL,
      sunsetApiUrl: process.env.NUXT_PUBLIC_SUNSET_API_URL,
      ipv6ApiUrl: process.env.NUXT_PUBLIC_IPV6_API_URL,
      countryApiUrl: process.env.NUXT_PUBLIC_COUNTRY_API_URL,
    },
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
  fonts: {
    experimental: {
      processCSSVariables: true,
    },
  },
  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "Locanet",
      short_name: "Locanet",
      description: "Detect user access location data along with IP address",
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
