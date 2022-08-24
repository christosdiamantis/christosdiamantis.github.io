import styled from "styled-components";

export const SearchContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.main};
  padding: 0;
  z-index: 1;
`;

export const SearchBar = styled.div`
  display: flex;
  input {
    color: ${({ theme }) => theme.color};
    border-width: 0;
    border-radius: 10px;
    background: ${({ theme }) => theme.background};
    padding: ${({ type }) => type==="navbar" ? "0.5em 1em" : "0" } ;
    margin: 0;
  }

  input:focus {
    outline: none;
  }
`;

export const Loading = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export const SearchResults = styled.div`
  position: absolute;
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.background};
  width: 100%;
  text-align: left;
  padding-bottom: 0.5em;
  border-top: 1px solid ${({ theme }) => theme.border};
  border-radius: 0px 0px 5px 5px;

  img {
    width: 1.1em;
    height: 1.1em;
    padding-left: 0.3em;
    padding-right: 0.3em;
  }

  > * {
    display: flex;
    margin: auto;
    padding: 0.1em;
    margin-top: 0.5em;

    > * {
      display: flex;
      margin-top: auto;
      margin-bottom: auto;
    }
  }
`;
export const NoMatches = styled(SearchResults)`
  padding-top: 0.5em;
  text-align: center;
`;

export const SearchDiv = styled.div`
  cursor: pointer;
  `;
