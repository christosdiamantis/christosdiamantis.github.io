import React from "react";
import * as S from "./PagesBar.styles";

export default function PagesBar({
  pageNumber,
  increasePageNumber,
  decreasePageNumber,
  setPageNumber,
  perPage,
}) {
  return (
    <S.PagesBar>
      <button onClick={() => decreasePageNumber()}>{"<"}</button>
      {pageNumber - 2 > 0 && (
        <button onClick={(e) => setPageNumber(Number(e.target.innerText))}>
          {1}
        </button>
      )}
      {pageNumber - 2 > 1 && pageNumber !== 1 && "..."}
      {pageNumber - 1 > 0 && (
        <button onClick={(e) => setPageNumber(Number(e.target.innerText))}>
          {pageNumber - 1}
        </button>
      )}
      <S.CurrentPage>{pageNumber} </S.CurrentPage>
      {pageNumber + 1 < 10000 / perPage + 1 && (
        <button onClick={(e) => setPageNumber(Number(e.target.innerText))}>
          {pageNumber + 1}
        </button>
      )}
      {pageNumber + 2 < 10000 / perPage + 1 &&
        pageNumber + 2 !== 10000 / perPage &&
        "..."}
      {pageNumber + 2 < 10000 / perPage + 1 && (
        <button onClick={(e) => setPageNumber(Number(e.target.innerText))}>
          {10000 / perPage}
        </button>
      )}
      <button onClick={() => increasePageNumber()}>{">"}</button>
    </S.PagesBar>
  );
}
