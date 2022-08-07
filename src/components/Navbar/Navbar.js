import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrency } from "services/currency";
import { setTheme } from "services/theme";
import { SearchBar } from "components";
import * as S from "./Navbar.styles";

export default function Navbar() {
  const { pathname } = useLocation();
  const currency = useSelector((state) => state.currency.currency);
  const theme = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();

  return (
    <div>
      <S.Navbar>
        <div>
          <Link to="/">
            <S.Coins pathname={pathname} linkname={"/"}>
              Coins
            </S.Coins>
          </Link>
          <Link to="/portfolio">
            <S.Portfolio pathname={pathname} linkname={"/portfolio"}>
              Portfolio
            </S.Portfolio>
          </Link>
        </div>
        <S.RightSide>
          <SearchBar />
          <select
            value={currency.toUpperCase()}
            onChange={(e) =>
              dispatch(setCurrency(e.target.value.toLowerCase()))
            }
          >
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
          </select>
          <button onClick={() => dispatch(setTheme())}>
            {theme === "dark" ? "☀" : "☽"}
          </button>
        </S.RightSide>
      </S.Navbar>
    </div>
  );
}
