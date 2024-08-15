import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Calendar from './view/calendar/Calendar.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Calendar />
  </StrictMode>
);
