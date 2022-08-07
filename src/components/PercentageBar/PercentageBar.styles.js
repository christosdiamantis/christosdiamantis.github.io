import styled from "styled-components";

export const PercentageBar = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 0px;
  position: relative;
  z-index: 0;
  padding-bottom: ${({ type }) => (type === "coin" ? "1em" : "0em")};
`;

export const Bar = styled.div`
  position: relative;
`;

export const Header = styled.div`
  font-size: 0.9em;
  display: flex;
  width: ${({ theme, type }) => `${theme[type]}em`};
  justify-content: space-between;
`;

export const HeaderLeft = styled.div`
  color: ${({ theme }) => theme.percentageBase};
`;

export const HeaderRight = styled.div`
  color: ${({ theme }) => theme.percentageFill};
`;

export const Fill = styled.div`
  background: ${({ theme }) => theme.percentageFill};
  height: 0.5em;
  width: ${({ theme, type }) => `${theme[type]}em`};
  border-radius: 10px;
  border: black 1px solid;
`;

export const Base = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.percentageBase};
  height: 0.5em;
  width: ${({ theme, type, percentage }) => `${percentage * theme[type]}em`};
  border: black 1px solid;
  border-radius: 10px;
`;
