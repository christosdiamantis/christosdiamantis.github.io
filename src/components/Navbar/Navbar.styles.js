import styled from "styled-components";

export const Navbar = styled.div`
  margin: 0 1em;
  //margin: 0;
  display: flex;
  justify-content: space-between;
  padding: 1em;
  //padding: 1em 0;
  background: ${({ theme }) => theme.main};
  border-radius: 0 0 10px 10px;
  //width: 100vw;
  //left: calc(-50vw + 50%);
  //position: relative;

  //margin: 0 -9999rem;
  /* add back negative margin value */
  //padding: 1em 9999rem;
  //position: sticky;

  button,
  select {
    cursor: pointer;
  }

  @media (max-width: 650px) {
    margin: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.5em;
    padding-top: 1em;
  }

  select:focus {
    outline: none;
  }

  a:link {
    text-decoration: none;
  }

  a {
    color: inherit;
  }

  > * {
    display: flex;
    color: ${({ theme }) => theme.color};
    border-width: 0;
    border-radius: 5px;
  }
`;

export const Coins = styled.div`
  font-size: 15px;
  margin: 0;
  padding: 0.4em 1em;
  border-radius: 10px;
  background: ${({ theme, pathname }) =>
    pathname === "/" ? theme.background : theme.main};

  &:hover {
    background: ${({ theme }) => theme.background};
  }
`;

export const Portfolio = styled.div`
  font-size: 15px;
  padding: 0.4em 1em;
  border-radius: 10px;
  background: ${({ theme, pathname }) =>
    pathname === "/portfolio" ? theme.background : theme.main};

  &:hover {
    background: ${({ theme }) => theme.background};
  }
`;

export const RightSide = styled.div`
  display: flex;
  > * {
    color: ${({ theme }) => theme.color};
    background: ${({ theme }) => theme.background};
    border-width: 0;
    border-radius: 10px;
    margin-left: 1em;
    padding: 0 0.7em;

    @media (max-width: 650px) {
      margin: 1em 1em 0.5em 0;
    }
  }
`;

export const Icon = styled.div`
  //color: ${({ theme }) => theme.color};
  padding-bottom: 0.1em;
`;
