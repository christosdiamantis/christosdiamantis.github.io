import styled from "styled-components";

export const CoinDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-basis: 0;
  flex-grow: 0;
  margin-top: 1em;

  h2 {
    margin-right: auto;
    margin-left: calc(12.5% + 1em);
  }

  a {
    color: inherit;
  }

  @media (max-width: 950px) {
    h2 {
      margin-right: auto;
      margin-left: 1em;
    }
  }

  @media (max-width: 750px) {
    font-size: larger;
    width: 100vw;
    h2 {
      margin-right: auto;
      margin-left: auto;
    }
  }
  h2 {
    margin-right: auto;
    margin-left: auto;
  }
`;

export const Details = styled.div`
  width: 85%;
  display: flex;
  justify-content: center;
  padding: 1em;
  padding-top: 0;
  padding-bottom: 0;
  //white-space: nowrap;/////////

  @media (max-width: 950px) {
    width: 100vw;
    padding: 0;
  }

  @media (max-width: 750px) {
    width: auto;
    flex-direction: column;
  }

  > * {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${({ theme }) => theme.main};
    margin: 1em;
    padding: 1em;
    border-radius: 10px;
  }

  img {
    width: auto;
    max-height: 10em;
    height: auto;
    background: ${({ theme }) => theme.background};
    padding: 1em;
    margin: 0.5em;
    border-radius: 10px;

    @media (max-width: 750px) {
      height: 15em;
    }
  }
`;

export const Name = styled.div`
  margin: 0.5em 0;
`;

export const Description = styled.div`
  width: 85%;
  border-radius: 10px;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;

  > * {
    margin: 1em;
    padding: 1em;
    background: ${({ theme }) => theme.main};
    border-radius: 10px;
  }

  div {
    div {
      margin-top: 1em;
    }
  }

  @media (max-width: 950px) {
    width: 100vw;
  }
`;

export const Links = styled.div`
  width: 85%;
  display: flex;

  @media (max-width: 950px) {
    width: 100vw;
  }

  @media (max-width: 750px) {
    flex-direction: column;
  }

  > * {
    width: calc(30% - 2em);
    margin: 1em;
    background: ${({ theme }) => theme.main};
    border-radius: 10px;
    padding: 1em;
    text-align: center;

    @media (max-width: 750px) {
      width: auto;
    }
  }
`;

export const Price = styled.div`
  font-size: xx-large;
  display: flex;
`;
export const AllTime = styled.div`
  display: flex;
  margin-top: 1em;
  text-align: left;
  margin-right: auto;
  margin-left: 0;
  > * {
    align-items: flex-start;
  }
`;

export const Arrow = styled.div`
  color: ${({ theme, sign }) =>
    sign === "positive" ? theme.positive : theme.negative};
  margin: auto;
  margin-right: 1em;
  transform: scaleY(0.6);
`;

export const Bold = styled.span`
  font-weight: bold;
  margin-right: 0.2em;
`;

export const LineElement = styled.div`
  display: flex;
  text-align: left;
  margin-right: auto;
  margin-left: 0;
`;

export const Circle = styled.span`
  width: 0.5em;
  height: 0.5em;
  background: ${({ theme }) => theme.bullet};
  color: ${({ theme }) => theme.bullet};
  border-radius: 5px;
  margin: auto 0.5em;
`;

export const Percentage = styled.span`
  margin-left: 0.3em;
  display: flex;
  font-size: small;
  color: ${({ theme, sign }) =>
    sign === "positive" ? theme.positive : theme.negative};
  > * {
    margin: auto;
  }
`;
export const DailyChange = styled.span`
  margin: 0.5em 0 1em 0;
`;

export const Change = styled.span`
  color: ${({ theme, sign }) =>
    sign === "positive" ? theme.positive : theme.negative};
  margin-left: 0.3em;
`;

export const StyledBar = styled.div`
  margin-left: 1.8em;
  margin-top: 2.8em;
`;
