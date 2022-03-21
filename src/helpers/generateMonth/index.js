import getLastDays from './getLastDays';

const sequentialDays = (length, { actualMonth }) => Array.from(
  { length },
  (_, i) => ({ date: 1 + i, actualMonth })
)

const generateMonth = (year, month) => {
  const lastDay = new Date(year, month + 1, 0);

  const days = [
    ...getLastDays(year, month),
    ...sequentialDays(lastDay.getDate(), { actualMonth: true })
  ]

  const daysFromNextMonth = sequentialDays(7 - (days.length % 7), { actualMonth: false })

  return [
    ...days,
    ...daysFromNextMonth
  ]
}

export default generateMonth;