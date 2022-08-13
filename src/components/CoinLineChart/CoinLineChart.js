import React, { createRef, useEffect, useState } from "react";
import { useTheme } from "styled-components";
import getDay from "utils/getDay";
import getDate from "utils/getDate";
import getChartOptions from "utils/getChartOptions";
//eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

export default function CoinLineChart(props) {
  const chartRef = createRef();
  const [chartData, setChartData] = useState({ datasets: [] });
  const [reference, setReference] = useState(null);
  const selectedTheme = useTheme();

  useEffect(() => {
    const chart = chartRef.current;
    if (!!chart | !!reference) {
      var tempChartData = null;
      if (!!chart) {
        setReference(chart);
        tempChartData = data(chart);
      }
      if (!!reference) {
        tempChartData = data(reference);
      }
      setChartData(tempChartData);
    }
    //eslint-disable-next-line
  }, [selectedTheme, props.data]);

  const createGradient = (ctx, area) => {
    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
    gradient.addColorStop(0, selectedTheme.main);
    gradient.addColorStop(1, selectedTheme.line);
    return gradient;
  };

  const data = (chart) => {
    return {
      labels: props.data.map((element) => getDate(element[0])),
      datasets: [
        {
          label: "Price",
          fill: true,
          lineTension: 0.1,
          backgroundColor: createGradient(chart.ctx, chart.chartArea),
          borderColor: selectedTheme.line,
          borderWidth: 1,
          pointRadius: 0,
          pointHitRadius: 20,
          data: props.data.map((element) => element[1]),
        },
      ],
    };
  };

  var options = getChartOptions();

  return (
    <div className="chart" style={{ height: 350 }}>
      <Line
        ref={chartRef}
        data={chartData}
        options={{
          ...options,
          layout: { padding: { top: 0 } },
          maintainAspectRatio: false,
          scales: {
            ...options.scales,
            xAxes: { ...options.scales.xAxes, display: false },
          },
        }}
      />
    </div>
  );
}
