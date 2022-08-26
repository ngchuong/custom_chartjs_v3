import React, { useMemo } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SplitPane from "react-split-pane";

import Home from "./components/Home";
import DrawVerticalChart from "./components/DrawVerticalChart";
import OverlayMultipleChart from "./components/OverlayMultipleChart";
import SynchronizedTwoChart from "./components/SynchronizedTwoChart";
import ControlLegendOfMultipleChart from "./components/ControlLegendOfMultipleChart";

const styles = {
  background: "#000",
  width: "2px",
  cursor: "col-resize",
  margin: "0 5px",
  height: "100%",
};

const rootRoutes = [
  {
    path: "/",
    title: "Introduce",
    component: <Home />,
  },
  {
    path: "/draw-vertical-chart",
    title: "Draw vertical chart",
    component: <DrawVerticalChart />,
  },
  {
    path: "/overlay-multiple-chart",
    title: "Overlay Multiple Chart",
    component: <OverlayMultipleChart />,
  },
  {
    path: "/synchronized-two-chart",
    title: "Synchronized Two Chart",
    component: <SynchronizedTwoChart />,
  },
  {
    path: "/control-legend-of-multiple-chart",
    title: "Control Legend Of Multiple Chart",
    component: <ControlLegendOfMultipleChart />,
  },
];

const App = () => {
  return (
    <BrowserRouter>
      <SplitPane split="vertical" minSize={100} defaultSize={200} resizerStyle={styles}>
        <menu
          style={{
            backgroundColor: "#293462",
            height: "100%",
            fontSize: 16,
            padding: "2px 0 0 5px",
          }}>
          {rootRoutes.map(el => {
            return (
              <div
                key={el.title}
                style={{
                  margin: "8px 0px",
                  padding: "8px 0",
                  width: "100%",
                  backgroundColor: `${
                    window.location.pathname === el.path ? "#5800FF" : "#3B9AE1"
                  }`,
                }}>
                <Link to={el.path} style={{ color: "#fff", textDecoration: "none", padding: 4 }}>
                  {el.title}
                </Link>
              </div>
            );
          })}
        </menu>
        <div>
          <Routes>
            {rootRoutes.map(el => {
              return <Route key={el.title} exact path={el.path} element={el.component} />;
            })}
          </Routes>
        </div>
      </SplitPane>
    </BrowserRouter>
  );
};

export default App;
