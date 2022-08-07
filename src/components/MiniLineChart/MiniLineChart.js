import React from "react";
import { useTheme } from "styled-components";
//eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import * as S from "./MiniLineChart.styles";

export default function MiniLineChart({ sparkline: { price } }) {
  const theme = useTheme();

  const getColor = () => {
    return price[0] > price[price.length - 1] ? theme.negative : theme.positive;
  };

  const data = {
    labels: Array.from(Array(price.length).keys()),
    datasets: [
      {
        data: price,
        fill: false,
        borderColor: getColor(),
        borderWidth: 1,
        pointRadius: 0,
        borderJoinStyle: "round",
      },
    ],
  };

  const options = {
    responsive: true,
    events: [],
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      xAxes: {
        display: false,
        gridLines: {
          display: false,
        },
      },
      yAxes: {
        gridLines: {
          display: false,
        },
        display: false,
      },
    },
  };

  return (
    <div>
      <S.MiniLineChart>
        <Line data={data} options={options} />
      </S.MiniLineChart>
    </div>
  );
}
