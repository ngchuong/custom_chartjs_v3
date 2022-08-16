const mockData = (start, end) => {
  const data = [];

  for (let i = start; i <= end; i++) {
    data.push({
      label: `${i}/01`,
      max: Math.floor(Math.random() * 90),
      min: Math.floor(Math.random() * 90),
    });
  }

  return data;
};

export const reqSensor = time => {
  return new Promise((res, rej) => {
    setTimeout(() => res(mockData(time.sTime, time.eTime)), 1000);
  });
};
