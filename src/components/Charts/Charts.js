import React from "react";
import { BarChart, LineChart, Loader } from "components";
import { useSelector } from "react-redux";
import { useGetMarketsQuery } from "services/cryptoAPI";
import * as S from "./Charts.styles";

export default function Charts() {
  const currency = useSelector((state) => state.currency.currency);
  const { data, isFetching, isError, error } = useGetMarketsQuery({
    coin: "bitcoin",
    currency: currency,
    days: 30,
  });

  return (
    <>
      <h2 style={{ marginTop: "1em", marginBottom: "0.3em" }}>Bitcoin Charts</h2>
      {isFetching && (
        <div>
          <S.Placeholder>
            <Loader />
          </S.Placeholder>
        </div>
      )}
      {isError && (
        <div>
          Error {error.status}: {error.data.error}
        </div>
      )}
      {!isFetching && !!data && (
        <>
          <S.Charts>
            <LineChart data={data.prices} currency={currency} />
            <BarChart data={data.total_volumes} currency={currency} />
          </S.Charts>
        </>
      )}
    </>
  );
}
