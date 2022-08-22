import styled from "styled-components";

export const NavbarContainer = styled.div`
  background: ${({ theme }) => theme.main};
  width: 100vw;
  left: calc(-50vw + 50%);
  position: relative;
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const Navbar = styled.div`
  margin: 0 1em;
  display: flex;
  justify-content: space-between;
  padding: 1em;
  background: ${({ theme }) => theme.main};
  border-radius: 0 0 10px 10px;
  margin-left: auto;
  margin-right: auto;
  width: calc(1200px - 2em);

  @media (max-width: 1250px) {
    width: calc(1100px - 2em);
  }

  @media (max-width: 1150px) {
    width: calc(1000px - 2em);
  }

  @media (max-width: 1050px) {
    width: calc(900px - 2em);
  }

  @media (max-width: 950px) {
    width: calc(100vw - 2em);
  }

  @media (max-width: 850px) {
    width: calc(100vw - 2em);
    margin: 0;
  }

  @media (max-width: 650px) {
    width: calc(100vw - 2em);
  }

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
  display: flex;
  font-size: 15px;
  margin: 0;
  padding: 0.4em 1em;
  border-radius: 10px;
  background: ${({ theme, pathname }) =>
    pathname === "/" ? theme.background : theme.main};

  &:hover {
    background: ${({ theme }) => theme.background};
  }

  svg {
    margin-right: 0.2em;
  }
`;

export const Portfolio = styled.div`
  display: flex;
  font-size: 15px;
  padding: 0.4em 1em;
  border-radius: 10px;
  background: ${({ theme, pathname }) =>
    pathname === "/portfolio" ? theme.background : theme.main};

  &:hover {
    background: ${({ theme }) => theme.background};
  }

  > * {
    margin: auto;
  }

  svg {
    margin-right: 0.2em;
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
  padding-bottom: 0.1em;
`;

export const Mobile = styled.div`
  display: none;
  @media (max-width: 650px) {
    display: inline;
    height: 16px;
  }
`;
