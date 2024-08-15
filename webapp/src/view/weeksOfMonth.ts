// Return dates of months grouped by weeks in 2D array.
// First and last weeks include dates from previous and next months.
function weeksOfMonth(year: number, month: number): Date[][] {
  const firstDate = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0);
  const dayCount = lastDate.getDate() - firstDate.getDate() + 1;

  const weeks: Date[][] = [Array(7)];

  // dates from previous month
  for (let i = 0, count = firstDate.getDay(); i < count; i++) {
    const date = new Date(year, month, firstDate.getDate() - i - 1);
    weeks[0][date.getDay()] = date;
  }

  for (let i = 0; i < dayCount; i++) {
    const date = new Date(year, month, i + 1);
    if (date.getDay() == 0 && i != 0) weeks.push(Array(7));
    weeks[weeks.length - 1][date.getDay()] = date;
  }

  // dates from next month
  for (let i = 0, count = 6 - lastDate.getDay(); i < count; i++) {
    const date = new Date(year, month, lastDate.getDate() + i + 1);
    weeks[weeks.length - 1][date.getDay()] = date;
  }

  return weeks;
}

export default weeksOfMonth;
