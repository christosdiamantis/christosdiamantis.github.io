import styled from "styled-components";

export const Converter = styled.div`
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  margin: auto;
  margin-bottom: 1em;

  button {
    background: ${({ theme }) => theme.background};
    border: none;
    > * {
      padding-top: 0.3em;
    }
  }

  svg {
    color: ${({ theme }) => theme.color};
  }

  > * {
    margin: 0;
  }

  input {
    background: ${({ theme }) => theme.border};
    color: ${({ theme }) => theme.color};
    border: none;
    border-radius: 10px;
    margin: 1em;
    padding: 0.3em;
    width: 8em;
    height: 18px;
  }

  input:focus {
    outline: none;
  }
`;

export const Currency = styled.div`
  display: flex;

  div {
    background-color: ${({ theme }) => theme.converter};
    height: 18px;
    width: 3em;
    margin: auto;
    padding: 0.3em;

    @media (max-width: 750px) {
      width: auto;
    }
    //padding-top: 0.5em;
    border-radius: 5px 0 0 5px;
    > * {
      vertical-align: middle;
    }
  }

  input {
    border-radius: 0 5px 5px 0;
    margin-left: 0;
  }
`;

export const Coin = styled.div`
  display: flex;

  div {
    background-color: ${({ theme }) => theme.converter};
    height: 18px;
    width: 3em;
    margin: auto;
    padding: 0.3em;

    @media (max-width: 750px) {
      width: auto;
    }
    //padding-top: 0.5em;
    border-radius: 0 5px 5px 0;
    > * {
      vertical-align: middle;
    }
  }

  input {
    border-radius: 5px 0 0 5px;
    margin-right: 0;
  }
`;
