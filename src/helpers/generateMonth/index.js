import getLastDays from "./getLastDays";

const sequentialDays = (length, { relativeMonth }) =>
  Array.from({ length }, (_, i) => ({ date: 1 + i, relativeMonth }));

const generateMonth = (year, month) => {
  const lastDay = new Date(year, month + 1, 0);

  const days = [
    ...getLastDays(year, month),
    ...sequentialDays(lastDay.getDate(), { relativeMonth: 0 }),
  ];

  const daysFromNextMonth = sequentialDays(7 - (days.length % 7), {
    relativeMonth: 1,
  });

  return [...days, ...daysFromNextMonth];
};

export default generateMonth;
