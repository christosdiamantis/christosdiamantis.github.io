import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import ApiError from "./ApiError";

test("prevents retry until the server cooldown has elapsed", () => {
  jest.useFakeTimers();
  const retry = jest.fn();
  render(<ApiError error={{ status: 429, retryAt: Date.now() + 2000 }} onRetry={retry} />);
  const button = screen.getByRole("button", { name: "Retry" });
  expect(button.disabled).toBe(true);
  fireEvent.click(button);
  expect(retry).not.toHaveBeenCalled();
  act(() => { jest.advanceTimersByTime(2000); });
  expect(button.disabled).toBe(false);
  fireEvent.click(button);
  expect(retry).toHaveBeenCalledTimes(1);
  jest.useRealTimers();
});
