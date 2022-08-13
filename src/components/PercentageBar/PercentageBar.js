import React from "react";
import percentage from "utils/percentage";
import millify from "millify";
import getSymbol from "utils/getSymbol";
import * as S from "./PercentageBar.styles";

export default function PercentageBar({ first, second, type, currency }) {
  const basePercentage = percentage(first, second);

  return (
    <S.PercentageBar>
      {(type === "coin" || type === "details") && (
        <S.Header>
          <S.HeaderLeft>
            • {currency && getSymbol(currency)}
            {type === "coin"
              ? millify(Number(first))
              : `${(basePercentage * 100).toFixed(2)}%`}
          </S.HeaderLeft>
          <S.HeaderRight>
            • {currency && getSymbol(currency)}
            {type === "coin"
              ? millify(Number(second))
              : `${(100 - basePercentage * 100).toFixed(2)}%`}
          </S.HeaderRight>
        </S.Header>
      )}
      <div>
        <S.Base type={type} percentage={basePercentage}></S.Base>
        <S.Fill type={type}></S.Fill>
      </div>
    </S.PercentageBar>
  );
}
