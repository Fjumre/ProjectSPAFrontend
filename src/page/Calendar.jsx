import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

  const renderCalendar = () => {
    const firstDayIndex = date.getDay();
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    const nextDays = 7 - lastDayIndex - 1;

    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const daysArray = [];

    for (let x = firstDayIndex; x > 0; x--) {
      daysArray.push(<DayBox key={`prev-${x}`} className="prev-date">{prevLastDay - x + 1}</DayBox>);
    }

    for (let i = 1; i <= lastDay; i++) {
      if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
        daysArray.push(<Today key={i}><Link to={`/calendar/${date.getFullYear()}-${date.getMonth() + 1}-${i}`}>{i}</Link></Today>);
      } else {
        daysArray.push(<DayBox key={i}><Link to={`/calendar/${date.getFullYear()}-${date.getMonth() + 1}-${i}`}>{i}</Link></DayBox>);
      }
    }

    for (let j = 1; j <= nextDays; j++) {
      daysArray.push(<DayBox key={`next-${j}`} className="next-date">{j}</DayBox>);
    }

    return daysArray;
  };

  return (
    <CalendarWrapper>
      <CalendarHeader>
        <button onClick={() => setDate(new Date(date.setMonth(date.getMonth() - 1)))}>Prev</button>
        <div id="month-year">{`${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`}</div>
        <button onClick={() => setDate(new Date(date.setMonth(date.getMonth() + 1)))}>Next</button>
      </CalendarHeader>
      <CalendarBody>
        <DayNames>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <DayBox key={day}>{day}</DayBox>
          ))}
        </DayNames>
        <Days className="days">
          {renderCalendar()}
        </Days>
      </CalendarBody>
    </CalendarWrapper>
  );
};

export default Calendar;
