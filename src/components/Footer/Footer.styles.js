import styled from "styled-components";

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3em 0 0 0;
  border-radius: 10px 10px 0 0;
  justify-content: center;
  position: relative;
  width: 100vw;
  left: calc(-50vw + 50%);

  align-items: center;
  background-color: ${(props) => props.theme.main};
  padding: 1em 0 0 0;

  a {
    color: inherit;
  }
`;

export const Links = styled.div`
  display: flex;
  a {
    margin: 0 0.7em;
  }
`;

export const Name = styled.span`
  font-weight: bold;
`;
