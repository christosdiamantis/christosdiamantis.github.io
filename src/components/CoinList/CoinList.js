import ApiError from "components/ApiError/ApiError";
import React, { useState } from "react";
import { ParamsBar, CoinBar, Coin, Loader, PagesBar } from "components";
import { useSelector } from "react-redux";
import { useGetCoinsQuery } from "services/cryptoAPI";
import matchIDtoAPIName from "utils/matchIDtoAPIName";
import * as S from "./CoinList.styles";

export default function CoinList() {
  const currency = useSelector((state) => state.currency.currency);
  const [perPage, setPerPage] = useState(() => {
    try {
      const saved = Number(localStorage.getItem("perPage"));
      return [10, 20, 50, 100].includes(saved) ? saved : 20;
    } catch { return 20; }
  });
  const [pageNumber, setPageNumber] = useState(1);
  const [sortingState, setSortingState] = useState();
  const { currentData: data, isFetching, isError, error, refetch } = useGetCoinsQuery({
    currency: currency,
    perPage: perPage,
    page: pageNumber,
  });


  function handlePerPage(e) {
    try { localStorage.setItem("perPage", e.target.value); } catch { /* Storage unavailable. */ }
    setPerPage(Number(e.target.value));
    setPageNumber(1);
  }

  function decreasePageNumber() {
    if (pageNumber > 1) {
      setPageNumber((previousNumber) => previousNumber - 1);
    }
  }

  function increasePageNumber() {
    if (pageNumber < 10000 / perPage) {
      setPageNumber(pageNumber + 1);
    }
  }

  function handleSortingState({ target: { id } }) {
    if (window.gtag)  {
      window.gtag("event", "sort", {
        event_category: "sort",
        event_label: id,
      });
    }
    const [value, order] = sortingState?.split("_") || ["", ""];
    id === value
      ? setSortingState(id.concat(order === "desc" ? "_asc" : "_desc"))
      : setSortingState(id.concat("_desc"));
  }

  var coins = [];

  if (data) {
    const [sortValue, sortOrder] = sortingState?.split("_") || ["", ""];
    var list = [...data];
    if (!!sortValue) {
      if (sortValue === "name") {
        list.sort(function compare(a, b) {
          if (a[sortValue] > b[sortValue]) {
            return sortingState.split("_")[1] === "asc" ? 1 : -1;
          } else if (a.name < b.name) {
            return sortingState.split("_")[1] === "asc" ? -1 : 1;
          } else {
            return 0;
          }
        });
      } else {
        list.sort(function compare(a, b) {
          if (
            Number(a[matchIDtoAPIName(sortValue)]) >
            Number(b[matchIDtoAPIName(sortValue)])
          ) {
            return sortOrder === "asc" ? 1 : -1;
          } else if (
            Number(a[matchIDtoAPIName(sortValue)]) <
            Number(b[matchIDtoAPIName(sortValue)])
          ) {
            return sortOrder === "asc" ? -1 : 1;
          } else {
            return 0;
          }
        });
      }
    }
    coins = list;
  }

  return (
    <div>
      <h2 style={{ marginTop:"0.3em", marginBottom: "1em" }}>Overview</h2>
      <S.CoinList perPage={perPage}>
        {isFetching && !data && (
          <div>
            <S.Placeholder>
              <Loader />
            </S.Placeholder>
          </div>
        )}
        {isError && (
          <ApiError error={error} onRetry={refetch} />
        )}
        {!!data && (
          <>
            <ParamsBar
              handlePerPage={handlePerPage}
              perPage={perPage}
              pageNumber={pageNumber}
              increasePageNumber={increasePageNumber}
              decreasePageNumber={decreasePageNumber}
              setPageNumber={setPageNumber}
            />
            <table>
              <CoinBar
                handleSortingState={handleSortingState}
                sortingState={sortingState}
              />
              <tbody>
                {coins.map((coin) => {
                  return (
                    <Coin
                      key={coin.id}
                      id={coin.id}
                      rank={coin.market_cap_rank}
                      image={coin.image}
                      name={coin.name}
                      symbol={coin.symbol}
                      price={coin.current_price}
                      volume={coin.total_volume}
                      change1h={coin.price_change_percentage_1h_in_currency}
                      change24h={coin.price_change_percentage_24h_in_currency}
                      change7d={coin.price_change_percentage_7d_in_currency}
                      totalVolume={coin.total_volume}
                      marketCap={coin.market_cap}
                      circulation={coin.circulating_supply}
                      totalSupply={coin.total_supply}
                      sparkline={coin.sparkline_in_7d}
                      currency={currency}
                    />
                  );
                })}
              </tbody>
            </table>
            {perPage > 10 && (
              <S.BottomPagesBar>
                <PagesBar
                  pageNumber={pageNumber}
                  increasePageNumber={increasePageNumber}
                  decreasePageNumber={decreasePageNumber}
                  setPageNumber={setPageNumber}
                  perPage={perPage}
                />
              </S.BottomPagesBar>
            )}
          </>
        )}
      </S.CoinList>
    </div>
  );
}
