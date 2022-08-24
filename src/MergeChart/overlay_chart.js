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
import _sortBy from "lodash/sortBy";

import moment from "moment";

import { mockData } from "./api";
import { randomColor, DATE_FORMAT, COLOR, htmlLegendPlugin } from "./utils";

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

const calculateDataChart = datas => {
  let result = [];
  datas.forEach((item, index) => {
    result = [
      ...result,
      {
        yAxisID: item.pid,
        label: "Max",
        data: item.data.map(el => el.max),
        fill: false,
        borderColor: COLOR[index].max,
        backgroundColor: COLOR[index].max,
      },
      {
        yAxisID: item.pid,

        label: "Min",
        data: item.data.map(el => el.min),
        fill: false,
        borderColor: COLOR[index].min,
        backgroundColor: COLOR[index].min,
      },
    ];
  });

  return result;
};

const OverlayChart = ({ rangeTime, mainData }) => {
  const rawData = mainData.map(el => {
    return {
      pid: el.pid,
      data: mockData(
        new Date(rangeTime.startDate).getTime(),
        new Date(rangeTime.endDate).getTime(),
      ),
    };
  });

  useEffect(() => {});

  const datasets = calculateDataChart(rawData);
  // console.log("rawData", rawData, datasets);

  const configChart = useMemo(() => {
    let options = {
      scales: {
        x: {},
      },
    };

    // options = {...options, scales: {...options.scales, }}
    return options;
  }, []);

  return (
    <div
      style={{ border: "1px solid #ccc", width: 500, display: "flex", justifyContent: "center" }}>
      <div style={{ width: 400 }}>
        <Line
          data={{
            labels: rawData.map(el => moment(el.label).format(DATE_FORMAT)),
            datasets,
          }}
          options={{
            ...configChart,
            plugins: {
              htmlLegend: {
                // ID of the container to put the legend in
                containerID: "legend-container",
                numberChartEachPid: datasets.length / rawData.length,
                rawData: rawData,
              },
              legend: {
                display: false,
              },
            },
          }}
          plugins={[htmlLegendPlugin]}
        />
        <div id="legend-container"></div>
      </div>
    </div>
  );
};

export default OverlayChart;
