const msToHours = (ms) => {
  const hours = Math.floor(ms / 3600 / 1000);
  const minutes = (ms / 60 / 1000) % 60;

  return {
    hours,
    minutes,
  };
};

export default msToHours;
