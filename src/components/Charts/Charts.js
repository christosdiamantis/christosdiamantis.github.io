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
  });
  
  return (
    <>
      {isFetching && (
        <div>
          <Loader />
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
