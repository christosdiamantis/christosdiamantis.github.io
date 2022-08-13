import React, { useState } from "react";
import { useTheme } from "styled-components";
import * as S from "./CurrencyConverter.styles";

export default function CurrencyConverter({ currency, coin, price }) {
  const [inverted, setInverted] = useState(false);
  const [amount, setAmount] = useState(1);
  const [amountFromCurrency, setAmountFromCurrency] = useState(true);
  const theme = useTheme();

  function fixNumber(number) {
    return Number(number.toFixed(8));
  }

  let toAmount, fromAmount;
  if (amountFromCurrency) {
    fromAmount = amount;
    toAmount = inverted ? fixNumber(amount / price) : fixNumber(amount * price);
  } else {
    toAmount = amount;
    fromAmount = inverted
      ? fixNumber(amount * price)
      : fixNumber(amount / price);
  }

  function handleFromAmount(e) {
    setAmount(e.target.value);
    setAmountFromCurrency(true);
  }

  function handleToAmount(e) {
    setAmount(e.target.value);
    setAmountFromCurrency(false);
  }

  function handleInverted() {
    setInverted(!inverted);
  }

  return (
    <S.Converter>
      <S.Currency>
        <div>
          <span>{inverted ? currency.toUpperCase() : coin.toUpperCase()}</span>
        </div>
        <input
          type="number"
          className="input"
          value={fromAmount}
          onChange={(e) => handleFromAmount(e)}
        ></input>
      </S.Currency>
      <button onClick={handleInverted}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24.106"
          height="18.835"
          viewBox="0 0 24.106 18.835"
        >
          <path
            id="Icon_awesome-exchange-alt"
            data-name="Icon awesome-exchange-alt"
            d="M0,9.21V8.457a1.13,1.13,0,0,1,1.13-1.13H18.08V5.067a1.131,1.131,0,0,1,1.929-.8l3.767,3.767a1.13,1.13,0,0,1,0,1.6L20.009,13.4a1.131,1.131,0,0,1-1.929-.8V10.34H1.13A1.13,1.13,0,0,1,0,9.21Zm22.977,7.157H6.027v-2.26a1.131,1.131,0,0,0-1.929-.8L.331,17.075a1.13,1.13,0,0,0,0,1.6L4.1,22.439a1.131,1.131,0,0,0,1.929-.8V19.38h16.95a1.13,1.13,0,0,0,1.13-1.13V17.5A1.13,1.13,0,0,0,22.977,16.367Z"
            transform="translate(0 -3.936)"
            fill={theme.color}
          />
        </svg>
      </button>
      <S.Coin>
        <input
          type="number"
          className="input"
          value={toAmount}
          onChange={(e) => handleToAmount(e)}
        ></input>
        <div>{inverted ? coin.toUpperCase() : currency.toUpperCase()}</div>
      </S.Coin>
    </S.Converter>
  );
}
