import styled from "styled-components";
import { SearchBar } from "components";

export const Button = styled.button`
  cursor: pointer;
  margin-top: 2em;
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.converter};
  font-size: larger;
  padding: 0.5em 5em;
  border: none;
  border-radius: 10px;
`;

export const PopUp = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2;
  background: ${({ theme }) => theme.main};
  padding: 1em;
  border-radius: 10px;
  position: absolute;
  top: calc(50%);
  left: 50%;
  display: ${({ popped }) => (popped ? "flex" : "none")};
  transform: translate(-50%, -50%);

  ::before {
    content: "";
    width: 100vw;
    z-index: -1;
    left: calc(-50vw + 50%);
    position: absolute;
    height: 100vh;
    top: calc(-50vh + 50%);
    backdrop-filter: blur(5px);
  }
`;

export const PopUpForm = styled.div`
  display: flex;
  width: 15em;

  @media (max-width: 750px) {
    flex-direction: column;
  }

  > * {
    padding: 1em;
  }

  input {
    width: 12em;
    height: 2em;
    padding: 0.2em;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    border: none;
    border-radius: 10px;
    ::-webkit-calendar-picker-indicator {
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 24 24"><path fill="%23bbbbbb" d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/></svg>');
    }

    :focus {
      outline: none;
    }
  }

  > * {
    width: 14em;
    height: 11em;
  }
`;

export const CoinInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    @media (max-width: 750px) {
      margin-right: 1em;
    }
  }
`;

export const CoinInfoPlaceholder = styled.div`
  width: 11em;
  padding: 1em;
  border-radius: 10px;
  background: ${({ theme }) => theme.background};
  min-height: 8em;
  display: flex;
  flex-direction: column;

  > * {
    margin-bottom: 0.5em;
    margin-left: 2em;
    margin-right: auto;
  }
`;

export const Input = styled.input`
  height: 2em;
`;

export const Invalid = styled.div`
  color: ${({ theme }) => theme.negative};
  font-size: smaller;
  height: 1em;
`;

export const InvalidContainer = styled.div`
  height: 1em;
`;

export const Coin = styled(Invalid)`
  display: ${({ invalidCoin }) => (invalidCoin ? "flex" : "none")};
`;

export const Amount = styled(Invalid)`
  display: ${({ invalidAmount }) => (invalidAmount ? "flex" : "none")};
`;

export const Date = styled(Invalid)`
  display: ${({ invalidDate }) => (invalidDate ? "flex" : "none")};
`;

export const Image = styled.img`
  width: 7em;
  height: 7em;
  background: ${({ theme }) => theme.background};
  border-radius: 10px;
  padding: 1em;
  margin: 0 2em;

  @media (max-width: 750px) {
    margin-left: 1em;
  }
`;

export const CloseButton = styled(Button)`
  background: ${({ theme }) => theme.background};
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    width: 11.5em;
    padding: 0.5em 0;
    margin: 0.5em;
  }

  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Search = styled(SearchBar)`
  padding: 0;

  input {
    padding: 0;
  }
`;
