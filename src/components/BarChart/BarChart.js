import React from "react";
import millify from "millify";
import { useTheme } from "styled-components";
import getDay from "utils/getDay";
import getDate from "utils/getDate";
import { Bar } from "react-chartjs-2";
import getSymbol from "utils/getSymbol";
import getChartOptions from "utils/getChartOptions";
//eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import * as S from "../LineChart/LineChart.styles";

export default function BarChart(props) {
  const selectedTheme = useTheme();
  const data = {
    labels: props.data.map((element) => getDay(element[0])),
    datasets: [
      {
        label: "Volume",
        data: props.data.map((element) => element[1]),
        backgroundColor: selectedTheme.bar,
      },
    ],
  };
  const options = getChartOptions();

  return (
    <div>
      <S.Text>
        <div>Volume 24h</div>
        <S.Value>
          {getSymbol(props.currency)}
          {millify(
            Number(props.data[props.data.length - 1][1].toFixed(0))
          )}
        </S.Value>
        <S.DateText>{getDate(props.data[props.data.length - 1][0])}</S.DateText>
      </S.Text>
      <Bar data={data} options={options} />
    </div>
  );
}
