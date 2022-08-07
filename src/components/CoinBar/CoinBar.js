import React from "react";
import * as S from "./CoinBar.styles";

export default function CoinBar({ handleSortingState, sortingState }) {
  const [value, order] = sortingState?.split("_") || ["", ""];
  const arrowUp = "▲";
  const arrowDown = "▼";
  const isDescending = order === "desc";

  return (
    <thead>
      <S.CoinBar>
        <S.Sticky>
          <S.Patch></S.Patch>
          <span id="rank" onClick={(e) => handleSortingState(e)}>
            #
          </span>
          {value === "rank" && (
            <S.Arrow> {isDescending ? arrowUp : arrowDown}</S.Arrow>
          )}
        </S.Sticky>
        <S.StickyName>
          <span id="name" onClick={(e) => handleSortingState(e)}>
            Name
          </span>
          {value === "name" && (
            <S.Arrow> {isDescending ? arrowUp : arrowDown}</S.Arrow>
          )}
        </S.StickyName>
        <th>
          <span id="price" onClick={(e) => handleSortingState(e)}>
            Price
          </span>
          {value === "price" && (
            <S.Arrow> {isDescending ? arrowUp : arrowDown}</S.Arrow>
          )}
        </th>
        <th>
          <span id="change1h" onClick={(e) => handleSortingState(e)}>
            1h%
          </span>
          {value === "change1h" && (
            <S.Arrow> {isDescending ? arrowUp : arrowDown}</S.Arrow>
          )}
        </th>
        <th>
          <span id="change24h" onClick={(e) => handleSortingState(e)}>
            24h%
          </span>
          {value === "change24h" && (
            <S.Arrow> {isDescending ? arrowUp : arrowDown}</S.Arrow>
          )}
        </th>
        <th>
          <span id="change7d" onClick={(e) => handleSortingState(e)}>
            7d%
          </span>
          {value === "change7d" && (
            <S.Arrow> {isDescending ? arrowUp : arrowDown}</S.Arrow>
          )}
        </th>
        <th>
          <span>24h Vol/Market cap</span>
        </th>
        <th>
          <span>Circulation/Total Sup</span>
        </th>
        <th>
          <span>Last 7d (USD)</span>
        </th>
      </S.CoinBar>
    </thead>
  );
}
