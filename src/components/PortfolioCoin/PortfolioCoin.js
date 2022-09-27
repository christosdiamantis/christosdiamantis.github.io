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
        <img src={coin.thumb} alt="Coin" />
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
            <S.Sign sign={priceChange > 0 ? "portfolioPositive" : "portfolioNegative"}>
              {priceChange ? `${priceChange.toFixed(2)}%` : "N/A"}
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
                <S.Bold>
                  {currentPrice - transaction.price[currency] < 0
                    ? "Loss:"
                    : "Profit:"}
                </S.Bold>
                <S.Sign
                  sign={
                    currentPrice - transaction.price[currency] < 0
                      ? "portfolioNegative"
                      : "portfolioPositive"
                  }
                >
                  {getSymbol(currency)}
                  {Math.abs(
                    (
                      (currentPrice - transaction.price[currency]) *
                      transaction.amount
                    ).toFixed(4)
                  )}
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
                  xmlns="http://www.w3.org/2000/svg"
                  fill={theme.color}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke={theme.color === "#333" ? "#fff" : "#333"}
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </S.Line>
          );
        })}
        {coin.transactions.length > 1 && (
          <span>
            <S.Bold>Total {profit < 0 ? "loses" : "profit"}: </S.Bold>
            <S.Sign sign={profit < 0 ? "portfolioNegative" : "portfolioPositive"}>
              {getSymbol(currency)}
              {Math.abs(profit.toFixed(4))}
            </S.Sign>
          </span>
        )}
      </S.CoinContainer>
    </S.Main>
  );
}
