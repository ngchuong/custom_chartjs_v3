import React, { useRef, useState, createRef, useMemo, useEffect, useCallback } from "react";
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
import _get from "lodash/get";

import { reqSensor } from "./api";

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

const ChartDisplay = () => {
  const [dataChart, setDataChart] = useState([]);

  //Measured/Predicted
  const [mode, setMode] = useState("measured");

  useEffect(() => {
    // request api
    // setIsLoading(true);
    reqSensor({ sTime: 1, eTime: 16 }).then(res => {
      setDataChart(res);
    });
    // setIsLoading(false);
  }, []);

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
    arrRef.forEach(item => {
      const datasets = _get(item, "current.config._config.data.datasets", []);
      const chart = item.current;

      datasets.forEach((el, i) => {
        if (value == "measured") {
          const isVisible = el.xxx === "diff" ? false : true;
          chart.setDatasetVisibility(i, isVisible);
        } else {
          const isVisible = el.xxx === "diff" ? true : false;
          chart.setDatasetVisibility(i, isVisible);
        }
      });
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
                      // yAxisID: "yyy",
                      xxx: "diff",
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
