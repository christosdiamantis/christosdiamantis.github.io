import React from "react";
import { useGetGlobalStatsQuery } from "services/cryptoAPI";
import { useSelector } from "react-redux";
import millify from "millify";
import { PercentageBar, Loader } from "components";
import getSymbol from "utils/getSymbol";
import * as S from "./GlobalStats.styles";

export default function GlobalStats() {
  const currency = useSelector((state) => state.currency.currency);
  const { data, isFetching } = useGetGlobalStatsQuery();

  return (
    <div>
      {isFetching && (
        <div>
          <Loader />
        </div>
      )}
      {!isFetching && !!data && (
        <S.GlobalStats>
          <thead>
            <tr>
              <th>• Cryptos: {data?.data?.active_cryptocurrencies}</th>
              <th>• Markets: {data?.data?.markets}</th>
              <th>
                • Total Market Cap: {getSymbol(currency)}
                {millify(data?.data?.total_market_cap[currency])}
              </th>
              <th>
                <S.GlobalStatsItem>
                  <img
                    src={
                      "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
                    }
                    alt="logo"
                  />
                  {data?.data?.market_cap_percentage?.btc.toFixed(0)}%
                  <PercentageBar
                    type="global"
                    first={data?.data?.market_cap_percentage?.btc}
                    second={100}
                  />
                </S.GlobalStatsItem>
              </th>
              <th>
                <S.GlobalStatsItem>
                  <img
                    src={
                      "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880"
                    }
                    alt="logo"
                  />
                  {data?.data?.market_cap_percentage?.eth.toFixed(0)}%
                  <PercentageBar
                    type="global"
                    first={data?.data?.market_cap_percentage?.eth}
                    second={100}
                  />
                </S.GlobalStatsItem>
              </th>
            </tr>
          </thead>
        </S.GlobalStats>
      )}
    </div>
  );
}
