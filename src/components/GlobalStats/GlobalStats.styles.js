import styled from "styled-components";

export const GlobalStats = styled.table`
  background: ${({ theme }) => theme.main};
  font-size: 0.9em;
  padding: 0.5em 1em;
  border-radius: 0 0 10px 10px;
  display: flex;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;

  > * {
    margin: auto 1em;
  }

  th {
    white-space: nowrap;
    padding: 0 1em;
  }

  img {
    width: 1em;
    height: 1em;
  }

  @media (max-width: 750px) {
    margin-top: 0.5em;
    border-radius: 10px;
  }

  @media (max-width: 650px) {
    overflow-x: scroll;
    width: 100vw;
  }

  @media (max-width: 450px) {
    overflow-x: scroll;
  }
`;

export const GlobalStatsItem = styled.div`
  display: flex;

  > * {
    margin: auto;
  }
`;
