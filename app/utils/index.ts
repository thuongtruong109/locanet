export const joinStr = (list?: string[]): string => (list ?? []).join(", ");

export const unitSI = (value: number, decimals = 1): string => {
  if (!Number.isFinite(value)) return "";
  if (value === 0) return "0";

  const SI_SYMBOL: readonly string[] = ["", "K", "M", "B", "T"];
  const tier = Math.floor(Math.log10(Math.abs(value)) / 3);

  if (tier === 0) return value.toString();

  const suffix = SI_SYMBOL[tier] ?? "";
  const scale = Math.pow(10, tier * 3);
  const scaled = value / scale;

  return scaled.toFixed(decimals).replace(/\.0$/, "") + suffix;
};

export const areaSI = (areaKm2: number, decimals = 1): string => {
  if (!Number.isFinite(areaKm2) || areaKm2 < 0) return "";

  if (areaKm2 < 1_000) {
    return `${areaKm2.toLocaleString()} km²`;
  }

  if (areaKm2 < 1_000_000) {
    return `${(areaKm2 / 1_000).toFixed(decimals).replace(/\.0$/, "")}K km²`;
  }

  return `${(areaKm2 / 1_000_000).toFixed(decimals).replace(/\.0$/, "")}M km²`;
};

type CoordinateType = "lat" | "lng";

export const coordinateSI = (
  type: CoordinateType,
  value: number | string,
): string => {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (Number.isNaN(num)) return "";

  const absolute = Math.abs(num);
  const degrees = Math.floor(absolute);
  const minutesFloat = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesFloat);
  const seconds = Number(((minutesFloat - minutes) * 60).toFixed(2));

  const direction =
    type === "lat" ? (num >= 0 ? "N" : "S") : num >= 0 ? "E" : "W";

  return `${degrees}°${minutes}'${seconds}" ${direction}`;
};

export const formatTime = (isoString: string): string => {
  const date = new Date(isoString);

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};
