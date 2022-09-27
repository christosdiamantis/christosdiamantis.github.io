import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  background: ${({ theme }) => theme.main};
  color: ${({ theme }) => theme.color};
  border-radius: 10px;
  width: calc(100% - 2em);
  margin: 3em auto;

  a:link {
    text-decoration: none;
  }

  a {
    color: inherit;
  }

  span {
    margin: 0 auto 0 0;
  }

  @media (max-width: 550px) {
    flex-direction: column;
    align-items: center;
    width: 280px;
    font-size: larger;
    span {
      margin: 0;
    }
  }
`;

export const CoinContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
  width: 85%;
  margin: 1em auto;

  button {
    width: 1.5em;
    height: 1.4em;
    padding: 0px;
    cursor: pointer;
    border-radius: 5px;
    border: 0;
    background: ${({ theme }) => theme.background};
    display: flex;
    align-items: center;
    justify-content: center;

    > * {
      transform: scale(0.7, 0.7);
    }
  }

  > * {
    margin: 1em;
  }
`;

export const Bold = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.color};
  margin-right: 0.4em;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.background};
  padding: 1em;
  border-radius: 10px;
  padding: 1em;
  margin: 1em;
  width: 6em;
  height: 7em;

  img {
    width: 6em;
    height: 6em;
    margin-bottom: 0.5em;
  }
`;

export const Line = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background: ${({ theme }) => theme.background};
  padding: 0.5em;
  margin: 0.5em 0;
  border-radius: 10px;
  color: ${({ theme }) => theme.portfolio};

  :nth-of-type(1) {
    margin-bottom: 1.1em;
  }

  > * {
    margin-right: 1em;
  }

  button {
    margin-right: 0;
    padding-bottom: 0.2em;
  }

  span {
    margin-right: 0.5em;
  }

  @media (max-width: 550px) {
    flex-direction: column;
    align-items: center;

    > * {
      margin-bottom: 0.4em;
    }

    button {
      margin-bottom: 0;
    }
  }
`;

export const Sign = styled.span`
  color: ${({ theme, sign }) => theme[sign]};
`;
