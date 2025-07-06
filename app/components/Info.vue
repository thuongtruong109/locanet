<script setup lang="ts">
import type { LargeInfo, MediumInfo, V6Info, SunsetInfo } from "~~/types/info";

const SvgMap = defineAsyncComponent(() => import("@/components/Map.vue"));

const isV6 = ref<boolean>(false);
const toggleV6 = () => {
  isV6.value = !isV6.value;
};

const config = useRuntimeConfig();

const { data: info } = await useAsyncData("info", async () => {
  const [medium, large, v6] = await Promise.all<
    [MediumInfo, LargeInfo, V6Info]
  >([
    $fetch(config.public.mediumApiUrl),
    $fetch(config.public.largeApiUrl),
    $fetch(config.public.v6ApiUrl),
  ]);

  return {
    medium,
    large,
    v6,
  };
});

const sunsetData = ref<Pick<SunsetInfo, "results"> | null>(null);

watchEffect(async () => {
  if (info.value?.medium?.Latitude && info.value?.medium?.Longitude) {
    const res = await $fetch<SunsetInfo>(config.public.sunsetApiUrl, {
      query: {
        lat: info.value.medium.Latitude,
        lng: info.value.medium.Longitude,
      },
    });
    sunsetData.value = res?.results ?? null;
  }
});
</script>

<template>
  <section class="w-full">
    <div class="flex justify-between items-center mb-4">
      <div class="flex items-center space-x-2">
        <img
          :src="`https://flagsapi.com/${info?.medium?.CountryCode}/flat/24.png`"
          alt="Country Flag"
          width="24"
          height="24"
        />

        <p
          class="text-sm sm:text-base md:text-lg font-bold text-gray-800 dark:text-gray-200 truncate overflow-hidden"
        >
          {{ isV6 ? info?.v6?.ip : info?.medium?.query }}
        </p>
      </div>
      <div
        class="flex items-center border border-slate-200 dark:border-gray-700 rounded-md p-0.5 cursor-pointer"
      >
        <UButton
          type="button"
          title="Ipv4"
          size="xs"
          :color="isV6 ? 'neutral' : 'primary'"
          :variant="isV6 ? 'ghost' : 'soft'"
          :disabled="!isV6"
          @click="toggleV6"
        >
          v4
        </UButton>
        <UButton
          type="button"
          title="Ipv6"
          size="xs"
          :color="isV6 ? 'primary' : 'neutral'"
          :variant="isV6 ? 'soft' : 'ghost'"
          :disabled="isV6"
          @click="toggleV6"
        >
          v6
        </UButton>
      </div>
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-8 text-gray-700 dark:text-gray-400 text-sm [&>p]:flex [&>p]:items-center [&>p]:space-x-1 [&>p>a]:text-green-700 dark:[&>p>a]:text-green-400 [&>p>a]:hover:underline"
    >
      <p title="City">
        <UIcon name="mingcute:location-line" size="15" />
        <a
          :href="`https://www.bing.com/search?q=${info?.medium?.City}`"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="City"
          >{{ info?.medium?.City }}</a
        >
      </p>
      <p title="Country">
        <UIcon name="carbon:data-center" /><span>{{
          info?.medium?.CountryName
        }}</span>
        <a
          :href="`https://www.ip2location.com/${info?.medium?.CountryCode.toLowerCase()}`"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Country Code"
          >({{ info?.medium?.CountryCode }})</a
        >
      </p>
      <p title="Capital">
        <UIcon name="hugeicons:star" />
        <a
          :href="`https://en.wikipedia.org/wiki/${info?.medium?.Capital}`"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Capital"
          >{{ info?.medium?.Capital }}</a
        >
      </p>
      <p title="Time Zone">
        <UIcon name="icon-park-outline:time" /><span>{{
          info?.medium?.TimeZone
        }}</span>
      </p>
      <p title="Coordinates">
        <UIcon name="solar:flip-vertical-line-duotone" size="12" />
        <a
          :href="`http://www.latlong.net/c/?lat=${info?.medium?.Latitude}&long=${info?.medium?.Longitude}`"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Coordinates"
          >{{ info?.medium?.Latitude }}, {{ info?.medium?.Longitude }}</a
        >
      </p>
      <p title="Region UTC">
        <UIcon name="mynaui:map" /><span
          >{{ info?.large?.timezone?.utc }} ({{
            info?.large?.region_code
          }})</span
        >
      </p>
      <p title="Continent">
        <UIcon name="ion:earth-outline" /><span
          >{{ info?.medium?.ContinentName }} ({{
            info?.medium?.ContinentCode
          }})</span
        >
      </p>
      <p title="Phone Prefix">
        <UIcon name="solar:phone-linear" /><span>{{
          info?.medium?.PhonePrefix
        }}</span>
      </p>
      <p title="Postal Code">
        <UIcon name="solar:letter-linear" /><span>{{
          info?.medium?.Postal
        }}</span>
      </p>
      <p title="ASN">
        <UIcon name="icon-park-outline:connection-arrow" size="11" /><span>{{
          info?.medium?.asn
        }}</span>
      </p>
      <p title="Organization">
        <UIcon name="ep:connection" />
        <a
          :href="`https://${info?.large?.connection?.domain}`"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Organization"
          >{{ info?.medium?.org }}</a
        >
      </p>
      <p title="Currency">
        <UIcon name="solar:wad-of-money-linear" size="15" /><span>{{
          info?.medium?.Currency
        }}</span>
      </p>
      <p title="USD Rate">
        <UIcon name="iconoir:dollar-circle" /><span>{{
          Number(info?.medium?.USDRate).toLocaleString()
        }}</span>
      </p>
      <p title="EUR Rate">
        <UIcon name="material-symbols:euro" />
        <span>{{ Number(info?.medium?.EURRate).toLocaleString() }}</span>
      </p>
      <p title="Weather">
        <UIcon name="mdi:weather-hail" size="15" /><span>{{
          info?.v6?.weather
        }}</span>
      </p>
    </div>

    <USeparator class="my-4" />

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-8 text-gray-700 dark:text-gray-400 text-sm [&>p]:flex [&>p]:items-center [&>p]:space-x-1 [&>p>a]:text-green-700 dark:[&>p>a]:text-green-400 [&>p>a]:hover:underline"
    >
      <p title="Sunrise">
        <UIcon name="ep:sunrise" size="16" />
        <span>{{ sunsetData?.sunrise }}</span>
      </p>
      <p title="Solar Noon">
        <UIcon name="solar:sun-outline" size="17" />
        <span>{{ sunsetData?.solar_noon }}</span>
      </p>
      <p title="Sunset">
        <UIcon name="ep:sunset" size="13" />
        <span>{{ sunsetData?.sunset }}</span>
      </p>
      <p title="First Light">
        <UIcon name="akar-icons:thunder" size="15" />
        <span>{{ sunsetData?.first_light }}</span>
      </p>
      <p title="Last Light">
        <UIcon name="solar:moon-line-duotone" size="14" />
        <span>{{ sunsetData?.last_light }}</span>
      </p>
      <p title="Dawn">
        <UIcon name="f7:light-max" size="16" />
        <span>{{ sunsetData?.dawn }}</span>
      </p>
      <p title="Dusk">
        <UIcon name="f7:light-min" size="16" />
        <span>{{ sunsetData?.dusk }}</span>
      </p>
      <p title="Golden Hour">
        <UIcon name="material-symbols-light:diamond-outline" size="15" />
        <span>{{ sunsetData?.golden_hour }}</span>
      </p>
      <p title="Day Length">
        <UIcon name="lets-icons:line-light" size="15" />
        <span>{{ sunsetData?.day_length }}</span>
      </p>
    </div>

    <ClientOnly>
      <Network />
      <SvgMap
        :country-code="info?.medium?.CountryCode"
        :country-name="info?.medium?.CountryName"
      />
    </ClientOnly>
  </section>
</template>
