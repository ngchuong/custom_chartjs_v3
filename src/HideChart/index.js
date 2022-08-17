import React, { useRef, useState, createRef, useMemo } from "react";
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
import { Line } from "react-chartjs-2";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ...registerables,
);

const ChartDisplay = ({ dataChart }) => {
  //Measured/Predicted
  const [mode, setMode] = useState("measured");

  const arrChart = [1, 2, 3, 4];
  const arrRef = Array(arrChart.length)
    .fill()
    .map((_, i) => useRef());

  // change mode display line chart
  const onChangeMode = e => {
    const value = e.target.value;
    setMode(value);

    toggleData(value);
  };

  // toggle
  const toggleData = value => {
    arrRef.forEach((item, index) => {
      // console.log("item", value, item);
      const chartRef = item.current.config._config;
      if (value == "measured") {
        console.log(1);
        chartRef.data.datasets[0].hidden = false;
        chartRef.data.datasets[1].hidden = false;
        chartRef.data.datasets[2].hidden = true;
      } else {
        console.log(2);

        chartRef.data.datasets[0].hidden = true;
        chartRef.data.datasets[1].hidden = true;
        chartRef.data.datasets[2].hidden = false;
      }

      item.current.update();
    });
  };

  return (
    <div>
      <div>
        <div>
          <input
            type="radio"
            id="huey"
            name="chart"
            value="measured"
            checked={mode === "measured"}
            onChange={onChangeMode}
          />
          <label>measured</label>
        </div>
        <div>
          <input
            type="radio"
            id="dewey"
            name="chart"
            value="predicted"
            checked={mode === "predicted"}
            onChange={onChangeMode}
          />
          <label>predicted</label>
        </div>
      </div>

      <div>
        {arrChart.map((el, index) => {
          return (
            <div key={index}>
              <Line
                ref={arrRef[index]}
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
                    {
                      label: "Diff",
                      data: dataChart.map(el => Math.abs(el.max - el.min)),
                      fill: false,
                      borderColor: "red",
                      backgroundColor: "red",
                    },
                  ],
                }}
                options={{}}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChartDisplay;
