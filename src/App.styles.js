import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  margin: 0;
  padding: 0;
`;

export const App = styled.div`
  max-width: 100%;
  width: 1200px;
  font-size: 1rem;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  overflow-x: visible;

  > * {
    width: 100%;
  }

  @media (max-width: 1250px) {
    width: 1100px;
  }

  @media (max-width: 1150px) {
    width: 1000px;
    font-size: smaller;
  }

  @media (max-width: 1050px) {
    width: 900px;
  }

  @media (max-width: 950px) {
    width: 100vw;
  }

  @media (max-width: 850px) {
    width: 100vw;
  }
`;
