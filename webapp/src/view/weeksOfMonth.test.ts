import weeksOfMonth from './weeksOfMonth';

describe('Generic properties', () => {
  const year = randomIntFromInterval(2000, 3000);
  const month = randomIntFromInterval(0, 11);
  let weeks: Date[][];

  test(`Should be able to invoke for random month, ${new Date(
    year,
    month
  ).toDateString()}`, () => {
    expect(() => {
      weeks = weeksOfMonth(year, month);
    }).not.toThrow();
  });

  test('Should have at least 4 weeks', () => {
    expect(weeks.length).toBeGreaterThanOrEqual(4);
  });

  test('Dates must be correctly assigned in each week', () => {
    const date = new Date(weeks[0][0]);
    weeks.forEach((week) => {
      week.forEach((d, i) => {
        expect(i).toEqual(d.getDay());
        expect(d).toEqual(date);
        date.setDate(date.getDate() + 1);
      });
    });
  });
});

describe('2023 Oct // Starting in Sunday', () => {
  const weeks = weeksOfMonth(2023, 9);

  test('Oct 1 is Sunday and must be the start of first week', () => {
    expect(weeks[0][0]).toEqual(new Date(2023, 9, 1));
  });

  test('Nov 4 is Saturday and must be the end of last week', () => {
    expect(weeks[4][6]).toEqual(new Date(2023, 10, 4));
  });
});

describe('2024 Aug // Ending in Saturday', () => {
  const weeks = weeksOfMonth(2024, 7);

  test('Jul 28 is Sunday and must be the start of first week', () => {
    expect(weeks[0][0]).toEqual(new Date(2024, 6, 28));
  });

  test('Aug 31 is Saturday and must be the end of last week', () => {
    expect(weeks[4][6]).toEqual(new Date(2024, 7, 31));
  });
});

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
