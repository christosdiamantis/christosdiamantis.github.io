import styled from "styled-components";

export const Chart = styled.div`
  width: 100vw;
  left: calc(-50vw + 50%);
  position: relative;
`;

export const CustomRadio = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  justify-content: space-around;
  margin: 1em auto;
`;

export const Radio = styled.div`
  display: flex;
  margin: 0 0.5em;

  > * {
    margin: auto 0.1em;
  }
`;

export const Button = styled.button`
  cursor: pointer;
  background-clip: content-box;
  padding: 0.2em;
  width: 1.5em;
  height: 1.5em;
  border: 1px solid
    ${({ theme, checked }) => (checked ? theme.shadow : theme.border)};
  border-radius: 50px;
  background: ${({ theme, checked }) =>
    checked ? theme.converter : "inherit"};
  color: inherit;
  box-shadow: ${({ theme, checked }) =>
    checked ? "0 0 0 1px " + theme.shadow : "none"};
`;
