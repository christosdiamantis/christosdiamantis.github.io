import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import * as themes from "./theme";
import { GlobalStyle } from "./globalStyles";
import { useSelector } from "react-redux";
import { GlobalStats, Navbar } from "components";
import { Coins, CoinDetails, Portfolio } from "pages";
import * as S from "./App.styles";

export default function App() {
  const theme = useSelector((state) => state.theme.value);

  return (
    <ThemeProvider theme={themes[theme]}>
      <S.AppContainer>
        <div className="App">
          <S.App>
            <Navbar />
            <GlobalStats />
            <Routes>
              <Route path="/" element={<Coins />} />
              <Route path="/:coin" element={<CoinDetails />} />
              <Route path="/portfolio" element={<Portfolio />} />
            </Routes>
          </S.App>
        </div>
      </S.AppContainer>
      <GlobalStyle />
    </ThemeProvider>
  );
}
