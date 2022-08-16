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
import { Bar, Line, Scatter } from "react-chartjs-2";

import zoomPlugin from "chartjs-plugin-zoom";
import LegendCustom from "./SubComponent/LegendCustom";
import { configChart1, configChart2 } from "./config/config";

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

const ChartDisplay = ({ dataChart, handleZoom }) => {
  const type = "";

  const chartRef1 = useRef(null);
  const chartRef2 = useRef();

  const pluginOnZoom = useMemo(
    () => ({
      zoom: {
        drag: {
          enabled: true,
        },
        mode: "xy",
        onZoom: ({ chart }) => {
          console.log(chart, chart.scales.xAxis.ticks);
          const ticks = _get(chart, "scales.xAxis.ticks", []);
          const fromPoint = ticks[0].label;
          const lastPoint = ticks[ticks.length - 1].label;
          handleZoom({ sTime: fromPoint.split("/")[0], eTime: lastPoint.split("/")[0] });
        },
      },
    }),
    [],
  );

  // style for legend
  useEffect(() => {
    const firstChart = chartRef1.current.config._config;
    const secondChart = chartRef2.current.config._config;

    // custom legend;
    const btn0 = document.getElementById("btn0");
    const btn1 = document.getElementById("btn1");
    const btnDeviation = document.getElementById("btn_deviation");

    const label0 = document.getElementById("label0");
    const label1 = document.getElementById("label1");
    const labelDeviation = document.getElementById("label_deviation");

    // style btn
    btn0.style.backgroundColor = firstChart.data.datasets[0].backgroundColor;
    btn1.style.backgroundColor = firstChart.data.datasets[1].backgroundColor;
    btnDeviation.style.backgroundColor = secondChart.data.datasets[0].backgroundColor;

    // text label
    label0.innerText = firstChart.data.datasets[0].label;
    label1.innerText = firstChart.data.datasets[1].label;
    labelDeviation.innerText = secondChart.data.datasets[0].label;
  }, [dataChart, chartRef1, chartRef2]);

  // toggle data
  const toggleData = val => () => {
    const firstChart = chartRef1.current.config._config;
    const secondChart = chartRef2.current.config._config;
    if (val === "all") {
      // TODO: solution for No23
      const visibleChart1 = chartRef1.current.isDatasetVisible(0);
      firstChart.data.datasets[0].hidden = visibleChart1;
      firstChart.data.datasets[1].hidden = visibleChart1;
      chartRef1.current.update();
      return;
    }

    if (val === "diff") {
      const visibleLine2 = chartRef2.current.isDatasetVisible(0);
      secondChart.data.datasets[0].hidden = visibleLine2;
      chartRef2.current.update();
      return;
    }

    const visible = chartRef1.current.isDatasetVisible(val);

    if (visible) {
      firstChart.data.datasets[val].hidden = true;
    } else {
      firstChart.data.datasets[val].hidden = false;
    }
    chartRef1.current.update();
  };

  //   const options1 = useMemo(() => {
  // return {

  // }
  //   }, [])

  // const datasetChart1 = useMemo(() => {
  //   return _get(chartRef1, ["current", "config", "_config", "data", "datasets"], []);
  // }, [chartRef1]);

  // console.log(1, datasetChart1);

  // switch chart display
  const ChartRender = useMemo(() => {
    switch (type) {
      case "bar": {
        return Bar;
      }
      case "scartter": {
        return Scatter;
      }
      default:
        return Line;
    }
  }, [type]);

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
        <div style={{ width: 600, height: 300 }}>
          <ChartRender
            ref={chartRef1}
            data={{
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
            }}
            options={{
              ...configChart1,
              plugins: {
                ...configChart1.plugins,
                zoom: pluginOnZoom,
              },
            }}
            plugins={[pluginOnZoom]}
          />
        </div>
        <div style={{ width: 610, height: 300 }}>
          <ChartRender
            ref={chartRef2}
            data={{
              labels: dataChart.map(el => el.label),
              datasets: [
                {
                  label: "Diff",
                  data: dataChart.map(el => Math.abs(el.max - el.min)),
                  fill: false,
                  borderColor: "red",
                  backgroundColor: "red",
                },
              ],
            }}
            options={{
              ...configChart2,
              plugins: {
                ...configChart2.plugins,
                zoom: pluginOnZoom,
              },
            }}
            plugins={[pluginOnZoom]}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "10px auto",
            width: "60%",
          }}>
          <LegendCustom idBtn="btn0" idLabel="label0" handleClick={toggleData(0)} />
          <LegendCustom idBtn="btn1" idLabel="label1" handleClick={toggleData(1)} />
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
