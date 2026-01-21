<script setup lang="ts">
import type {
  LargeInfo,
  MediumInfo,
  SunsetInfo,
  V6Info,
  CountryInfo,
} from "~~/types/info";

import { joinStr, unitSI, areaSI, coordinateSI, formatTime } from "@/utils";

const SvgMap = defineAsyncComponent(() => import("@/components/Map.vue"));

const isV6 = ref<boolean>(false);

const toggleV6 = (): void => {
  isV6.value = !isV6.value;
};

const config = useRuntimeConfig();

type InfoBundle = {
  medium: MediumInfo | null;
  large: LargeInfo | null;
  sunset: SunsetInfo["results"] | null;
  v6: V6Info | null;
  country: CountryInfo["data"][0] | null;
};

const { data: info } = await useAsyncData<InfoBundle>(
  "data-info",
  async () => {
    const [medium, large, v6] = await Promise.all([
      $fetch<MediumInfo>(config.public.mediumApiUrl as string),
      $fetch<LargeInfo>(config.public.largeApiUrl as string),
      $fetch<V6Info>(config.public.ipv6ApiUrl as string),
    ]);

    let sunset: SunsetInfo["results"] | null = null;
    if (medium?.Latitude && medium?.Longitude) {
      const res = await $fetch<SunsetInfo>(
        config.public.sunsetApiUrl as string,
        {
          query: { lat: medium.Latitude, lng: medium.Longitude },
        },
      );
      sunset = res?.results ?? null;
    }

    let country: CountryInfo["data"][0] | null = null;
    if (large?.country) {
      const res = await $fetch<CountryInfo>(
        config.public.countryApiUrl as string,
        {
          query: { name: large.country },
        },
      );
      country = res.data?.[0] ?? null;
    }

    return {
      medium: medium ?? null,
      large: large ?? null,
      sunset,
      v6: v6 ?? null,
      country,
    };
  },
  {
    lazy: false,
    dedupe: "defer",
  },
);
</script>

<template>
  <section class="w-full [&_p]:whitespace-nowrap">
    <div class="mb-4 flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <img
          :src="`https://flagsapi.com/${info?.medium?.CountryCode}/flat/24.png`"
          alt="Country Flag"
          width="24"
          height="24"
        />

        <p
          class="overflow-hidden truncate text-sm font-bold text-gray-800 sm:text-base md:text-lg dark:text-gray-200"
        >
          {{ isV6 ? info?.medium?.ip : info?.large?.ip }}
        </p>
      </div>
      <div
        class="flex cursor-pointer items-center rounded-md border border-slate-200 p-0.5 dark:border-gray-700"
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
      class="grid grid-cols-1 gap-x-8 gap-y-3 text-sm text-gray-700 sm:grid-cols-2 md:grid-cols-3 dark:text-gray-400 [&>p>a]:text-green-700 [&>p>a]:hover:underline dark:[&>p>a]:text-green-400 [&>p]:flex [&>p]:items-center [&>p]:space-x-1"
    >
      <p title="City">
        <UIcon name="mingcute:location-line" size="15" />
        <span>City:</span>
        <a
          :href="`https://www.bing.com/search?q=${info?.medium?.City}`"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="City"
          >{{ info?.medium?.City }}</a
        >
      </p>
      <p title="Country">
        <UIcon name="carbon:data-center" />
        <span>Country:</span>
        <span>{{ info?.medium?.CountryName }}</span>
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
        <span>Capital:</span>
        <a
          :href="`https://en.wikipedia.org/wiki/${info?.medium?.Capital}`"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Capital"
          >{{ info?.medium?.Capital }}</a
        >
      </p>
      <p title="Region" class="col-span-2">
        <UIcon name="mynaui:map" />
        <span>Region:</span>
        <span
          >{{ info?.medium?.TimeZone }} ({{ info?.country?.subregion }})</span
        >
      </p>
      <p title="Timezone">
        <UIcon name="solar:global-linear" />
        <span>Timezone:</span>
        <span
          >{{ info?.large?.timezone?.utc }} ({{
            info?.large?.region_code
          }})</span
        >
      </p>
      <p title="Continent">
        <UIcon name="ion:earth-outline" />
        <span>Continent:</span>
        <span
          >{{ info?.medium?.ContinentName }} ({{
            info?.medium?.ContinentCode
          }})</span
        >
      </p>
      <p title="Coordinates" class="col-span-2">
        <UIcon name="solar:flip-vertical-line-duotone" size="12" />
        <span>Coordinates:</span>
        <a
          :href="`http://www.latlong.net/c/?lat=${info?.medium?.Latitude}&long=${info?.medium?.Longitude}`"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Coordinates"
          >{{ coordinateSI("lat", info?.medium?.Latitude ?? 0) }},
          {{ coordinateSI("lng", info?.medium?.Longitude ?? 0) }}</a
        >
      </p>
      <p title="Date">
        <UIcon name="icon-park-outline:time" />
        <span>Date:</span>
        <span>{{ formatTime(info?.large?.timezone?.current_time ?? "") }}</span>
      </p>
      <p title="Phone Prefix">
        <UIcon name="solar:phone-linear" />
        <span>Phone:</span>
        <span>{{ info?.medium?.PhonePrefix }}</span>
      </p>
      <p title="Postal Code">
        <UIcon name="solar:letter-linear" />
        <span>Postal:</span>
        <span>{{ info?.medium?.Postal }}</span>
      </p>
      <p title="ASN">
        <UIcon name="icon-park-outline:connection-arrow" size="11" />
        <span>ASN:</span>
        <span>{{ info?.medium?.asn }}</span>
      </p>
      <p title="Organization">
        <UIcon name="ep:connection" />
        <span>Org:</span>
        <a
          :href="`https://${info?.large?.connection?.domain}`"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Organization"
          >{{ info?.medium?.org }}</a
        >
      </p>
    </div>

    <USeparator class="my-4" />

    <div
      class="grid grid-cols-1 gap-x-8 gap-y-3 text-sm text-gray-700 sm:grid-cols-2 md:grid-cols-3 dark:text-gray-400 [&>p>a]:text-green-700 [&>p>a]:hover:underline dark:[&>p>a]:text-green-400 [&>p]:flex [&>p]:items-center [&>p]:space-x-1"
    >
      <p title="Borders" class="col-span-2">
        <UIcon name="proicons:branch" size="15" />
        <span>Borders:</span>
        <span class="truncate"
          >{{ info?.country?.borders.length }} ({{
            joinStr(info?.country?.borders)
          }})</span
        >
      </p>
      <p title="Altspelling" class="col-span-2">
        <UIcon name="material-symbols:spellcheck-rounded" size="15" />
        <span>Spelling:</span>
        <span>{{ info?.country?.altSpellings[1] }}</span>
      </p>
      <p title="Area">
        <UIcon name="fluent:border-none-24-filled" size="15" />
        <span>Area:</span>
        <span>{{ areaSI(info?.country?.area ?? 0) }}</span>
      </p>
      <p title="Symbol">
        <UIcon name="icon-park-outline:symbol" size="17" />
        <span>Symbol:</span>
        <span
          >{{ info?.country?.alpha2Code }}/{{ info?.country?.alpha3Code }}</span
        >
      </p>
      <p title="Numeric Code">
        <UIcon name="mdi:numeric" size="17" />
        <span>Numeric code:</span>
        <span>{{ info?.country?.numericCode }}</span>
      </p>
      <p title="Language">
        <UIcon name="mdi:language" size="13" />
        <span>Language:</span>
        <span
          >{{ info?.country?.language[0] }} ({{
            info?.country?.languages[0]
          }})</span
        >
      </p>
      <p title="Population">
        <UIcon name="prime:user" size="17" />
        <span>Population:</span>
        <span>{{ unitSI(info?.country?.population ?? 0) }}</span>
      </p>
      <p title="Currency">
        <UIcon name="solar:wad-of-money-linear" size="15" />
        <span>Currency:</span>
        <span>{{ info?.medium?.Currency }}</span>
      </p>
      <!-- <p title="USD Rate">
        <UIcon name="iconoir:dollar-circle" />
        <span>USD Rate:</span>
        <span>{{ Number(info?.medium?.USDRate).toLocaleString() }}</span>
      </p>
      <p title="EUR Rate">
        <UIcon name="material-symbols:euro" />
        <span>EUR Rate:</span>
        <span>{{ Number(info?.medium?.EURRate).toLocaleString() }}</span>
      </p> -->
      <p title="Gini Index">
        <UIcon name="streamline:graph-arrow-increase" />
        <span>Gini:</span>
        <span>{{ info?.country?.gini }}</span>
      </p>
    </div>

    <USeparator class="my-4" />

    <div
      class="grid grid-cols-1 gap-x-8 gap-y-3 text-sm text-gray-700 sm:grid-cols-2 md:grid-cols-3 dark:text-gray-400 [&>p>a]:text-green-700 [&>p>a]:hover:underline dark:[&>p>a]:text-green-400 [&>p]:flex [&>p]:items-center [&>p]:space-x-1"
    >
      <p title="Sunrise">
        <UIcon name="ep:sunrise" size="16" />
        <span>Sunrise:</span>
        <span> {{ info?.sunset?.sunrise }}</span>
      </p>
      <p title="Solar Noon">
        <UIcon name="solar:sun-outline" size="17" />
        <span>Solar noon:</span>
        <span> {{ info?.sunset?.solar_noon }}</span>
      </p>
      <p title="Sunset">
        <UIcon name="ep:sunset" size="13" />
        <span>Sunset:</span>
        <span>
          {{ info?.sunset?.sunset }}
        </span>
      </p>
      <p title="First Light">
        <UIcon name="akar-icons:thunder" size="15" />
        <span>First light:</span>
        <span>
          {{ info?.sunset?.first_light }}
        </span>
      </p>
      <p title="Last Light">
        <UIcon name="solar:moon-line-duotone" size="14" />
        <span>Last light:</span>
        <span>
          {{ info?.sunset?.last_light }}
        </span>
      </p>
      <p title="Nautical Dawn">
        <UIcon name="f7:light-max" size="16" />
        <span>Nautical Dawn:</span>
        <span> {{ info?.sunset?.dawn }}</span>
      </p>
      <p title="Nautical Dusk">
        <UIcon name="f7:light-min" size="16" />
        <span>Nautical Dusk:</span>
        <span> {{ info?.sunset?.dusk }}</span>
      </p>
      <p title="Golden Hour">
        <UIcon name="material-symbols-light:diamond-outline" size="15" />
        <span>Golden hour:</span>
        <span> {{ info?.sunset?.golden_hour }}</span>
      </p>
      <p title="Day Length">
        <UIcon name="lets-icons:line-light" size="15" />
        <span>Day length:</span>
        <span>{{ info?.sunset?.day_length }}</span>
      </p>
      <p title="Weather">
        <UIcon name="mdi:weather-hail" size="15" />
        <span>Weather code:</span>
        <span>{{ info?.v6?.weather }}</span>
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

<style>
.iconify {
  flex-shrink: 0;
}
</style>
