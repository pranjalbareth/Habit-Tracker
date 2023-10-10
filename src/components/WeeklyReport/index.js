import React from 'react';
import {
  Grid,
  Typography,
  IconButton,
  Box,
  ButtonGroup,
  Divider,
} from '@mui/material';
import './style.css';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';


function WeeklyReport({ habits, habitsByDate }) {
  const [currentDate, setCurrentDate] = React.useState(new Date());


  const getWeekDates = (date) => {
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const weekDates = [];
    let currentDate = new Date(weekStart);

    while (currentDate <= weekEnd) {
      weekDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return weekDates;
  };

  const handlePrevDate = () => {
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 7);
    setCurrentDate(prevDate);
  };

  const handleNextDate = () => {
    const nextDate = new Date(currentDate);
    const today = new Date();
    if (nextDate < today) {
      nextDate.setDate(nextDate.getDate() + 7);
      setCurrentDate(nextDate);
    }
  };

  const weekDates = getWeekDates(currentDate);
  const lastDayOfCurrentWeek = getWeekDates(new Date());
  const isForwardButtonDisabled = weekDates[6].getDate() === lastDayOfCurrentWeek[6].getDate();

  return (
    <Grid
      xs={9}
      style={{
        background: 'rgb(26, 32, 44)',
        maxWidth: '100%',
        height: '65%',
        padding: '0 35px',
      }}
    >
      <Box
        style={{
          width: '80%',
          display: 'flex',
          gap: '15px',
        }}
      >
        <Typography
          style={{
            color: 'white',
            fontSize: '185%',
            lineHeight: '2',
            fontWeight: '600',
          }}
        >
          {`${weekDates[0].toLocaleString('en-US', {
            month: 'short',
          })} ${weekDates[0].getDate()} to ${weekDates[6].toLocaleString('en-US', {
            month: 'short',
          })} ${weekDates[6].getDate()}`}
        </Typography>
        <ButtonGroup>
          <IconButton
            aria-label="Previous-Date"
            size="medium"
            onClick={handlePrevDate}
          >
            <ExpandCircleDownOutlinedIcon
              style={{ transform: 'rotate(90deg)', fontSize: '160%' }}
            />
          </IconButton>
          <IconButton
            aria-label="Forward-Date"
            size="medium"
            onClick={handleNextDate}
            disabled={isForwardButtonDisabled}
          >
            <ExpandCircleDownOutlinedIcon
              style={{ transform: 'rotate(270deg)', fontSize: '160%' }}
            />
          </IconButton>
        </ButtonGroup>
      </Box>
      <Divider
        variant="middle"
        style={{ width: '100%', borderColor: '#2e3b53', margin: '20px 0' }}
      />
      <div
        style={{
          padding: '20px 0px',
          justifyContent: 'center',
          color: 'white',
          gap: '70px',
          display: 'flex',
          width: '45rem',
          marginLeft: '120px'
        }}
      >
        <ul style={{
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          padding: '0px',
          marginTop: '60px'
        }}>
          {Object.entries(habits).map(([habitName, isChecked]) => (
            <li
              style={{
                background: '#2d3748',
                padding: '10px 36px',
                borderRadius: '8px'
              }}
            >{habitName}</li>
          ))}
        </ul>
        {weekDates.map((date) => (
          <div key={date.getTime()} xs={2}>
            <Typography variant="h6" style={{ marginBottom: '30px' }}>
              {date.toLocaleString('en-US', { weekday: 'short' })}
            </Typography>
            <ul style={{
              listStyle: 'none',
              padding: '0px',
              gap: '34px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {Object.keys(habits).map((habitName) => (
                <li
                  key={habitName}
                  style={{
                    height: '25px',
                    width: '25px',
                    background: `${habitsByDate[date.toDateString()]?.[habitName] ? '#2E75DE' : '#2D3748'}`,
                    borderRadius: '6px',
                    gap: '34px'
                  }}
                >
                </li>
              )
              )}
            </ul>
          </div>
        ))}
        <ul style={{
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          padding: '0px',
          marginTop: '50px'
        }}>
          {Object.entries(habits).map(([habitName, isChecked]) => (
            <li
              style={{
                padding: '10px 0',
                borderRadius: '8px'
              }}
            >{weekDates.reduce((count, date) => {
              return count + (habitsByDate[date.toDateString()]?.[habitName] ? 1 : 0);
            }, 0)}/{weekDates.length}</li>
          ))}
        </ul>
      </div>
    </Grid >
  );
}

export default WeeklyReport;
