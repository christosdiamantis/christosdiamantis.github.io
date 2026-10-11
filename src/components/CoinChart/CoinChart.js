import ApiError from "components/ApiError/ApiError";
import React, { useState } from "react";
import * as S from "./CoinChart.styles";
import { useSelector } from "react-redux";
import { useGetMarketsQuery } from "services/cryptoAPI";
import { Loader, CoinLineChart } from "components";

export default function CoinChart({ coin }) {
  const [days, setDays] = useState("30");
  const currency = useSelector((state) => state.currency.currency);
  const { currentData: data, isFetching, isError, error, refetch } = useGetMarketsQuery({
    coin: coin,
    currency: currency,
    days: Number(days),
  });

  return (
    <>
      {isFetching && !data && (
        <div>
          <Loader />
        </div>
      )}
      {isError && (
        <ApiError context="Coin chart" error={error} onRetry={refetch} />
      )}
      {data && !data.prices?.length && <div>No chart data is available for this period.</div>}
      {!!data?.prices?.length && (
        <>
          <S.CustomRadio>
            <S.Radio>
              <S.Button
                onClick={() => setDays("7")}
                checked={days === "7"}
              ></S.Button>
              <span>7d</span>
            </S.Radio>
            <S.Radio>
              <S.Button
                onClick={() => setDays("30")}
                checked={days === "30"}
              ></S.Button>
              <span>30d</span>
            </S.Radio>
            <S.Radio>
              <S.Button
                onClick={() => setDays("180")}
                checked={days === "180"}
              ></S.Button>
              <span>180d</span>
            </S.Radio>
            <S.Radio>
              <S.Button
                onClick={() => setDays("365")}
                checked={days === "365"}
              ></S.Button>
              <span>1y</span>
            </S.Radio>
          </S.CustomRadio>
          <S.Chart>
            <CoinLineChart data={data?.prices} currency={currency} />
          </S.Chart>
        </>
      )}
    </>
  );
}
