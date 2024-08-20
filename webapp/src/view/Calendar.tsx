import { useState } from 'react';
import clsx from 'clsx';
import { FaPersonRunning } from 'react-icons/fa6';
import { MoonIcon } from '@heroicons/react/16/solid';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

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
    <div className='w-full px-2 lg:px-4'>
      <div className='py-5 flex justify-center items-center'>
        <button className='btn btn-circle btn-ghost' onClick={prevMonth}>
          <ArrowLeftIcon className='size-6' />
        </button>
        <div className='px-10'>
          {year} {monthNames[month]}
        </div>
        <button className='btn btn-circle btn-ghost' onClick={nextMonth}>
          <ArrowRightIcon className='size-6' />
        </button>
      </div>

      <table className='w-full table-fixed border-collapse'>
        <thead>
          <tr>
            {daysOfWeeks.map((day, i) => (
              <th
                key={day}
                className={clsx('pb-4 font-normal', {
                  'text-red-500': i == 0 || i == 6,
                })}
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week) => (
            <tr key={week[0].getTime()}>
              {week.map((date) => (
                <td key={date.getTime()} className='border'>
                  <div className='min-h-28 py-1 lg:py-2 text-center'>
                    <div className='my-1 lg:my-2'>{date.getDate()}</div>
                    <div className='inline-flex rounded-full my-1 mx-2 w-fit py-0.5 lg:py-1 px-2 border 
                    border-sky-400 text-sky-950'>
                      <MoonIcon className='size-4' />
                    </div>
                    <div className='inline-flex rounded-full my-1 mx-2 w-fit py-0.5 lg:py-1 px-2 border 
                    border-amber-400 text text-amber-950'>
                      <FaPersonRunning className='size-4' />
                    </div>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Calendar;
