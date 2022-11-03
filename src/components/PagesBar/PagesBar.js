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
      <button onClick={() => decreasePageNumber()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-chevron-left"
          viewBox="-1 -1 16 16"
        >
          <path
            fillRule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
        </svg>
      </button>
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
      <button onClick={() => increasePageNumber()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-chevron-right"
          viewBox="1 -1 16 16"
        >
          <path
            fillRule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </button>
    </S.PagesBar>
  );
}
