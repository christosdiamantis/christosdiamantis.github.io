import React, { useState, useRef } from "react";
import { PortfolioCoin, Loader } from "components";
import ApiError from "components/ApiError/ApiError";
import { useSelector, useDispatch } from "react-redux";
import { useLazyGetHistoryQuery, useGetPriceQuery } from "services/cryptoAPI";
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
  const [getHistory] = useLazyGetHistoryQuery();
  const coinIds = Object.keys(portfolio).sort().join(",");
  const { currentData: priceData, isFetching: priceIsFetching, error: priceError, refetch } =
    useGetPriceQuery({ coins: coinIds, currency }, { skip: !coinIds });
  const [popped, setPopped] = useState(false);
  const [amount, setAmount] = useState(1);
  const [invalidAmount, setInvalidAmount] = useState(false);
  const [invalidDate, setInvalidDate] = useState(false);
  const [invalidCoin, setInvalidCoin] = useState(false);
  const [saving, setSaving] = useState(false);
  const savingRef = useRef(false);
  const [saveError, setSaveError] = useState();

  async function handleSave() {
    if (savingRef.current) return;
    const badAmount = !Number.isFinite(Number(amount)) || Number(amount) <= 0;
    const badDate = !moment(date, "YYYY-MM-DD", true).isValid() ||
      moment(date).isAfter(moment(), "day");
    setInvalidAmount(badAmount);
    setInvalidDate(badDate);
    setInvalidCoin(!coinData);
    if (badAmount || badDate || !coinData) return;
    savingRef.current = true;
    setSaving(true);
    setSaveError(undefined);
    // Capture this submission; never pair a previous query's data with new inputs.
    const selectedCoin = coinData;
    const selectedDate = date.split("-").reverse().join("-");
    const selectedAmount = Number(amount);
    try {
      const history = await getHistory({ coin: selectedCoin.id, date: selectedDate }, true).unwrap();
      if (!Number.isFinite(history?.market_data?.current_price?.[currency])) {
        setSaveError({ status: "CUSTOM_ERROR", error: "No price is available for this coin, date, and currency. Try another date." });
        return;
      }
      dispatch(addCoin({
        id: selectedCoin.id, thumb: selectedCoin.large, name: selectedCoin.name,
        symbol: selectedCoin.symbol, transactionID: Math.random().toString(36).slice(2, 12),
        date: selectedDate, price: history.market_data.current_price, amount: selectedAmount,
      }));
      setPopped(false);
      setCoinData(undefined);
      setAmount(1);
      setDate(moment().format("YYYY-MM-DD"));
    } catch (error) {
      setSaveError(error);
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  }

  return (
    <div>
      <S.Button onClick={() => setPopped(true)} disabled={saving}>Add Asset</S.Button>
      {(saving || priceIsFetching) && <div role="status"><Loader /></div>}
      <ApiError context="Portfolio prices" error={priceError} onRetry={coinIds ? refetch : undefined} />
      {Object.keys(portfolio).map((coin) => {
        const quote = priceData?.[coin];
        return <PortfolioCoin
          key={coin}
          id={coin}
          currentPrice={quote?.[currency]}
          priceChange={quote?.[`${currency}_24h_change`]}
          volume={quote?.[`${currency}_24h_vol`]}
          marketCap={quote?.[`${currency}_market_cap`]}
          lastUpdated={quote?.last_updated_at ? getDate(quote.last_updated_at * 1000) : "N/A"}
          coin={portfolio[coin]}
        />;
      })}
      <S.PopUp popped={popped}>
        <h2>Select Coin</h2>
        <ApiError context="Purchase price" error={saveError} />
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
              <S.CoinInfoPlaceholder>
                <span>1. Search Coin</span>
                <br></br>
                <span>2. Insert amount</span>
                <br></br>
                <span>3. Choose Date</span>
              </S.CoinInfoPlaceholder>
            )}
          </S.CoinInfo>
          <S.Main>
            <S.Search type="form" pullData={setCoinData} disabled={saving} />
            <S.InvalidContainer>
              <S.Coin invalidCoin={invalidCoin}>Choose Coin</S.Coin>
            </S.InvalidContainer>
            <S.Input
              type="number"
              aria-label="Coin amount"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)} disabled={saving}
            />
            <S.InvalidContainer>
              <S.Amount invalidAmount={invalidAmount}>
                Insert value {">"} 0
              </S.Amount>
            </S.InvalidContainer>
            <S.Input aria-label="Purchase date" type="date" value={date} max={moment().format("YYYY-MM-DD")} disabled={saving} onChange={(e) => setDate(e.target.value)} />
            <S.InvalidContainer>
              <S.Date invalidDate={invalidDate}>Choose past date</S.Date>
            </S.InvalidContainer>
          </S.Main>
        </S.PopUpForm>
        <S.Buttons>
          <S.CloseButton disabled={saving} onClick={() => setPopped(false)}>Close</S.CloseButton>
          <S.Button disabled={saving} onClick={handleSave}>{saving ? "Saving..." : "Save"}</S.Button>
        </S.Buttons>
      </S.PopUp>
    </div>
  );
}
