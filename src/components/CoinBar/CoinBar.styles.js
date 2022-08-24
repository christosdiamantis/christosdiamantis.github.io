import styled from "styled-components";

export const CoinBar = styled.tr`
  th {
    text-align: left;
    padding-left: 1em;
    white-space: nowrap;
    box-shadow: 0 0 0 1px ${({ theme }) => theme.border};

    > * {
      cursor: pointer;
    }
  }
`;

export const Column = styled.td`
  display: none;
`;

export const Sticky = styled.th`
  position: -webkit-sticky;
  position: sticky;
  left: 8px;
  z-index: 10;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.border};

  @media (max-width: 1050px) {
    background-color: ${({ theme }) => theme.sideScroll};
    white-space: nowrap;
  }
`;

export const StickyName = styled(Sticky)`
  left: 47px;
`;

export const Arrow = styled.span`
  bottom: 50%;
  left: 0;
  transform: translateY(50%);
  font-size: 0.5em;
  color: ${({ theme }) => theme.color};
  vertical-align: middle;
`;

export const Patch = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: -10px;
  width: 20px;
  height: 100%;
  background-color: ${({ theme }) => theme.sideScroll};
  z-index: 9;

  @media (max-width: 1050px) {
    display: inline;
  }
`;
