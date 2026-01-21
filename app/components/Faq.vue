<template>
  <UCard variant="subtle" color="primary" class="w-full mt-10">
    <template #header>
      <div class="text-center w-full">
        <h2 class="text-2xl font-semibold">FAQs</h2>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          Everything you need to know about Locanet
        </p>
      </div>
    </template>

    <div class="space-y-6">
      <UAccordion :items="faqItems" />
    </div>
  </UCard>
</template>

<script setup>
const faqItems = [
  {
    label: "What is Locanet?",
    icon: "i-heroicons-question-mark-circle",
    content:
      "Locanet is a web application that detects and displays your current IP address along with detailed location information, including country, city, coordinates, timezone, and more. It provides both IPv4 and IPv6 information.",
  },
  {
    label: "How does Locanet work?",
    icon: "i-heroicons-star",
    content:
      "Locanet fetches data from multiple reliable APIs to gather comprehensive information about your network connection. It combines data from IP geolocation services, timezone APIs, and country information databases to provide accurate location details.",
  },
  {
    label: "What information does Locanet display?",
    icon: "i-heroicons-rocket-launch",
    content:
      "Locanet shows your IP address (both IPv4 and IPv6), country, region, city, postal code, latitude/longitude coordinates, timezone, ISP information, and additional details like sunrise/sunset times for your location.",
  },
  {
    label: "Is Locanet free to use?",
    icon: "i-heroicons-paint-brush",
    content:
      "Yes, Locanet is completely free to use. There are no premium features or paid subscriptions required.",
  },
  {
    label: "How accurate is the location information?",
    icon: "i-heroicons-cog-6-tooth",
    content:
      "The accuracy depends on your ISP and the geolocation databases used. Generally, it provides city-level accuracy for most users, but exact precision can vary. The service uses multiple APIs to cross-verify information for better reliability.",
  },
  {
    label: "Does Locanet store my IP address or personal data?",
    icon: "i-heroicons-shield-check",
    content:
      "No, Locanet does not store any personal data, IP addresses, or location information. All data is fetched in real-time from external APIs and displayed temporarily in your browser. No data is saved on our servers.",
  },
  {
    label: "Why do I see different information when using VPN?",
    icon: "i-heroicons-wifi",
    content:
      "When using a VPN, Locanet will show the IP address and location of the VPN server rather than your actual location. This is expected behavior as VPNs route your traffic through different servers to mask your real IP.",
  },
  {
    label: "Is my data secure when using Locanet?",
    icon: "i-heroicons-lock-closed",
    content:
      "Yes, Locanet prioritizes user privacy and security. All API calls are made securely over HTTPS, and no personal data is collected or stored. The application runs entirely in your browser.",
  },
  {
    label: "Can I use Locanet on mobile devices?",
    icon: "i-heroicons-device-phone-mobile",
    content:
      "Yes, Locanet is responsive and works on all devices including smartphones, tablets, and desktop computers. It also supports PWA features for installation on mobile devices.",
  },
  {
    label: "What if the information shown is incorrect?",
    icon: "i-heroicons-exclamation-triangle",
    content:
      "IP geolocation data can sometimes be inaccurate due to limitations in the databases used by ISPs and geolocation services. If you believe the information is significantly wrong, it could be due to VPN usage, proxy servers, or database limitations.",
  },
  {
    label: "How often is the data updated?",
    icon: "i-heroicons-arrow-path",
    content:
      "The data is fetched in real-time each time you visit or refresh the page. However, your IP address typically remains the same unless you change networks or use different connection methods.",
  },
];
</script>
