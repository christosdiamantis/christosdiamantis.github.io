import styled from "styled-components";

export const Navbar = styled.div`
  margin: 0 1em;
  display: flex;
  justify-content: space-between;
  padding: 1em;
  background: ${({ theme }) => theme.main};
  border-radius: 0 0 5px 5px;

  @media (max-width: 650px) {
    margin: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
  border-radius: 5px;
  background: ${({ theme, pathname }) =>
    pathname === "/" ? theme.background : theme.main};
`;

export const Portfolio = styled.div`
  font-size: 15px;
  padding: 0.4em 1em;
  border-radius: 5px;
  background: ${({ theme, pathname }) =>
    pathname === "/portfolio" ? theme.background : theme.main};
`;

export const RightSide = styled.div`
  display: flex;
  > * {
    color: ${({ theme }) => theme.color};
    background: ${({ theme }) => theme.background};
    border-width: 0;
    border-radius: 5px;
    margin-left: 1em;
    padding: 0 0.7em;

    @media (max-width: 650px) {
      margin: 1em 1em 1em 0;
    }
  }
`;

export const Sun = styled.div`
  color: ${({ theme }) => theme.color};
`;
