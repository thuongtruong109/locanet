import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  points: 100,
  duration: 60,
});

export default defineEventHandler(async (event) => {
  const ip =
    getHeader(event, "x-forwarded-for") ||
    event.node.req.socket.remoteAddress ||
    "unknown";

  try {
    await rateLimiter.consume(ip.toString());
  } catch {
    throw createError({
      statusCode: 429,
      statusMessage: "Too Many Requests",
    });
  }
});
