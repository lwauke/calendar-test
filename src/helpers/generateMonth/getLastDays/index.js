const getLastDays = (year, month) => {
  const firstDay = new Date(year, month, 1);

  const lastDaysFromPreviousMonth = Array.from(
    { length: firstDay.getDay() },
    (_, i) => new Date(year, month, i * -1).getDate()
  );

  return lastDaysFromPreviousMonth.reverse();
}

export default getLastDays;