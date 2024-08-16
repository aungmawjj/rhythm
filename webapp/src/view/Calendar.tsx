import { useState } from 'react';
import { weeksOfMonth } from '../utils';

const daysOfWeeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function Calendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const weeks = weeksOfMonth(year, month);

  function setYearMonth(date: Date) {
    setYear(date.getFullYear());
    setMonth(date.getMonth());
  }

  function prevMonth() {
    setYearMonth(new Date(year, month - 1));
  }

  function nextMonth() {
    setYearMonth(new Date(year, month + 1));
  }

  return (
    <div className='p-10 w-full'>
      <div className='pb-5 flex justify-center items-center'>
        <button className='btn btn-circle btn-ghost' onClick={prevMonth}>
          {'<'}
        </button>
        <div className='px-10'>
          {year} {monthNames[month]}
        </div>
        <button className='btn btn-circle btn-ghost' onClick={nextMonth}>
          {'>'}
        </button>
      </div>
      <div className='grid grid-cols-7 justify-items-center gap-2'>
        {daysOfWeeks.map((day) => (
          <div key={day}>{day}</div>
        ))}
        {weeks.map((week) =>
          week.map((date) => (
            <div key={`${date.getMonth()} ${date.getDate()}`} className='py-8'>
              {date.getDate()}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Calendar;
