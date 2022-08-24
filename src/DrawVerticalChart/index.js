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
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

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
// const DATE_FORMAT = "YYYY-MM-DD[T]HH:mm:ss[Z]";
const DATE_FORMAT = "YYYY-MM-DD HH:mm";

const prevDate = (date = new Date()) => {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - 1);

  return previous;
};

const pluginsVerticalLine = {
  id: "pluginsVerticalLine",
  beforeDraw(chart, args, options) {
    const {
      ctx,
      chartArea: { top, bottom, left, right, width, height },
      scales: { x, y },
    } = chart;
    ctx.save();

    // draw line
    ctx.strokeStyle = options.lineColor;
    // ctx.strokeRect(x0, y0, x1, y1);
    // x0 = starting point on the horizontal line, left/right
    // y0 = starting point on the vertical line, top/bottom
    // y1 = length point on the horizontal line, left/right
    // y1 = length point on the vertical line, top/bottom
    ctx.strokeRect(x.getPixelForValue(options.xPosition), top, 0, height);
    ctx.restore();
  },
};

const mockData = (start, end) => {
  const data = [];
  const numberOfItem = 100;

  const range = end - start;
  for (let i = 0; i <= numberOfItem; i++) {
    let min = Math.floor(Math.random() * 90);
    let max = Math.floor(Math.random() * 90);
    if (i <= numberOfItem) {
      data.push({
        label: start + (range * i) / numberOfItem,
        max,
        min,
      });
    }
  }

  return data;
};

const calculateData = (data, from, to) => {
  const collectData = [...data];
  const dataTimeStamp = data.map(el => el.label);
  const thin = dataTimeStamp[1] - dataTimeStamp[0];

  for (let i = from; i <= to; i += thin) {
    if (!dataTimeStamp.includes(i)) {
      collectData.push({
        label: i,
        max: null,
        min: null,
      });
    }
  }

  return collectData;
};

const ChartDisplay = () => {
  const timestampVer = new Date().getTime();

  const refChart = useRef();

  const [rangeTime, setRangeTime] = useState({
    startDate: prevDate(),
    endDate: new Date(),
    key: "selection",
  });

  // request API
  const [from, to] = [
    new Date(rangeTime.startDate).getTime(),
    new Date(rangeTime.endDate).getTime(),
  ];
  const resAPI = mockData(from, to);

  const dataChart = calculateData(resAPI, from, to);

  // calculate position of vertical line
  let xPosition = null;
  if (timestampVer >= from && timestampVer <= to) {
    const test = [...dataChart];
    // push timestamp detect
    if (!test.find(el => el.label === timestampVer)) {
      test.push({
        label: timestampVer,
        max: null,
        min: null,
      });
    }
    const sortData = _sortBy(test, ["label"]);
    // xPosition = sortData.findIndex(el => el.label === timestampVer) - 1;
    xPosition = sortData.length - 1;

    console.log("sortData", xPosition, sortData.length - 1);
  }

  const handleSelect = ranges => {
    const { startDate, endDate } = ranges.selection;
    setRangeTime({
      startDate,
      endDate,
      key: "selection",
    });
  };

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <DateRangePicker ranges={[rangeTime]} onChange={handleSelect} />
      </div>
      <div style={{ width: 700 }}>
        <Line
          ref={refChart}
          data={{
            labels: dataChart.map(el => moment(el.label).format(DATE_FORMAT)),
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
            scales: {
              x: {
                ticks: {
                  maxTicksLimit: 10,
                },
              },
              y: {
                min: -10,
                max: 150,
              },
            },
            plugins: {
              pluginsVerticalLine: {
                lineColor: "red",
                xPosition,
              },
            },
          }}
          plugins={[pluginsVerticalLine]}
        />
      </div>
    </div>
  );
};

export default ChartDisplay;
