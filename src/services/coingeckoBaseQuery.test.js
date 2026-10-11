import { createRateLimitedBaseQuery } from "./coingeckoBaseQuery";

jest.mock("@reduxjs/toolkit/query/react", () => ({ fetchBaseQuery: () => jest.fn() }));

const limited = (header, error = { status: 429 }) => ({
  error, meta: { response: { headers: { get: () => header } } },
});

test("honors Retry-After and blocks other endpoints until cooldown expires", async () => {
  let now = 1000;
  const raw = jest.fn().mockResolvedValueOnce(limited("120")).mockResolvedValue({ data: [] });
  const query = createRateLimitedBaseQuery(raw, () => now);
  expect((await query("/search")).error.retryAt).toBe(121000);
  expect((await query("/global")).error.status).toBe(429);
  expect(raw).toHaveBeenCalledTimes(1);
  now = 121000;
  expect(await query("/global")).toEqual({ data: [] });
  expect(raw).toHaveBeenCalledTimes(2);
});

test.each([null, "invalid", "0"])("uses a 60 second fallback for %s", async (header) => {
  const query = createRateLimitedBaseQuery(jest.fn().mockResolvedValue(limited(header)), () => 1000);
  expect((await query("/global")).error.retryAt).toBe(61000);
});

test("supports HTTP-date headers and non-JSON 429 responses", async () => {
  const query = createRateLimitedBaseQuery(jest.fn().mockResolvedValue(
    limited("Thu, 01 Jan 1970 00:02:00 GMT", { status: "PARSING_ERROR", originalStatus: 429 })
  ), () => 1000);
  expect((await query("/global")).error).toMatchObject({ status: 429, retryAt: 120000 });
});

test("does not retry network or server failures automatically", async () => {
  const raw = jest.fn().mockResolvedValue({ error: { status: "FETCH_ERROR" } });
  const query = createRateLimitedBaseQuery(raw);
  expect((await query("/global")).error.status).toBe("FETCH_ERROR");
  expect(raw).toHaveBeenCalledTimes(1);
});
