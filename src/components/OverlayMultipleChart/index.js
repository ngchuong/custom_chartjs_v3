import React, { useEffect, useState } from "react";
import SubChart from "./chart";
import OverlayChart from "./overlay_chart";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const prevDate = (date = new Date()) => {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - 1);

  return previous;
};

function App() {
  const mainData = [{ pid: "C1" }, { pid: "C2" }, { pid: "C3" }, { pid: "C4" }];
  const [rangeTime, setRangeTime] = useState({
    startDate: prevDate(),
    endDate: new Date(),
    key: "selection",
  });

  // state: overlay/ normal
  const [isOverlay, setIsOverlay] = useState(false);

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
      <div>
        <div style={{ marginBottom: 10 }}>
          <DateRangePicker ranges={[rangeTime]} onChange={handleSelect} />
        </div>
        <div className="btn-control" style={{ marginBottom: 10 }}>
          <button onClick={() => setIsOverlay(!isOverlay)}>Overlay/ Reset</button>
        </div>
      </div>
      {isOverlay ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <OverlayChart rangeTime={rangeTime} mainData={mainData} />
        </div>
      ) : (
        <div>
          {mainData.map((el, index) => {
            return (
              <div key={el.pid} style={{ display: "flex", justifyContent: "center" }}>
                <SubChart rangeTime={rangeTime} nameChart={el.pid} indexChart={index} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
