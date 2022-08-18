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

  for (let i = start; i <= end; i++) {
    data.push({
      label: i,
      max: Math.floor(Math.random() * 90),
      min: Math.floor(Math.random() * 90),
    });
  }

  return data;
};

const ChartDisplay = () => {
  const dataChart = mockData(1, 10);

  // timestamp res from API
  const valueVerticalLine = 3.5;

  // const positionX = dataChart.find((el, index) => valueVerticalLine === el.label);

  let positionX = 0;
  for (let i = 0; i < dataChart.length; i++) {
    if (i === dataChart.length - 1) continue;
    if (valueVerticalLine >= dataChart[i].label && valueVerticalLine <= dataChart[i + 1].label) {
      positionX = Number(dataChart[i].label + dataChart[i + 1].label) / 2;
    }
  }

  const refChart = useRef();
  return (
    <div style={{ width: 700 }}>
      <Line
        ref={refChart}
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
        options={{
          plugins: {
            pluginsVerticalLine: {
              lineColor: "red",
              xPosition: valueVerticalLine,
            },
          },
        }}
        plugins={[pluginsVerticalLine]}
      />
    </div>
  );
};

export default ChartDisplay;
