export interface MediumInfo {
  status: string;
  ip: string;
  CountryCode: string;
  CountryName: string;
  Capital: string;
  PhonePrefix: string;
  Currency: string;
  USDRate: string;
  EURRate: string;
  RegionCode: string;
  RegionName: string;
  City: string;
  Postal: string;
  Latitude: string;
  Longitude: string;
  TimeZone: string;
  ContinentCode: string;
  ContinentName: string;
  asn: string;
  org: string;
}

export interface V6Info {
  ip: string;
  aso: string;
  asn: number;
  type: string;
  continent: string;
  cc: string;
  country: string;
  city: string;
  latitude: number;
  longitude: number;
  tz: string;
  weather: string;
}

export interface LargeInfo {
  ip: string;
  success: boolean;
  type: string;
  continent: string;
  continent_code: string;
  country: string;
  country_code: string;
  region: string;
  region_code: string;
  city: string;
  latitude: number;
  longitude: number;
  is_eu: boolean;
  postal: string;
  calling_code: string;
  capital: string;
  borders: string;
  flag: {
    img: string;
    emoji: string;
    emoji_unicode: string;
  };
  connection: {
    asn: number;
    org: string;
    isp: string;
    domain: string;
  };
  timezone: {
    id: string;
    abbr: string;
    is_dst: boolean;
    offset: number;
    utc: string;
    current_time: string;
  };
}

export interface SunsetInfo {
  results: {
    date: string;
    sunrise: string;
    sunset: string;
    first_light: string;
    last_light: string;
    dawn: string;
    dusk: string;
    solar_noon: string;
    golden_hour: string;
    day_length: string;
    nautical_twilight_begin: string;
    nautical_twilight_end: string;
    timezone: string;
    utc_offset: number;
  };
  status: string;
}

export interface CountryInfo {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Array<{
    name: string;
    nativeName: string;
    topLevelDomain: string[];
    alpha2Code: string;
    numericCode: string;
    alpha3Code: string;
    currencies: string[];
    callingCodes: string[];
    capital: string;
    altSpellings: string[];
    relevance: string;
    region: string;
    subregion: string;
    language: string[];
    languages: string[];
    translations: Record<string, string>;
    population: number;
    latlng: number[];
    demonym: string;
    borders: string[];
    area: number;
    gini: number;
    timezones: string[];
  }>;
}
