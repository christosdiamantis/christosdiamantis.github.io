import ApiError from "components/ApiError/ApiError";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader } from "components";
import { useGetSearchQuery } from "services/searchAPI";
import * as S from "./SearchBar.styles";

export default function SearchBar({ type, pullData, disabled = false }) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search.trim()), 350);
    return () => clearTimeout(timer);
  }, [search]);
  const { currentData: data, isFetching, isError, error, refetch } = useGetSearchQuery(
    debouncedSearch, { skip: disabled || !debouncedSearch || debouncedSearch !== search.trim() }
  );
  const ready = !!search.trim() && search.trim() === debouncedSearch;
  const [focused, setFocused] = useState(false);
  const searchData = data || { coins: [] };

  function handleClick (coin) {
    pullData(coin)
    setSearch("")
  }

  return (
    <S.SearchContainer>
      <form onSubmit={(event) => event.preventDefault()}>
        <S.SearchBar type={type}>
          <input
            type="text"
            disabled={disabled}
            placeholder=" Search..."
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </S.SearchBar>
      </form>
      {focused && !!search.trim() && (!ready || isFetching) && (
        <S.Loading>
          <Loader />
        </S.Loading>
      )}
      {focused && ready && !isFetching && !isError && data?.coins?.length === 0 && (
        <S.NoMatches>No matches</S.NoMatches>
      )}
      {focused && ready && isError && (
        <S.NoMatches><ApiError context="Coin search" error={error} onRetry={refetch} /></S.NoMatches>
      )}
      {ready && data && !!searchData.coins?.length && !isError && !isFetching && focused && (
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
