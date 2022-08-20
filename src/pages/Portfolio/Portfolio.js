import React, { useState, useEffect } from "react";
import { PortfolioCoin } from "components";
import { useSelector, useDispatch } from "react-redux";
import { useGetHistoryQuery, useGetPriceQuery } from "services/cryptoAPI";
import getDate from "utils/getDate";
import * as S from "./Portfolio.styles";
import moment from "moment";
import { addCoin } from "services/portfolio";

export default function Portfolio() {
  const dispatch = useDispatch();
  const [coinData, setCoinData] = useState();
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const portfolio = useSelector((state) => state.portfolio);
  const currency = useSelector((state) => state.currency.currency);
  const [skip, setSkip] = useState(true);
  const { data, isFetching, isError, error } = useGetHistoryQuery(
    {
      coin: coinData?.id ? coinData.id : "bitcoin",
      date: date.split("-").reverse().join("-"),
    },
    { skip }
  );
  const {
    data: priceData,
    isFetching: priceIsFetching,
    isError: priceIsError,
    error: priceError,
  } = useGetPriceQuery({
    coins: Object.keys(portfolio).toString(),
    currency: currency,
  });
  const [popped, setPopped] = useState();
  const [amount, setAmount] = useState(1);
  const [invalidAmount, setInvalidAmount] = useState();
  const [invalidDate, setInvalidDate] = useState();
  const [invalidCoin, setInvalidCoin] = useState();

  useEffect(() => {
    setPopped(false);
  }, []);

  useEffect(() => {
    if (skip === false && data) {
      dispatch(
        addCoin({
          id: coinData.id,
          thumb: coinData.large,
          name: coinData.name,
          symbol: coinData.symbol,
          transactionID: Math.random().toString(36).substr(2, 10),
          date: date.split("-").reverse().join("-"),
          price: data.market_data.current_price,
          amount: amount,
        })
      );
      setSkip(true);
      setCoinData();
      setAmount(1);
      setDate(moment().format("YYYY-MM-DD"));
    }
    // eslint-disable-next-line
  }, [data, skip]);

  const handleClick = () => {
    setPopped(true);
  };

  function handleAmount(e) {
    if (e.target.value < 0) {
      setAmount(0);
    } else {
      setAmount(e.target.value);
    }
  }

  function handleDate(e) {
    setDate(e.target.value);
  }

  function pullData(data) {
    setCoinData(data);
  }

  function handleSave() {
    if (
      amount === 0 ||
      amount === undefined ||
      moment().isBefore(date) ||
      coinData === undefined
    ) {
      if (amount === 0 || amount === undefined) {
        setInvalidAmount(true);
      } else {
        setInvalidAmount(false);
      }
      if (date === "" || moment().isBefore(date)) {
        setInvalidDate(true);
      } else {
        setInvalidDate(false);
      }
      if (coinData === undefined) {
        setInvalidCoin(true);
      } else {
        setInvalidCoin(false);
      }
    } else {
      setPopped(false);
      setInvalidAmount(false);
      setInvalidDate(false);
      setInvalidCoin(false);
      setSkip(false);
    }
  }

  return (
    <div>
      <S.Button onClick={handleClick}>Add Asset</S.Button>
      {(isError || priceError) && (
        <div>
          Error {error.status}: {error.data.error || priceIsError.data.error}
        </div>
      )}
      {priceData &&
        portfolio &&
        !isFetching &&
        !priceIsFetching &&
        Object.keys(portfolio).map((coin) => {
          return (
            <PortfolioCoin
              key={coin}
              id={coin}
              currentPrice={priceData[coin][currency]}
              priceChange={priceData[coin][currency.concat("_24h_change")]}
              volume={priceData[coin][currency.concat("_24h_vol")]}
              marketCap={priceData[coin][currency.concat("_market_cap")]}
              lastUpdated={getDate(priceData[coin].last_updated_at * 1000)}
              coin={portfolio[coin]}
            />
          );
        })}
      <S.PopUp popped={popped}>
        <h2>Select Coin</h2>
        <S.PopUpForm popped={popped}>
          <S.CoinInfo>
            {coinData ? (
              <>
                <S.Image src={coinData.large} alt={coinData.id} />
                <div>
                  {coinData.name}({coinData.symbol})
                </div>{" "}
              </>
            ) : (
              <S.CoinInfoPlaceholder>Choose </S.CoinInfoPlaceholder>
            )}
          </S.CoinInfo>
          <S.Main>
            <S.Search type="form" pullData={pullData} />
            <S.InvalidContainer>
              <S.Coin invalidCoin={invalidCoin}>Choose Coin</S.Coin>
            </S.InvalidContainer>
            <S.Input
              type="number"
              min="0"
              value={amount}
              onChange={(e) => handleAmount(e)}
            />
            <S.InvalidContainer>
              <S.Amount invalidAmount={invalidAmount}>
                Insert value {">"} 0
              </S.Amount>
            </S.InvalidContainer>
            <S.Input type="date" value={date} onChange={(e) => handleDate(e)} />
            <S.InvalidContainer>
              <S.Date invalidDate={invalidDate}>Choose past date</S.Date>
            </S.InvalidContainer>
          </S.Main>
        </S.PopUpForm>
        <S.Buttons>
          <S.CloseButton onClick={() => setPopped(false)}>Close</S.CloseButton>
          <S.Button onClick={handleSave}>Save</S.Button>
        </S.Buttons>
      </S.PopUp>
    </div>
  );
}
