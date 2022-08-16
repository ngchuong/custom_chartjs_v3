import React, { useEffect, useState } from "react";
import { reqSensor } from "./api";

import ChartDisplay from "./chart";

function App() {
  const [dataChart, setDataChart] = useState([]);
  const [time, setTime] = useState({ sTime: 1, eTime: 8 });
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // request api
    // setIsLoading(true);
    reqSensor(time).then(res => {
      setDataChart(res);
    });
    // setIsLoading(false);
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
      {/* {isLoading && (
        <div style={{ display: "fixed", width: "100vw", height: "100vh", background: "#fff" }}>
          Loading...
        </div>
      )} */}
    </div>
  );
}

export default App;
