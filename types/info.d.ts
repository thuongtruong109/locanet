export interface MediumInfo {
  status: string;
  query: string;
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
  "About Us": string;
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
    timezone: string;
    utc_offset: number;
  };
  status: string;
}
