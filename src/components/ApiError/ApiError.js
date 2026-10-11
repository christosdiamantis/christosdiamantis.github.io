import React, { useEffect, useState } from "react";

export default function ApiError({ error, onRetry, context }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    setNow(Date.now());
    if (!error?.retryAt) return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [error]);
  if (!error) return null;
  const seconds = Math.max(0, Math.ceil(((error.retryAt || 0) - now) / 1000));
  const status = error.originalStatus || error.status;
  let message = "Unable to load CoinGecko data. Please try again.";
  if (status === 429) {
    message = seconds
      ? `CoinGecko rate limit reached. Try again in ${seconds} seconds.`
      : "CoinGecko rate limit reached. You can try again now.";
  } else if (error.status === "TIMEOUT_ERROR") {
    message = "CoinGecko took too long to respond. Please try again.";
  } else if (error.status === "FETCH_ERROR") {
    message = typeof navigator !== "undefined" && navigator.onLine === false
      ? "Your browser appears to be offline. Reconnect, then try again."
      : "CoinGecko is currently unreachable from this browser. Please try again shortly.";
  } else if (status === 401) {
    message = "CoinGecko requires API authentication for this data. Retrying may not help.";
  } else if (status === 403) {
    message = "CoinGecko refused access to this data. Access may be restricted by its API plan or security rules.";
  } else if (status === 404) {
    message = "This coin or its data is no longer available on CoinGecko.";
  } else if (typeof status === "number" && status >= 500) {
    message = `CoinGecko is having trouble (HTTP ${status}). Please try again shortly.`;
  } else if (error.status === "PARSING_ERROR") {
    message = "CoinGecko returned an unexpected response. Please try again shortly.";
  } else if (typeof status === "number" && status >= 400) {
    message = `CoinGecko could not fulfill this request (HTTP ${status}). Try a different coin or date.`;
  } else if (error.status === "CUSTOM_ERROR") {
    message = error.error;
  }
  return <div role="alert">
    {context && <strong>{context}: </strong>}{message}{" "}
    {onRetry && <button type="button" disabled={seconds > 0} onClick={onRetry}>Retry</button>}
  </div>;
}
