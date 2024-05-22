import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CalendarWrapper = styled.div`
  width: 350px;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin: 20px auto;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
`;

const CalendarBody = styled.div`
  padding: 10px;
`;

const DayNames = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Days = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const DayBox = styled.div`
  width: calc(100% / 7);
  text-align: center;
  padding: 10px 0;
  box-sizing: border-box;
  cursor: pointer;
`;

const Today = styled(DayBox)`
  background-color: #007bff;
  color: white;
  border-radius: 50%;
`;

const Calendar = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    renderCalendar();
  }, [date]);

  const renderCalendar = () => {
    date.setDate(1);

    const monthDays = document.querySelector('.days');
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const firstDayIndex = date.getDay();
    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    const nextDays = 7 - lastDayIndex - 1;

    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    document.getElementById('month-year').innerHTML = `${months[date.getMonth()]} ${date.getFullYear()}`;

    let days = "";

    for (let x = firstDayIndex; x > 0; x--) {
      days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDay; i++) {
      if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
        days += `<div class="today"><Link to="/calendar/${date.getFullYear()}-${date.getMonth() + 1}-${i}">${i}</Link></div>`;
      } else {
        days += `<div><Link to="/calendar/${date.getFullYear()}-${date.getMonth() + 1}-${i}">${i}</Link></div>`;
      }
    }

    for (let j = 1; j <= nextDays; j++) {
      days += `<div class="next-date">${j}</div>`;
      monthDays.innerHTML = days;
    }
  };

  return (
    <div className="calendar">
      <div id="month-year"></div>
      <div className="days"></div>
      <button id="prev" onClick={() => setDate(new Date(date.setMonth(date.getMonth() - 1)))}>Prev</button>
      <button id="next" onClick={() => setDate(new Date(date.setMonth(date.getMonth() + 1)))}>Next</button>
    </div>
  );
};

export default Calendar;
