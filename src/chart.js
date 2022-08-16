import React, { useEffect, useRef, useMemo } from "react";
import _get from "lodash/get";
import {
  Chart,
  registerables,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import LegendCustom from "./SubComponent/LegendCustom";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
  ...registerables,
);

const COLOR = {
  colorValue: "#00B159",
  colorPredicted: "#00AEDB",
  colorDeviation: "#D11141",
  colorThresholdHigh: "#FFFF00",
  colorThresholdLow: "#FFFF00",
  colorAbnormalMarker: "#FF0000",
};

const ChartDisplay = ({ dataChart }) => {
  // const [mainChart, setMainChart] = useState();
  // const [subChart, setSubChart] = useState();
  const chartRef1 = useRef();
  let myChart1;
  const chartRef2 = useRef();
  let myChart2;

  // make style chart
  useEffect(() => {
    chartRef1.current.style.width = "590px";
    chartRef1.current.style.borderBottom = "solid 1px #333";

    chartRef2.current.style.width = "610px";
  }, []);

  // build chart
  useEffect(() => {
    if (!dataChart) return;
    const myChartRef1 = chartRef1.current.getContext("2d");
    // chart 1
    myChart1 = new Chart(myChartRef1, {
      type: "line",
      data: {
        labels: dataChart.map(el => el.label),
        datasets: [
          {
            label: "Max",
            data: dataChart.map(el => el.max),
            fill: false,
            borderColor: "green",
            backgroundColor: "green",
          },
          {
            label: "Min",
            data: dataChart.map(el => el.min),
            fill: false,
            borderColor: "blue",
            backgroundColor: "blue",
          },
        ],
      },
      options: {
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
      },
    });

    // chart 2
    const myChartRef2 = chartRef2.current.getContext("2d");
    myChart2 = new Chart(myChartRef2, {
      type: "line",
      data: {
        labels: dataChart.map(el => el.label),
        datasets: [
          {
            label: "Diff",
            data: dataChart.map(el => Math.abs(el.max - el.min)),
            fill: false,
            borderColor: "red",
            backgroundColor: "red",
          },
          // {
          //   label: "Detection",
          //   data: dataChart.map((el, i) => (i < 5 ? 5 : null)),
          //   fill: false,
          //   borderColor: "darkred",
          //   pointStyle: "cross",
          // },
        ],
      },

      options: {
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
            },
          },
        },
      },
    });

    // custom legend;
    const btn0 = document.getElementById("btn0");
    const btn1 = document.getElementById("btn1");
    const btnDeviation = document.getElementById("btn_deviation");

    const label0 = document.getElementById("label0");
    const label1 = document.getElementById("label1");
    const labelDeviation = document.getElementById("label_deviation");

    // style
    if (btn0 && btn1) {
      btn0.style.backgroundColor = myChart1.data.datasets[0].backgroundColor;
      btn1.style.backgroundColor = myChart1.data.datasets[1].backgroundColor;
    }
    btnDeviation.style.backgroundColor = myChart2.data.datasets[0].backgroundColor;

    // label
    if (label0 && btn1) {
      label0.innerText = myChart1.data.datasets[0].label;
      label1.innerText = myChart1.data.datasets[1].label;
    }

    labelDeviation.innerText = myChart2.data.datasets[0].label;

    return () => {
      myChart1 && myChart1.destroy();
      myChart2 && myChart2.destroy();
    };
  }, [dataChart]);

  // toggle data
  const toggleData = val => () => {
    console.log("val", val);
    if (val === "all") {
      // TODO: solution for No23
      const visibleLine1 = myChart1.isDatasetVisible(0);
      myChart1.data.datasets[0].hidden = visibleLine1;
      myChart1.data.datasets[1].hidden = visibleLine1;
      myChart1.update();
      return;
    }

    if (val === "diff") {
      const visibleLine2 = myChart2.isDatasetVisible(0);
      myChart2.data.datasets[0].hidden = visibleLine2;
      myChart2.update();
      return;
    }

    const visible = myChart1.isDatasetVisible(val);

    if (visible) {
      myChart1.data.datasets[val].hidden = true;
    } else {
      myChart1.data.datasets[val].hidden = false;
    }
    myChart1.update();
  };

  const datasetChart1 = useMemo(() => _get(myChart1, "data.datasets", []), [myChart1]);
  console.log("datasetChart1", datasetChart1);

  return (
    <div
      style={{
        width: 600,
        // border: "solid 1px black",
        height: 600,
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        // flexDirection: "column",
      }}>
      <div style={{ width: "100%", height: "100%", position: "absolute", margin: "0 50px" }}>
        <div style={{ width: 600 }}>
          <canvas id="myChart" ref={chartRef1} />
        </div>
        <div style={{ width: 610 }}>
          <canvas id="myChart2" ref={chartRef2} />
        </div>
        <div>
          {/* {Array.isArray(datasetChart1) &&
            datasetChart1.map((el, index) => {
              return (
                <div key={index} style={{ display: "flex", alignItems: "center" }}>
                  <button id={`btn${index}`} onClick={toggleData(index)}></button>
                  <span id={`label${index}`}></span>
                </div>
              );
            })} */}

          <LegendCustom idBtn="btn0" idLabel="label0" handleClick={toggleData(0)} />
          <LegendCustom idBtn="btn1" idLabel="label1" handleClick={toggleData(0)} />
          <LegendCustom
            idBtn="btn_deviation"
            idLabel="label_deviation"
            handleClick={toggleData("diff")}
          />

          <div>
            <button id="btn3" onClick={toggleData("all")}>
              Show/hide line chart 1
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChartDisplay;
