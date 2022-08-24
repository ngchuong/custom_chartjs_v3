export const DATE_FORMAT = "MM-DD HH:mm";

export const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export const COLOR = [
  {
    min: "#FF4A4A",
    max: "#A62349",
  },
  {
    min: "#5800FF",
    max: "#0096FF",
  },
  {
    min: "#FF8D29",
    max: "#FFCD38",
  },
];

const getOrCreateLegendList = (chart, id) => {
  const legendContainer = document.getElementById(id);
  let listContainer = legendContainer.querySelector("ul");

  if (!listContainer) {
    listContainer = document.createElement("ul");
    listContainer.style.display = "flex";
    listContainer.style.flexDirection = "column";
    listContainer.style.marginBottom = "10px";
    listContainer.style.padding = 0;

    legendContainer.appendChild(listContainer);
  }

  return listContainer;
};

export const htmlLegendPlugin = {
  id: "htmlLegend",
  afterUpdate(chart, args, options) {
    const divMain = getOrCreateLegendList(chart, options.containerID);

    // Remove old legend items
    while (divMain.firstChild) {
      divMain.firstChild.remove();
    }

    // Reuse the built-in legendItems generator
    const items = chart.options.plugins.legend.labels.generateLabels(chart);

    const numberChartEachPid = options.numberChartEachPid;
    const rawData = options.rawData;

    for (let i = 0; i < rawData.length; i++) {
      const ul = document.createElement("ul");
      ul.style.display = "flex";
      ul.style.marginBottom = "10px";

      // add name pid
      const containerPidName = document.createElement("p");
      const pidName = document.createTextNode(rawData[i].pid);
      containerPidName.appendChild(pidName);
      ul.appendChild(containerPidName);

      // add row pid
      const newItesm = items.slice(i * numberChartEachPid, (i + 1) * numberChartEachPid);
      newItesm.forEach(item => {
        const li = document.createElement("li");
        li.style.alignItems = "center";
        li.style.cursor = "pointer";
        li.style.display = "flex";
        li.style.flexDirection = "row";
        li.style.marginLeft = "10px";
        li.style.marginRight = "10px";

        li.onclick = () => {
          const { type } = chart.config;
          if (type === "pie" || type === "doughnut") {
            // Pie and doughnut charts only have a single dataset and visibility is per item
            chart.toggleDataVisibility(item.index);
          } else {
            chart.setDatasetVisibility(
              item.datasetIndex,
              !chart.isDatasetVisible(item.datasetIndex),
            );
          }
          chart.update();
        };

        // Color box
        const boxSpan = document.createElement("span");
        boxSpan.style.background = item.fillStyle;
        boxSpan.style.borderColor = item.strokeStyle;
        boxSpan.style.borderWidth = item.lineWidth + "px";
        boxSpan.style.display = "inline-block";
        boxSpan.style.height = "20px";
        boxSpan.style.marginRight = "10px";
        boxSpan.style.width = "20px";

        // Text
        const textContainer = document.createElement("p");
        textContainer.style.color = item.fontColor;
        textContainer.style.margin = 0;
        textContainer.style.padding = 0;
        textContainer.style.textDecoration = item.hidden ? "line-through" : "";

        const text = document.createTextNode(item.text);
        textContainer.appendChild(text);

        li.appendChild(boxSpan);
        li.appendChild(textContainer);
        ul.appendChild(li);
      });

      divMain.appendChild(ul);
    }
  },
};
