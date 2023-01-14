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
      <S.NavbarContainer>
        <S.Navbar>
          <div>
            <Link to="/">
              <S.Coins pathname={pathname} linkname={"/"}>
                <S.Mobile>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 9c5.345 0 10-2.015 10-4.5s-4.655-4.5-10-4.5c-5.344 0-10 2.015-10 4.5s4.656 4.5 10 4.5zm.187-4.019c-.598-.18-2.428-.332-2.428-1.35 0-.568.668-1.074 1.917-1.187v-.444h.642v.422c.468.011.989.062 1.569.18l-.234.685c-.441-.101-.933-.199-1.416-.199l-.145.002c-.962.04-1.041.574-.373.799 1.092.337 2.532.585 2.532 1.479 0 .714-.867 1.097-1.934 1.192v.44h-.642v-.416c-.659-.006-1.353-.113-1.925-.304l.295-.686c.488.125 1.102.253 1.655.253.145 0 .284-.009.417-.028.737-.106.884-.602.07-.838zm-.187 16.019c3.783 0 7.708-.969 10-2.803v1.303c0 2.485-4.655 4.5-10 4.5-5.344 0-10-2.015-10-4.5v-1.304c2.292 1.835 6.217 2.804 10 2.804zm0-10c3.783 0 7.708-.969 10-2.803v1.303c0 2.485-4.655 4.5-10 4.5-5.344 0-10-2.015-10-4.5v-1.303c2.292 1.834 6.217 2.803 10 2.803zm0 5c3.783 0 7.708-.969 10-2.803v1.303c0 2.485-4.655 4.5-10 4.5-5.344 0-10-2.015-10-4.5v-1.304c2.292 1.835 6.217 2.804 10 2.804z" />
                  </svg>
                </S.Mobile>
                <span>Coins</span>
              </S.Coins>
            </Link>
            <Link to="/portfolio">
              <S.Portfolio pathname={pathname} linkname={"/portfolio"}>
                <S.Mobile>
                  <svg
                    width="15"
                    height="15"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </S.Mobile>
                <span>Portfolio</span>
              </S.Portfolio>
            </Link>
          </div>
          <S.RightSide>
            <SearchBar type="navbar" />
            <div>
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
            </div>
            <button onClick={() => dispatch(setTheme())}>
              <S.Icon>
                {theme === "dark"
                  ? "🌚"
                  : theme === "light"
                  ? "🌞"
                  : theme === "forest"
                  ? "🌲"
                  : "🌘"}
              </S.Icon>
            </button>
          </S.RightSide>
        </S.Navbar>
      </S.NavbarContainer>
    </div>
  );
}
