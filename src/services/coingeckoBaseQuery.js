import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Shared by both API slices. A 429 pauses new network requests in this tab.
export function createRateLimitedBaseQuery(baseQuery, now = Date.now) {
  let retryAt = 0;
  return async (args, api, extraOptions) => {
    if (now() < retryAt) {
      return { error: { status: 429, retryAt } };
    }
    const result = await baseQuery(args, api, extraOptions);
    if ((result.error?.originalStatus || result.error?.status) === 429) {
      const header = result.meta?.response?.headers.get("Retry-After");
      const seconds = header == null || header.trim() === "" ? NaN : Number(header);
      const deadline = Number.isFinite(seconds)
        ? now() + Math.max(0, seconds) * 1000
        : Date.parse(header);
      retryAt = Math.max(retryAt, Number.isFinite(deadline) && deadline > now()
        ? deadline : now() + 60000);
      return { ...result, error: { ...result.error, status: 429, retryAt } };
    }
    return result;
  };
}

export default createRateLimitedBaseQuery(fetchBaseQuery({
  baseUrl: "https://api.coingecko.com/api/v3",
  timeout: 15000,
}));
