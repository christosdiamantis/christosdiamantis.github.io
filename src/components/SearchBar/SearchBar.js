import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "components";
import { useGetSearchQuery } from "services/searchAPI";
import * as S from "./SearchBar.styles";

export default function SearchBar({ type, pullData }) {
  const [search, setSearch] = useState("");
  const { data, isFetching, isError } = useGetSearchQuery(search);
  const [focused, setFocused] = useState(false);
  const searchData = !!data ? data : [];

  function handleClick (coin) {
    pullData(coin)
    setSearch("")
  }

  return (
    <S.SearchContainer>
      <form>
        <S.SearchBar type={type}>
          <input
            type="text"
            placeholder=" Search..."
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </S.SearchBar>
      </form>
      {isFetching && !!search && (
        <S.Loading>
          <Loader />
        </S.Loading>
      )}
      {search.length !== 0 && data?.coins.length === 0 && (
        <S.NoMatches>No matches</S.NoMatches>
      )}
      {data && !!searchData.coins.length && !isError && !isFetching && focused && !!search && (
        <S.SearchResults>
          {type === "form" && searchData?.coins?.slice(0, 5)?.map((coin) => {
            return (
              <S.SearchDiv
                onClick={() => handleClick(coin)}
                key={coin?.id}
                onMouseDown={(e) => e.preventDefault()}
              >
                <img src={coin?.thumb} alt={coin?.id} />
                <div>
                  {coin?.name}({coin?.symbol})
                </div>
              </S.SearchDiv>
            );
          })}
          {type === "navbar" && searchData?.coins?.slice(0, 10)?.map((coin) => {
            return (
              <Link
                to={`/${coin?.id}`}
                onClick={() => setSearch("")}
                key={coin.id}
                onMouseDown={(e) => e.preventDefault()}
              >
                <img src={coin?.thumb} alt={coin?.id} />
                <div>
                  {coin?.name}({coin.symbol})
                </div>
              </Link>
            );
          })}
        </S.SearchResults>
      )}
    </S.SearchContainer>
  );
}
