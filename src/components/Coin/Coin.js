import React from "react";
import { Link } from "react-router-dom";
import millify from "millify";
import getSymbol from "utils/getSymbol";
import { MiniLineChart, PercentageBar } from "components";
import * as S from "./Coin.styles";

export default function Coin(props) {
  const timeFrames = ["1h", "24h", "7d"];

  return (
    <S.Coin>
      <S.Sticky>
        <S.Patch></S.Patch>
        {props.rank ? props.rank : "N/A"}
      </S.Sticky>
      <S.StickyName nameLength={props.name.length}>
        <Link to={`/${props.name}`}>
          <S.CoinName>
            <img src={props?.image} alt={props?.name} />{" "}
            <div>
              {props?.name}
              <S.Abbreviation> ({props?.symbol?.toUpperCase()})</S.Abbreviation>
            </div>
          </S.CoinName>
        </Link>
      </S.StickyName>
      <td>
        {getSymbol(props.currency)}
        {props?.price && millify(props?.price)}
      </td>
      {timeFrames.map((timeFrame) => {
        var time = "change" + timeFrame;
        if (props[time]) {
          return (
            <S.Percentage key={timeFrame} value={props[time]}>
              {props[time].toFixed(2)}
            </S.Percentage>
          );
        }
        return <td key={timeFrame}>N/A</td>;
      })}
      <td>
        <PercentageBar
          type="coin"
          first={props?.totalVolume}
          second={props?.marketCap}
          currency={props.currency}
        />
      </td>
      <td>
        <PercentageBar
          type="coin"
          first={props?.circulation}
          second={props?.totalSupply}
        />
      </td>
      <td>
        <MiniLineChart sparkline={props?.sparkline} />
      </td>
    </S.Coin>
  );
}
