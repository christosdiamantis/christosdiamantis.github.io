import ApiError from "components/ApiError/ApiError";
import React from "react";
import { BarChart, LineChart, Loader } from "components";
import { useSelector } from "react-redux";
import { useGetMarketsQuery } from "services/cryptoAPI";
import * as S from "./Charts.styles";

export default function Charts() {
  const currency = useSelector((state) => state.currency.currency);
  const { currentData: data, isFetching, isError, error, refetch } = useGetMarketsQuery({
    coin: "bitcoin",
    currency: currency,
    days: 30,
  });

  return (
    <>
      <h2 style={{ marginTop: "1em", marginBottom: "0.3em" }}>Bitcoin Charts</h2>
      {isFetching && !data && (
        <div>
          <S.Placeholder>
            <Loader />
          </S.Placeholder>
        </div>
      )}
      {!!isError && (
        <ApiError context="Bitcoin charts" error={error} onRetry={refetch} />
      )}
      {data && !data.prices?.length && <div>No chart data is available for this period.</div>}
      {!!data?.prices?.length && (
        <>
          <S.Charts>
            <LineChart data={data.prices} currency={currency} />
            {!!data.total_volumes?.length && <BarChart data={data.total_volumes} currency={currency} />}
          </S.Charts>
        </>
      )}
    </>
  );
}
