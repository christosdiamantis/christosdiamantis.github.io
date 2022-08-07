import styled from "styled-components";

export const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em 0 2em 0;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  left: 0;
  position: sticky;

  > * {
    margin-top: auto;
  }

  @media (max-width: 1050px) {
    padding: 1em 1em 2em 1em;
  }

  @media (max-width: 750px) {
    padding: 0 0 1em 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const LeftSide = styled.div`
  display: flex;
  
  > * {
    margin-top: auto;
  }

  @media (max-width: 750px) {
    padding: 1em;
  }
`;

export const RightSide = styled.div`
  display: flex;

  @media (max-width: 750px) {
    padding: 1em 0;
  }
`;

export const Select = styled.select`
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.main};
  border-width: 0;
  border-radius: 5px;
  padding: 0 0.2em;
  font-size: 1em;

  :focus {
    outline: none;
  }

  option {
    color: ${({ theme }) => theme.color};
    background-color: ${({ theme }) => theme.main};
  }
`;

export const Bold = styled.div`
  font-weight: bold;
  font-size: 1.5em;
  margin-right: 1rem;
`;

export const Show = styled.div`
  background: ${({ theme }) => theme.background};
  border-radius: 10px;
  padding: 0.2em 0.5em;

  > * {
    color: ${({ theme }) => theme.color};
    background: ${({ theme }) => theme.background};
    border-width: 0;
    border-radius: 5px;

    select {
      color: ${({ theme }) => theme.color};
      background: ${({ theme }) => theme.background};
      outline: none;
    }

    a:link {
      text-decoration: none;
    }

    a {
      color: inherit;
    }
  }
`;
