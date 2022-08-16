export const COLOR = {
  colorValue: "#00B159",
  colorPredicted: "#00AEDB",
  colorDeviation: "#D11141",
  colorThresholdHigh: "#FFFF00",
  colorThresholdLow: "#FFFF00",
  colorAbnormalMarker: "#FF0000",
};

export const configChart1 = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        fontColor: "#aaa",
        usePointStyle: true,
      },
      display: false,
      position: "bottom",
    },
    title: {
      display: false,
    },
  },
  scales: {
    xAxis: {
      display: true,
      grid: {
        color: "#58585A",
        tickColor: "#aaa",
        display: true,
        drawOnChartArea: true,
        drawTicks: false,
      },
      ticks: {
        fontColor: "#aaa",
        autoSkip: true,
        maxTicksLimit: 20,
        maxRotation: 35,
        display: false,
        // callback: function(value, index, values) {
        //   return '';
        // }
      },
    },
    yValue: {
      type: "linear",
      display: true,
      position: "left",
      grid: {
        color: "#58585A",
      },
      ticks: {
        color: COLOR.colorValue,
        callback: label => {
          if (Math.floor(label) === label) {
            return label;
          }
        },
      },
    },
  },
};

export const configChart2 = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        fontColor: "#aaa",
        usePointStyle: true,
      },
      display: false,
      position: "bottom",
    },
    title: {
      display: false,
    },
  },
  scales: {
    xAxis: {
      grid: {
        color: "#58585A",
        tickColor: "#aaa",
        display: true,
        drawOnChartArea: true,
        drawTicks: true,
      },
      ticks: {
        fontColor: "#aaa",
        autoSkip: true,
        maxTicksLimit: 20,
        maxRotation: 35,
      },
    },
    yDeviation: {
      type: "linear",
      display: true,
      position: "left",
      grid: {
        color: "#58585A",
      },
      ticks: {
        color: COLOR.colorDeviation,
        stepSize: 10,
      },
    },
  },
};
