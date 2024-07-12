import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import CheckIcon from '@mui/icons-material/Check';
import dayjs from 'dayjs';
import EventList from './EventList'; // Assume you have this component

const Calendar = () => {
  const [value, setValue] = useState(dayjs());
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [events] = useState([
    { date: '2024-07-01', title: 'Event 1', description: 'Description of Event 1' },
    { date: '2024-07-02', title: 'Event 2', description: 'Description of Event 2' },
    { date: '2024-07-07', title: 'Event 3', description: 'Description of Event 3' },
    { date: '2024-07-13', title: 'Event 4', description: 'Description of Event 4' },
  ]);

  const isFutureDay = (day) => dayjs(day).isAfter(dayjs(), 'day');
  const isEventDay = (day) => events.some(event => dayjs(event.date).isSame(dayjs(day), 'day'));

  const handleDateClick = (day) => {
    const filteredEvents = events.filter(event => dayjs(event.date).isSame(dayjs(day), 'day'));
    setSelectedEvents(filteredEvents);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div style={{ display: 'flex' }}>
        <StaticDatePicker
          variant='static'
          orientation='portrait'
          value={value}
          onChange={(newValue) => setValue(newValue)}
          renderInput={(params) => <TextField {...params} />}
          renderDay={(day, _value, DayComponentProps) => {
            const isOutsideCurrentMonth = DayComponentProps.outsideCurrentMonth;
            const isSelected = isEventDay(day);
            const isDisabled = isFutureDay(day) || isOutsideCurrentMonth;

            return (
              <Badge
                key={day.toString()}
                overlap='circular'
                badgeContent={isSelected ? <CheckIcon color='red' /> : undefined}
              >
                <PickersDay
                  {...DayComponentProps}
                  disabled={isDisabled}
                  onClick={() => handleDateClick(day)}
                  className={isSelected ? 'MuiPickersDay-highlighted' : ''}
                />
              </Badge>
            );
          }}
        />
        <EventList events={selectedEvents} />
      </div>
    </LocalizationProvider>
  );
};

export default Calendar;
