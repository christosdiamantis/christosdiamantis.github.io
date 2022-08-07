import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "components";
import { useGetSearchQuery } from "services/searchAPI";
import * as S from "./SearchBar.styles";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const { data, isFetching, isError } = useGetSearchQuery(search);
  const [focused, setFocused] = React.useState(false);
  const searchData = !!data ? data : [];

  return (
    <S.SearchContainer>
      <form>
        <S.SearchBar>
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
      {search.length !== 0 && data?.length === 0 && (
        <S.NoMatches>No matches</S.NoMatches>
      )}
      {data && !!data.length && !isError && !isFetching && focused && !!search && (
        <S.SearchResults>
          {searchData.map((coin) => {
            return (
              <Link
                to={`/${coin.name}`}
                onClick={() => setSearch("")}
                key={coin.id}
                onMouseDown={(e) => e.preventDefault()}
              >
                <img src={coin.thumb} alt={coin.id} />
                <div>
                  {coin.name}({coin.symbol})
                </div>
              </Link>
            );
          })}
        </S.SearchResults>
      )}
    </S.SearchContainer>
  );
}
