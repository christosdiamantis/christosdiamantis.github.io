import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import Portfolio from "./Portfolio";
import { useSelector, useDispatch } from "react-redux";
import { useLazyGetHistoryQuery, useGetPriceQuery } from "services/cryptoAPI";

jest.mock("react-redux", () => ({ useSelector: jest.fn(), useDispatch: jest.fn() }));
jest.mock("services/cryptoAPI", () => ({ useLazyGetHistoryQuery: jest.fn(), useGetPriceQuery: jest.fn() }));
jest.mock("components", () => ({
  Loader: () => <span>Loading</span>,
  PortfolioCoin: ({ id }) => <span>Holding: {id}</span>,
  SearchBar: ({ pullData }) => <button onClick={() => pullData({ id: "bitcoin", name: "Bitcoin", symbol: "BTC" })}>Select Bitcoin</button>,
}));
const dispatch = jest.fn();
const history = jest.fn();
beforeEach(() => {
  jest.clearAllMocks();
  useSelector.mockImplementation((select) => select({ portfolio: {}, currency: { currency: "usd" } }));
  useDispatch.mockReturnValue(dispatch);
  useGetPriceQuery.mockReturnValue({});
  useLazyGetHistoryQuery.mockReturnValue([history]);
});
function openForm() {
  render(<Portfolio />);
  fireEvent.click(screen.getByRole("button", { name: "Add Asset" }));
  fireEvent.click(screen.getByRole("button", { name: "Select Bitcoin" }));
}

test("skips quotes for an empty portfolio and rejects zero amounts and empty dates", () => {
  openForm();
  expect(useGetPriceQuery).toHaveBeenLastCalledWith({ coins: "", currency: "usd" }, { skip: true });
  fireEvent.change(screen.getByLabelText("Coin amount"), { target: { value: "0" } });
  fireEvent.click(screen.getByRole("button", { name: "Save" }));
  expect(history).not.toHaveBeenCalled();
  fireEvent.change(screen.getByLabelText("Coin amount"), { target: { value: "2" } });
  fireEvent.change(screen.getByLabelText("Purchase date"), { target: { value: "" } });
  fireEvent.click(screen.getByRole("button", { name: "Save" }));
  expect(history).not.toHaveBeenCalled();
});

test("saves once only after the matching history response resolves", async () => {
  let resolve;
  history.mockReturnValue({ unwrap: () => new Promise((done) => { resolve = done; }) });
  openForm();
  fireEvent.change(screen.getByLabelText("Coin amount"), { target: { value: "2" } });
  fireEvent.change(screen.getByLabelText("Purchase date"), { target: { value: "2026-01-02" } });
  fireEvent.click(screen.getByRole("button", { name: "Save" }));
  expect(dispatch).not.toHaveBeenCalled();
  expect(screen.getByRole("button", { name: "Saving..." }).disabled).toBe(true);
  expect(history).toHaveBeenCalledWith({ coin: "bitcoin", date: "02-01-2026" }, true);
  await act(async () => { resolve({ market_data: { current_price: { usd: 50 } } }); });
  expect(dispatch).toHaveBeenCalledTimes(1);
  expect(dispatch.mock.calls[0][0].payload).toMatchObject({ id: "bitcoin", amount: 2, date: "02-01-2026", price: { usd: 50 } });
});

test("failed saves retain inputs and can be retried", async () => {
  history.mockReturnValueOnce({ unwrap: () => Promise.reject({ status: 429, retryAt: Date.now() + 60000 }) })
    .mockReturnValueOnce({ unwrap: () => Promise.resolve({ market_data: { current_price: { usd: 60 } } }) });
  openForm();
  fireEvent.click(screen.getByRole("button", { name: "Save" }));
  await waitFor(() => expect(screen.getByRole("alert").textContent).toContain("rate limit"));
  expect(dispatch).not.toHaveBeenCalled();
  expect(screen.getByLabelText("Coin amount").value).toBe("1");
  fireEvent.click(screen.getByRole("button", { name: "Save" }));
  await waitFor(() => expect(dispatch).toHaveBeenCalledTimes(1));
});

test("keeps saved holdings visible if the price API fails", () => {
  useSelector.mockImplementation((select) => select({ portfolio: { bitcoin: {} }, currency: { currency: "usd" } }));
  useGetPriceQuery.mockReturnValue({ error: { status: "FETCH_ERROR" } });
  render(<Portfolio />);
  expect(screen.getByText("Holding: bitcoin")).toBeTruthy();
  expect(screen.getByRole("alert").textContent).toContain("CoinGecko is currently unreachable");
});
