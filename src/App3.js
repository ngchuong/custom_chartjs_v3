import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import { rawData } from "./const";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
);

// -------------
// TODO: data
const dataConvert = rawData.map(el => {
  return {
    time: el.timestamp,
    value: el.deviation,
  };
});

const fakeData = [];

//time range
const from = new Date("2022-05-01T09:13:44Z").getTime();
const to = new Date("2022-06-30T14:13:44Z").getTime();

// const from = new Date("2022-07-28T10:40:33Z").getTime();
// const to = new Date("2022-07-28T15:40:33Z").getTime();

const thin = to - from;
for (let i = 0; i <= 20; i++) {
  const timeStamp = from + (thin / 20) * i;
  // const findEl = fakeData.find(el => el && el.time !== timeStamp);
  const findEl = dataConvert.find(el => el && el.time === timeStamp);
  if (!findEl) {
    fakeData.push({
      time: timeStamp,
      data: null,
    });
    dataConvert.push({
      time: timeStamp,
      data: null,
    });
  }
}

const finalData = dataConvert;

const labels = finalData.map(el => new Date(el.time).toISOString().slice(0, 19));

const zoom1 = {
  zoom: {
    drag: {
      enabled: true,
    },
    wheel: {
      enabled: true,
    },
    pinch: {
      enabled: true,
    },
    mode: "xy",
    // onZoomStart: ({ chart, event, point }) => {
    //   console.log("----------", chart, event, point, chart.scales.x);
    //   const itemDisplay = chart.scales.x.ticks;
    //   const firstPoint = itemDisplay[0].label;
    //   const endPoint = itemDisplay[itemDisplay.length - 1].label;
    //   console.log(
    //     "time----",
    //     itemDisplay.length,
    //     firstPoint,
    //     endPoint,
    //     new Date(firstPoint).getTime(),
    //     new Date(endPoint).getTime(),
    //   );
    // },
    onZoom: ({ chart }) => {
      const itemDisplay = chart.scales.x.ticks;
      const firstPoint = itemDisplay[0].label;
      const endPoint = itemDisplay[itemDisplay.length - 1].label;
      console.log(
        "time----",
        itemDisplay.length,
        firstPoint,
        endPoint,
        new Date(firstPoint).getTime(),
        new Date(endPoint).getTime(),
      );
    },
  },
};

export const options = {
  responsive: true,
  scales: {
    x: {
      time: {
        min: "2022-05-01T09:13:44Z",
        max: "2022-06-20T14:13:44Z",
      },

      ticks: {
        fontColor: "#aaa",
        autoSkip: true,
        maxTicksLimit: 20,
      },
    },
    y: {
      type: "linear",
      display: true,
      position: "right",
      grid: {
        color: "#58585A",
      },
    },
  },
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
    zoom: zoom1,
  },
};

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: finalData.map(el => el.value),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      tension: 0.4,
    },
  ],
};
function App() {
  const chartRef = useRef(null);

  return (
    <div style={{ width: 700 }}>
      <Line options={options} data={data} ref={chartRef} plugins={[zoom1]} />;
    </div>
  );
}

export default App;
