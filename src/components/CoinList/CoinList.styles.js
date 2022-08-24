import styled from "styled-components";

export const Placeholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
`;

export const CoinList = styled.div`
  background-color: ${({ theme }) => theme.main};
  margin: 1em;
  padding: 1em;
  border-radius: 10px;

  @media (max-width: 1050px) {
    overflow-x: auto;
    padding-left: 0;
    padding-right: 0;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    overflow-x: hidden;

    thead {
      top: 0;
      z-index: 30;
      background-color: ${({ theme }) => theme.main};
      position: sticky;
    }

    tr {
      display: table-row;
    }

    td {
      text-align: left;
      padding: 0.2em 1em;
      display: table-cell;
    }
  }
`;

export const BottomPagesBar = styled.div`
  display: flex;
  border-top: ${({ theme }) => `1px solid ${theme.border}`};
  right: 0;
  left: 0;
  position: sticky;
  padding-top: 1em;
  justify-content: flex-end;
`;
