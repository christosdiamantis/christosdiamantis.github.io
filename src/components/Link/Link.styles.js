import styled from "styled-components";

export const Link = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;

  button {
    padding: 0;
    height: 1.7em;
    width: 1.7em;
    margin: auto 0;
    border: none;
    background: ${({ theme }) => theme.main};
    cursor: pointer;
  }

  svg {
    width: 1em;
    height: 1em;
    margin: 0;
    color: ${({ theme }) => theme.color};
  }

  a {
    min-width: 0;
    padding-left: 0.4em;
    padding-right: 0.4em;
  }
`;

export const PopUp = styled.span`
  position: absolute;
  left: calc(100% - 3em);
  top: -1em;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.sideScroll};
  padding: 0.5em;
`;
