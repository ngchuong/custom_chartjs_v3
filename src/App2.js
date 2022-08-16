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

// import faker from "faker";

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

const zoom1 = {
  id: "zoom1",
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
  },
};
// plugin chart
const pluginStyleChart = {
  id: "pluginStyleChart",
  beforeDraw: chart => {
    const {
      ctx,
      // chartArea: { top, bottom, left, right, width, height },
      // scales: { x, y },
    } = chart;
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "#999";
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
    pluginStyleChart,
    zoom: zoom1,
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [23, 233, 23, 13, 23],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [
        { x: 13, y: 33 },
        { x: 132, y: 23 },
        { x: 13, y: 65 },
        { x: 13, y: 100 },
      ],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
function App() {
  const chartRef = useRef(null);
  const refBtn1 = useRef();
  const refBtn2 = useRef();

  useEffect(() => {
    const chart = chartRef.current.config._config;

    // change style
    refBtn1.current.style.backgroundColor = chart.data.datasets[0].backgroundColor;
    refBtn2.current.style.backgroundColor = chart.data.datasets[1].backgroundColor;

    // change text
    refBtn1.current.textContent = chart.data.datasets[0].label;
    refBtn2.current.textContent = chart.data.datasets[1].label;
  }, [chartRef]);

  const toggle = val => {
    const chart = chartRef.current.config._config;
    const visible = chartRef.current.isDatasetVisible(val);

    if (visible) {
      chart.data.datasets[val].hidden = true;
    } else {
      chart.data.datasets[val].hidden = false;
    }
    chartRef.current.update();
  };

  return (
    <div style={{ width: 700 }}>
      <Line options={options} data={data} ref={chartRef} plugins={[pluginStyleChart, zoom1]} />;
      <div>
        <button ref={refBtn1} onClick={() => toggle(0)}>
          data1
        </button>
        <button ref={refBtn2} onClick={() => toggle(1)}>
          data2
        </button>
      </div>
      <div>
        <button onClick={() => {}}>Reset zoom</button>
      </div>
    </div>
  );
}

export default App;
