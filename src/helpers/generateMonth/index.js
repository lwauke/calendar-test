import getLastDays from './getLastDays';

const sequentialArray = length => Array.from({ length }, (_, i) => i)

const generateMonth = (year, month) => {
  const lastDay = new Date(year, month + 1, 0);

  const days = [
    ...getLastDays(year, month),
    ...sequentialArray(lastDay.getDate())
  ]

  const daysFromNextMonth = sequentialArray(7 - (days.length % 7))

  return [
    ...days,
    ...daysFromNextMonth
  ]
}

export default generateMonth;