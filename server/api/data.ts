import type {
  LargeInfo,
  MediumInfo,
  SunsetInfo,
  CountryInfo,
} from "~~/types/info";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const [medium, large] = await Promise.all([
    $fetch<MediumInfo>(config.mediumApiUrl),
    $fetch<LargeInfo>(config.largeApiUrl),
  ]);

  let sunset: SunsetInfo["results"] | null = null;

  if (medium?.Latitude && medium?.Longitude) {
    const res = await $fetch<SunsetInfo>(config.sunsetApiUrl, {
      query: {
        lat: medium.Latitude,
        lng: medium.Longitude,
      },
    });

    sunset = res?.results ?? null;
  }

  let country: CountryInfo["data"][0] | null = null;

  if (large?.country) {
    const res = await $fetch<CountryInfo>(config.countryApiUrl, {
      query: {
        name: large.country,
      },
    });

    country = res.data?.[0] ?? null;
  }

  setHeader(
    event,
    "Cache-Control",
    "public, s-maxage=15, stale-while-revalidate=5",
  );

  return {
    medium,
    large,
    sunset,
    country,
  };
});
