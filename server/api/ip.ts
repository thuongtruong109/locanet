import type { H3Event } from "h3";
import { getRequestHeader, getRequestIP } from "h3";

const pickFirst = (v?: string | null) => (v ? v.split(",")[0]!.trim() : null);

function getClientIp(event: H3Event): string | null {
  const vff = pickFirst(getRequestHeader(event, "x-vercel-forwarded-for"));
  if (vff) return vff;

  const cf = getRequestHeader(event, "cf-connecting-ip");
  if (cf) return cf.trim();

  const tci = getRequestHeader(event, "true-client-ip");
  if (tci) return tci.trim();

  const realIp = getRequestHeader(event, "x-real-ip");
  if (realIp) return realIp.trim();

  const xff = pickFirst(getRequestHeader(event, "x-forwarded-for"));
  if (xff) return xff;

  return getRequestIP(event) ?? null;
}

export default defineEventHandler((event: H3Event) => getClientIp(event));
