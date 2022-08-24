export const mockData = (start, end) => {
  const data = [];
  const numberOfItem = 20;

  const range = end - start;
  for (let i = 0; i <= numberOfItem; i++) {
    let min = Math.floor(Math.random() * 90);
    let max = Math.floor(Math.random() * 90);
    if (i <= numberOfItem / 2) {
      data.push({
        label: start + (range * i) / numberOfItem,
        max,
        min,
      });
    }
  }

  return data;
};
