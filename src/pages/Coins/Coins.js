import React from "react";
import { Charts, CoinList, Footer } from "components";
import * as S from "./Coins.styles";

export default function Coins() {
  return (
    <S.CoinPage>
      <Charts />
      <CoinList />
      <Footer />
    </S.CoinPage>
  );
}
