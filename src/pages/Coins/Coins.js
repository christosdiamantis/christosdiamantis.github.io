import React from "react";
import { Charts, CoinList } from "components";
import * as S from "./Coins.styles";

export default function Coins() {
  return (
    <S.CoinPage>
      <Charts />
      <CoinList />
    </S.CoinPage>
  );
}
