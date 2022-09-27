import styled from "styled-components";

export const PagesBar = styled.div`
  display: flex;
  justify-content: space-between;

  > * {
    background: none;
    color: inherit;
    border: none;
    margin: 0 0.2em 0 0.2em;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }

  @media (max-width: 750px) {
  }
`;

export const CurrentPage = styled.button`
  color: ${({ theme }) => theme.pageNumber};
  font-weight: bold;
  font-size: 1.4em;
`;
