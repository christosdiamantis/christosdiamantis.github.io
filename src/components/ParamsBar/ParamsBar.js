import React from "react";
import { PagesBar } from "components";
import * as S from "./ParamsBar.styles";

export default function ParamsBar({ handlePerPage, perPage, ...rest }) {
  return (
    <S.Bar>
      <S.LeftSide>
        <S.Bold>TOP COINS</S.Bold>
        <div>BY MARKET CAP</div>
      </S.LeftSide>
      <S.RightSide>
        <S.Show>
          SHOW:
          <S.Select onChange={(e) => handlePerPage(e)} value={perPage}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </S.Select>
        </S.Show>
        <PagesBar perPage={perPage} {...rest} />
      </S.RightSide>
    </S.Bar>
  );
}
