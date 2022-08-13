import React from "react";
import { useGetCoinQuery } from "services/cryptoAPI";
import { useSelector } from "react-redux";
import { useTheme } from "styled-components";
import getDateAndTime from "utils/getDateAndTime";
import millify from "millify";
import parse from "html-react-parser";
import { Loader, CurrencyConverter, Link, PercentageBar } from "components";
import getSymbol from "utils/getSymbol";
import * as S from "./Details.styles";

export default function Details({ coin }) {
  const currency = useSelector((state) => state.currency.currency);
  const { data, isFetching, isError, error } = useGetCoinQuery(coin);
  const theme = useTheme();

  const market = data?.market_data;
  const arrowUp = "▲";
  const arrowDown = "▼";
  var priceSign =
    market?.price_change_percentage_24h_in_currency[currency] < 0
      ? "negative"
      : "positive";

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
          <S.CoinDetails>
            <h2>Summary</h2>
            <S.Details>
              <div>
                <img src={data.image.large} alt="Coin" />
                <S.Name>
                  {data.name}({data.symbol.toUpperCase()})
                </S.Name>
                <Link url={data.links.homepage[0]} />
              </div>
              <div>
                <S.Price>
                  <div>
                    {getSymbol(currency)}
                    {Number(market?.current_price[currency]).toLocaleString(
                      "en-GB"
                    )}
                  </div>
                  <S.Percentage sign={priceSign}>
                    <S.Arrow sign={priceSign}>
                      {priceSign === "positive" ? arrowUp : arrowDown}
                    </S.Arrow>
                    <div>
                      {Math.abs(
                        market?.price_change_percentage_24h_in_currency[
                          currency
                        ]
                      ).toFixed(1)}
                      %
                    </div>
                  </S.Percentage>
                </S.Price>
                <S.DailyChange>
                  <S.Bold>
                    Daily{" "}
                    {market?.price_change_24h_in_currency[currency] < 0
                      ? "Loss"
                      : "Profit"}
                    :
                  </S.Bold>
                  <S.Change sign={priceSign}>
                    {getSymbol(currency)}
                    {Math.abs(
                      market?.price_change_24h_in_currency[currency]
                    ).toFixed(2)}
                  </S.Change>
                </S.DailyChange>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                >
                  <path
                    id="Icon_awesome-layer-group"
                    data-name="Icon awesome-layer-group"
                    d="M.533,6.36,10.542,10.9a1.1,1.1,0,0,0,.915,0L21.466,6.36a.96.96,0,0,0,0-1.72L11.458.1a1.1,1.1,0,0,0-.915,0L.533,4.64a.96.96,0,0,0,0,1.72Zm20.933,3.793-2.5-1.131L12.025,12.17a2.477,2.477,0,0,1-2.05,0L3.03,9.022l-2.5,1.131a.959.959,0,0,0,0,1.719l10.009,4.537a1.1,1.1,0,0,0,.915,0l10.01-4.537a.959.959,0,0,0,0-1.719Zm0,5.491L18.98,14.518,12.025,17.67A2.466,2.466,0,0,1,11,17.892a4.59,4.59,0,0,1-1.025-.222L3.02,14.518.533,15.645a.959.959,0,0,0,0,1.719L10.542,21.9a1.1,1.1,0,0,0,.915,0l10.01-4.537a.959.959,0,0,0,0-1.719Z"
                    transform="translate(0 0.001)"
                    fill={theme.color}
                  />
                </svg>

                <S.AllTime>
                  <S.Arrow sign="positive">{arrowUp}</S.Arrow>
                  <div>
                    <S.Bold>All Time High:</S.Bold> {getSymbol(currency)}
                    {Number(market?.ath[currency]).toLocaleString("en-GB")}
                    <br></br>
                    {getDateAndTime(
                      Date.parse(`${market?.ath_date[currency]}`)
                    )}
                  </div>
                </S.AllTime>
                <S.AllTime>
                  <S.Arrow sign="negative">{arrowDown}</S.Arrow>
                  <div>
                    <div>
                      <S.Bold>All Time Low:</S.Bold> {getSymbol(currency)}
                      {Number(market?.atl[currency]).toLocaleString("en-GB")}
                    </div>
                    <div>
                      {getDateAndTime(
                        Date.parse(`${market?.atl_date[currency]}`)
                      )}
                    </div>
                  </div>
                </S.AllTime>
              </div>
              <div>
                <S.LineElement>
                  <S.Circle> </S.Circle>
                  <S.Bold>Market Cap:</S.Bold>
                  {getSymbol(currency)}
                  {millify(Number(market?.market_cap[currency]))}
                </S.LineElement>
                <br></br>
                <S.LineElement>
                  <S.Circle> </S.Circle>
                  <S.Bold>Fully Diluted Valuation:</S.Bold>
                  {market?.fully_diluted_valuation[currency]
                    ? `${getSymbol(currency)}
                  ${millify(Number(market?.fully_diluted_valuation[currency]))}`
                    : "N/A"}
                </S.LineElement>
                <br></br>
                <S.LineElement>
                  <S.Circle> </S.Circle>
                  <S.Bold>Total Volume:</S.Bold>
                  {getSymbol(currency)}
                  {millify(Number(market?.total_volume[currency]))}
                </S.LineElement>
                <br></br>
                <S.LineElement>
                  <S.Circle> </S.Circle>
                  <S.Bold>Circulating Supply:</S.Bold>
                  {millify(Number(market?.circulating_supply))}{" "}
                  {data?.symbol.toUpperCase()}
                </S.LineElement>
                <br></br>
                <S.LineElement>
                  <S.Circle> </S.Circle>
                  <S.Bold>Max Supply:</S.Bold>
                  {millify(Number(market?.max_supply))}{" "}
                  {data?.symbol.toUpperCase()}
                </S.LineElement>
                <br></br>
                <S.LineElement>
                  <S.Circle> </S.Circle>
                  <S.Bold>Total Volume/Market Cap:</S.Bold>
                </S.LineElement>
                <S.LineElement>
                  <S.StyledBar></S.StyledBar>
                  <PercentageBar
                    type="details"
                    first={market?.total_volume[currency]}
                    second={market?.market_cap[currency]}
                  />
                </S.LineElement>
              </div>
            </S.Details>
            <h2>Description</h2>
            <S.Description>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                >
                  <path
                    id="Icon_awesome-layer-group"
                    data-name="Icon awesome-layer-group"
                    d="M.533,6.36,10.542,10.9a1.1,1.1,0,0,0,.915,0L21.466,6.36a.96.96,0,0,0,0-1.72L11.458.1a1.1,1.1,0,0,0-.915,0L.533,4.64a.96.96,0,0,0,0,1.72Zm20.933,3.793-2.5-1.131L12.025,12.17a2.477,2.477,0,0,1-2.05,0L3.03,9.022l-2.5,1.131a.959.959,0,0,0,0,1.719l10.009,4.537a1.1,1.1,0,0,0,.915,0l10.01-4.537a.959.959,0,0,0,0-1.719Zm0,5.491L18.98,14.518,12.025,17.67A2.466,2.466,0,0,1,11,17.892a4.59,4.59,0,0,1-1.025-.222L3.02,14.518.533,15.645a.959.959,0,0,0,0,1.719L10.542,21.9a1.1,1.1,0,0,0,.915,0l10.01-4.537a.959.959,0,0,0,0-1.719Z"
                    transform="translate(0 0.001)"
                    fill={theme.color}
                  />
                </svg>
                <div>
                  {!!data.description.en
                    ? parse(data.description.en)
                    : "No description provided"}
                </div>
              </div>
            </S.Description>
            <S.Links>
              <Link url={data?.links?.blockchain_site[0]} />
              <Link url={data?.links?.blockchain_site[1]} />
              <Link url={data?.links?.blockchain_site[2]} />
            </S.Links>
          </S.CoinDetails>
          <CurrencyConverter
            currency={currency}
            coin={data.symbol}
            price={market?.current_price[currency]}
          />
        </>
      )}
    </>
  );
}
