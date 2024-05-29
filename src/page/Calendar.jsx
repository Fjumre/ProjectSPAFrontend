import React, { useState } from 'react';
import styled from 'styled-components';
import CreateForm from './CreateForm';  
import '../landscaping.css'; 


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const CalendarWrapper = styled.div`
  width: 375px;
  border: 1px solid #330303;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fafafa;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #007bff;
  color: #3811d6;
`;

const CalendarBody = styled.div`
  padding: 10px;
`;

const DayNames = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: #1815df;
`;

const Days = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: #1815df;
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
  color: #082cbc;
  border-radius: 50%;
`;

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateClick = (year, month, day) => {
    setSelectedDate(new Date(year, month, day));
  };

  const renderCalendar = () => {
    const firstDayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
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
      const isToday = i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear();
      const isSelected = i === selectedDate.getDate() && date.getMonth() === selectedDate.getMonth() && date.getFullYear() === selectedDate.getFullYear();

      if (isToday) {
        daysArray.push(
          <Today key={i} onClick={() => handleDateClick(date.getFullYear(), date.getMonth(), i)}>
            {i}
          </Today>
        );
      } else if (isSelected) {
        daysArray.push(
          <DayBox key={i} style={{ backgroundColor: '#c0c0c0' }} onClick={() => handleDateClick(date.getFullYear(), date.getMonth(), i)}>
            {i}
          </DayBox>
        );
      } else {
        daysArray.push(
          <DayBox key={i} onClick={() => handleDateClick(date.getFullYear(), date.getMonth(), i)}>
            {i}
          </DayBox>
        );
      }
    }

    for (let j = 1; j <= nextDays; j++) {
      daysArray.push(<DayBox key={`next-${j}`} className="next-date">{j}</DayBox>);
    }

    return daysArray;
  };

  return (
    <div className='backgroundcalendar'>
    <Container>
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
      <CreateForm selectedDate={selectedDate} /> 
    </Container>
    </div>
  );
};

export default Calendar;
