const msToHours = (ms) => {
  const hours = Math.floor(ms / 3600 / 1000);
  const minutes = (ms / 60 / 1000) % 60;
  return `${hours}`.padStart(2, 0) + ":" + `${minutes}`.padStart(2, 0);
};

export default msToHours;
