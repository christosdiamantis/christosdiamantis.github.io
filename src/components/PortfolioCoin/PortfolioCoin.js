import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "styled-components";
import * as S from "./PortfolioCoin.styles";
import getSymbol from "utils/getSymbol";
import { removeCoin } from "services/portfolio";

export default function PortfolioCoin({
  id,
  currentPrice,
  priceChange,
  volume,
  marketCap,
  lastUpdated,
  coin,
}) {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currency.currency);
  const theme = useTheme();
  var profit = 0;

  return (
    <S.Main>
      <S.Header>
        <img src={coin.thumb} alt="Coin"/>
        <Link to={`/${id}`}>
          {" "}
          {coin.name}({coin.symbol})
        </Link>
      </S.Header>
      <S.CoinContainer>
        <span>Market price:</span>
        <S.Line>
          <div>
            <S.Bold>Current price:</S.Bold>
            {getSymbol(currency)}
            {currentPrice}
          </div>
          <div>
            <S.Bold>Price change 24h:</S.Bold>
            <S.Sign sign={priceChange < 0 ? "negative" : "positive"}>
              {priceChange.toFixed(2)}%
            </S.Sign>
          </div>
          <div>
            <S.Bold>Volume/Market cap:</S.Bold>
            {((volume / marketCap) * 100).toFixed(2)}%
          </div>
          <div>
            <S.Bold>Last updated:</S.Bold>
            {lastUpdated}
          </div>
        </S.Line>
        <span>Your coins:</span>
        {coin.transactions.map((transaction) => {
          profit =
            profit +
            (currentPrice - transaction.price[currency]) * transaction.amount;
          return (
            <S.Line key={transaction.transactionID}>
              <div>
                <S.Bold>Coin Amount:</S.Bold>
                {transaction.amount}
              </div>
              <div>
                <S.Bold>Amount Value:</S.Bold>
                {getSymbol(currency)}
                {(transaction.amount * transaction.price[currency]).toFixed(2)}
              </div>
              <div>
                <S.Bold>Profit:</S.Bold>
                <S.Sign
                  sign={
                    currentPrice - transaction.price[currency] < 0
                      ? "negative"
                      : "positive"
                  }
                >
                  {getSymbol(currency)}
                  {(
                    (currentPrice - transaction.price[currency]) *
                    transaction.amount
                  ).toFixed(4)}
                </S.Sign>
              </div>
              <div>
                <S.Bold>Purchase Date:</S.Bold>
                {transaction.date}
              </div>
              <button
                onClick={() =>
                  dispatch(
                    removeCoin({
                      id: id,
                      transactionID: transaction.transactionID,
                    })
                  )
                }
              >
                <svg
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd"
                >
                  <path 
                  fill={theme.color}
                  d="M19 24h-14c-1.104 0-2-.896-2-2v-17h-1v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2h-1v17c0 1.104-.896 2-2 2zm0-19h-14v16.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-16.5zm-7 7.586l3.293-3.293 1.414 1.414-3.293 3.293 3.293 3.293-1.414 1.414-3.293-3.293-3.293 3.293-1.414-1.414 3.293-3.293-3.293-3.293 1.414-1.414 3.293 3.293zm2-10.586h-4v1h4v-1z" />
                </svg>{" "}
              </button>
            </S.Line>
          );
        })}
        {coin.transactions.length > 1 && (
          <span>
            <S.Bold>Total {profit < 0 ? "loses" : "profit"}: </S.Bold>
            <S.Sign sign={profit < 0 ? "negative" : "positive"}>
              {getSymbol(currency)}
              {Math.abs(profit.toFixed(4))}
            </S.Sign>
          </span>
        )}
      </S.CoinContainer>
    </S.Main>
  );
}
