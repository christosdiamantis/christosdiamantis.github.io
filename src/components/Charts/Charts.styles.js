import styled from "styled-components";

export const Placeholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 30vh;
`;

export const Charts = styled.div`
  display: flex;
  width: 100%;

  > * {
    width: 50%;
    background: ${({ theme }) => theme.main};
    border-radius: 10px;
    padding: 1em;
    margin: 1em;
    overflow: hidden;
  }

  @media (max-width: 750px) {
    flex-direction: column;
    width: 100vw;

    > * {
      width: calc(100% - 4em);
    }
  }
`;
