export const chartOptions = {
  layout: {
    padding: { top: 60 },
  },
  responsive: true,
  responsiveAnimationDuration: 1000,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    yAxes: {
      display: false,
      gridLines: {
        display: false,
      },
      ticks: {
        beginAtZero: true,
        rotation: 0,
      },
    },
    xAxes: {
      grid: {
        display: false,
      },
      ticks: {
        maxRotation: 0,
        minRotation: 0,
      },
    },
  },
  legend: {
    display: false,
  },
};

export default function getChartOptions () {
  return {
    layout: {
      padding: { top: 60 },
    },
    responsive: true,
    responsiveAnimationDuration: 1000,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      yAxes: {
        display: false,
        gridLines: {
          display: false,
        },
        ticks: {
          beginAtZero: true,
          rotation: 0,
        },
      },
      xAxes: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
          minRotation: 0,
        },
      },
    },
    legend: {
      display: false,
    },
  }
} 