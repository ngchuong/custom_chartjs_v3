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

const getOrCreateLegendList = (chart, id) => {
  const legendContainer = document.getElementById(id);
  let listContainer = legendContainer.querySelector("ul");

  if (!listContainer) {
    listContainer = document.createElement("ul");
    listContainer.style.display = "flex";
    listContainer.style.flexDirection = "row";
    listContainer.style.margin = 0;
    listContainer.style.padding = 0;

    legendContainer.appendChild(listContainer);
  }

  return listContainer;
};

export const htmlLegendPlugin = {
  id: "htmlLegend",
  afterUpdate(chart, args, options) {
    const ul = getOrCreateLegendList(chart, options.containerID);

    // Remove old legend items
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    // Reuse the built-in legendItems generator
    const items = chart.options.plugins.legend.labels.generateLabels(chart);
    console.log("items", items, chart);
    items.forEach(item => {
      const li = document.createElement("li");
      li.style.alignItems = "center";
      li.style.cursor = "pointer";
      li.style.display = "flex";
      li.style.flexDirection = "row";
      li.style.marginLeft = "10px";

      li.onclick = () => {
        const { type } = chart.config;
        if (type === "pie" || type === "doughnut") {
          // Pie and doughnut charts only have a single dataset and visibility is per item
          chart.toggleDataVisibility(item.index);
        } else {
          chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
        }
        chart.update();
      };

      // Color box
      const boxSpan = document.createElement("span");
      boxSpan.style.background = item.fillStyle;
      boxSpan.style.borderColor = item.strokeStyle;
      boxSpan.style.borderWidth = item.lineWidth + "px";
      boxSpan.style.display = "inline-block";
      boxSpan.style.height = "20px";
      boxSpan.style.marginRight = "10px";
      boxSpan.style.width = "20px";

      // Text
      const textContainer = document.createElement("p");
      textContainer.style.color = item.fontColor;
      textContainer.style.margin = 0;
      textContainer.style.padding = 0;
      textContainer.style.textDecoration = item.hidden ? "line-through" : "";

      const text = document.createTextNode(item.text);
      textContainer.appendChild(text);

      li.appendChild(boxSpan);
      li.appendChild(textContainer);
      ul.appendChild(li);
    });
  },
};
