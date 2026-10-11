import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import SearchBar from "./SearchBar";
import { useGetSearchQuery } from "services/searchAPI";

jest.mock("services/searchAPI", () => ({ useGetSearchQuery: jest.fn() }));
jest.mock("components", () => ({ Loader: () => <span>Loading</span> }));

beforeEach(() => { jest.useFakeTimers(); useGetSearchQuery.mockReturnValue({}); });
afterEach(() => { jest.useRealTimers(); jest.clearAllMocks(); });

test("skips empty input, debounces typing, and clears stale results", () => {
  render(<SearchBar type="form" pullData={jest.fn()} />);
  expect(useGetSearchQuery).toHaveBeenLastCalledWith("", { skip: true });
  const input = screen.getByPlaceholderText("Search...", { exact: false });
  fireEvent.focus(input);
  fireEvent.change(input, { target: { value: "bit" } });
  act(() => { jest.advanceTimersByTime(200); });
  fireEvent.change(input, { target: { value: "bitcoin" } });
  act(() => { jest.advanceTimersByTime(349); });
  expect(useGetSearchQuery).toHaveBeenLastCalledWith("", { skip: true });
  act(() => { jest.advanceTimersByTime(1); });
  expect(useGetSearchQuery).toHaveBeenLastCalledWith("bitcoin", { skip: false });
  useGetSearchQuery.mockReturnValue({ currentData: { coins: [{ id: "bitcoin", name: "Bitcoin", symbol: "BTC" }] } });
  fireEvent.change(input, { target: { value: "eth" } });
  expect(screen.queryByText("Bitcoin(BTC)")).toBeNull();
  fireEvent.change(input, { target: { value: "  " } });
  act(() => { jest.advanceTimersByTime(350); });
  expect(useGetSearchQuery).toHaveBeenLastCalledWith("", { skip: true });
});
