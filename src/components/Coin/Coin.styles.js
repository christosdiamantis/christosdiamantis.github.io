import theme from "services/theme";
import styled from "styled-components";

export const Coin = styled.tr`
  border-top: ${({ theme }) => `1px solid ${theme.border}`};
  display: table-row;
  a:link {
    text-decoration: none;
  }

  a {
    color: inherit;
  }

  img {
    width: 1.1em;
    height: 1.1em;
  }

  > * {
    //margin: auto;
  }
`;

export const Percentage = styled.td`
  color: ${({ theme, value }) => (value < 0 ? theme.negative : theme.positive)};
`;
export const CoinName = styled.div`
  display: flex;
  margin: auto;
  img {
    margin-right: 0.5em;
  }
`;

export const Abbreviation = styled.span`
  font-size: 0.8em;
  @media (max-width: 550px) {
    display: none;
  }
`;

export const Sticky = styled.td`
  
  position: -webkit-sticky;
  position: sticky;
  left: 8px;
  z-index: 10;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.border};
  //border: 1px solid ${({ theme }) => theme.border};
  @media (max-width: 1050px) {
    background-color: ${({ theme }) => theme.sideScroll};
    white-space: ${({ nameLength }) => (nameLength > 20 ? "normal" : "nowrap")};//
    background-clip: border-box;
    border-top: 1px solid ${({ theme }) => theme.border};
  }
  @media (max-width: 550px) {
    white-space: normal;
  }
`;

export const StickyName = styled(Sticky)`
  left: 47px;
`;

export const Patch = styled.div`

  display: none;
  position: absolute;
  top: 0;
  left: -8px;
  width: 8px;
  height: 100%;
  background-color: ${({ theme }) => theme.sideScroll};
  z-index: 9;
  @media (max-width: 1050px) {
    display: inline;
  }
`;
