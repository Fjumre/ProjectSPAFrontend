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
  const [days, setDays] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    renderCalendar();
  }, [date]);

  const renderCalendar = () => {
    date.setDate(1);

    const monthDays = [];
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const firstDayIndex = date.getDay();
    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    const nextDays = 7 - lastDayIndex - 1;

    const months = [
      "January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"
    ];

    document.getElementById('month-year').innerHTML = `${months[date.getMonth()]} ${date.getFullYear()}`;

    for (let x = firstDayIndex; x > 0; x--) {
      monthDays.push(<DayBox className="prev-date" key={`prev-${x}`}>{prevLastDay - x + 1}</DayBox>);
    }

    for (let i = 1; i <= lastDay; i++) {
      const isToday = i === new Date().getDate() && date.getMonth() === new Date().getMonth();
      monthDays.push(
        <DayBox
          key={i}
          className={isToday ? 'today' : ''}
          onClick={() => handleDayClick(date.getFullYear(), date.getMonth() + 1, i)}
        >
          {i}
        </DayBox>
      );
    }

    for (let j = 1; j <= nextDays; j++) {
      monthDays.push(<DayBox className="next-date" key={`next-${j}`}>{j}</DayBox>);
    }

    setDays(monthDays);
  };

  const handleDayClick = (year, month, day) => {
    navigate(`/calender/${year}-${month}-${day}`);
  };

  const handlePrevClick = () => {
    setDate(new Date(date.setMonth(date.getMonth() - 1)));
  };

  const handleNextClick = () => {
    setDate(new Date(date.setMonth(date.getMonth() + 1)));
  };

  return (
    <CalendarWrapper>
      <CalendarHeader>
        <button onClick={handlePrevClick}>&lt;</button>
        <div id="month-year"></div>
        <button onClick={handleNextClick}>&gt;</button>
      </CalendarHeader>
      <CalendarBody>
        <DayNames>
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </DayNames>
        <Days>{days}</Days>
      </CalendarBody>
    </CalendarWrapper>
  );
};

export default Calendar;
