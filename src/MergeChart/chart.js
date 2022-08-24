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
import { COLOR } from "./utils";

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
const DATE_FORMAT = "MM-DD HH:mm";

const SubChart = ({ rangeTime, nameChart, indexChart }) => {
  const dataChart = mockData(
    new Date(rangeTime.startDate).getTime(),
    new Date(rangeTime.endDate).getTime(),
  );

  return (
    <div
      style={{ border: "1px solid #ccc", width: 500, display: "flex", justifyContent: "center" }}>
      <div>{nameChart}</div>
      <div style={{ width: 400 }}>
        <Line
          data={{
            labels: dataChart.map(el => moment(el.label).format(DATE_FORMAT)),
            datasets: [
              {
                label: "Max",
                data: dataChart.map(el => el.max),
                fill: false,
                borderColor: COLOR[indexChart].max,
                backgroundColor: COLOR[indexChart].max,
              },
              {
                label: "Min",
                data: dataChart.map(el => el.min),
                fill: false,
                borderColor: COLOR[indexChart].min,
                backgroundColor: COLOR[indexChart].min,
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                position: "bottom",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default SubChart;
