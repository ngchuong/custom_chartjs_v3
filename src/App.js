import React, { Component, createRef, useEffect, useRef, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart } from "chart.js";
import { reqSensor } from "./api";

import ChartDisplay from "./chart";

function App() {
  const [dataChart, setDataChart] = useState([]);
  const [time, setTime] = useState({ sTime: 1, eTime: 8 });

  useEffect(() => {
    // request api
    reqSensor(time).then(res => {
      setDataChart(res);
    });
  }, [time]);

  const onChangeTimeReq = type => {
    const thin = 7;
    if (type === "next") {
      setTime(cur => {
        return {
          sTime: cur.sTime + thin,
          eTime: cur.eTime + thin,
        };
      });
    } else {
      setTime(cur => {
        return {
          sTime: cur.sTime - thin,
          eTime: cur.eTime - thin,
        };
      });
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button onClick={() => onChangeTimeReq("prev")}>Prev</button>
      </div>
      <ChartDisplay dataChart={dataChart} />
      <div style={{ display: "flex", alignItems: "center" }}>
        <button onClick={() => onChangeTimeReq("next")}>Next</button>
      </div>
    </div>
  );
}

export default App;
