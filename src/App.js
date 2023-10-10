import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import WeeklyReport from './components/WeeklyReport';
import Header from './components/Header';
import './App.css';
import Grid from '@mui/material/Grid';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem('habits');
    if (savedHabits) {
      return JSON.parse(savedHabits);
    } else {
      return {
        Cycling: false,
        Gym: false,
        Book: false,
        Alcohol: false,
      };
    }
  });

  const [habitsByDate, setHabitsByDate] = useState(() => {
    const savedHabitsByDate = localStorage.getItem('habitsByDate');
    if (savedHabitsByDate) {
      return JSON.parse(savedHabitsByDate);
    } else {
      return {};
    }
  });


  const handleCheckboxChange = (habitName) => {
    setHabitsByDate((prevHabitsByDate) => {
      const updatedHabitsByDate = { ...prevHabitsByDate };
      const dateKey = currentDate.toDateString();

      if (!updatedHabitsByDate[dateKey]) {
        updatedHabitsByDate[dateKey] = { ...habits };
      }

      updatedHabitsByDate[dateKey][habitName] = !updatedHabitsByDate[dateKey][habitName];

      return updatedHabitsByDate;
    });
  };

  return (
    <Grid container spacing={2} style={{
      height: '100vh',
      margin: '0px',
      padding: '45px 70px 70px 70px',
      width: 'auto',
      background: '#1A202C'
    }}>
      <Grid xs={9} style={{ background: '#1A202C' }}>
        <Header />
        <WeeklyReport
          currentDate={currentDate}
          habits={habits}
          habitsByDate={habitsByDate}
          setCurrentDate={setCurrentDate}
          handleCheckboxChange={handleCheckboxChange}
          setHabits={setHabits}
        />
      </Grid>
      <Sidebar
        currentDate={currentDate}
        habits={habits}
        habitsByDate={habitsByDate}
        setCurrentDate={setCurrentDate}
        handleCheckboxChange={handleCheckboxChange}
        setHabits={setHabits}
      />
    </Grid>
  );
}

export default App;
