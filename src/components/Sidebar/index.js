import React, { useEffect } from 'react';
import {
  Grid,
  FormControl,
  Typography,
  IconButton,
  Checkbox,
  Divider,
  FormGroup,
  FormControlLabel,
  Box,
  ButtonGroup
} from '@mui/material';
import './style.css'
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';

function Sidebar({
  currentDate, habits, habitsByDate, setCurrentDate, handleCheckboxChange, setHabits
}) {

  const handlePrevDate = () => {
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);
    setCurrentDate(prevDate);
  };

  const handleNextDate = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    setCurrentDate(nextDate);
  };

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'long',
  };

  const formattedDate = currentDate.toLocaleString('en-US', options);
  const isForwardButtonDisabled = currentDate.toDateString() === new Date().toDateString();

  useEffect(() => {
    const savedHabits = localStorage.getItem('habits');
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
  }, [setHabits]);


  useEffect(() => {
    localStorage.setItem('habitsByDate', JSON.stringify(habitsByDate));
  }, [habitsByDate]);


  return (
    <Grid xs={3} style={{
      background: 'rgb(26, 32, 44)',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      padding: '40px 0'
    }}>
      <Box style={{ width: '88%', display: 'flex', marginBottom: '18px', justifyContent: 'space-between' }}>
        <Typography style={{ color: 'white', fontSize: '115%', lineHeight: '2' }}>{formattedDate}</Typography>
        <ButtonGroup>
          <IconButton aria-label="Previous-Date" size="medium" onClick={handlePrevDate}>
            <ExpandCircleDownOutlinedIcon style={{ rotate: '90deg' }} />
          </IconButton>
          <IconButton aria-label="Forward-Date" size="medium" onClick={handleNextDate} disabled={isForwardButtonDisabled}>
            <ExpandCircleDownOutlinedIcon style={{ rotate: '270deg' }} />
          </IconButton>
        </ButtonGroup>
      </Box>
      <Divider variant="middle" style={{ width: '88%', borderColor: '#2e3b53' }} />
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormGroup sx={{ gap: 4 }}>
          {Object.entries(habits).map(([habitName, isChecked]) => (
            <FormControlLabel
              key={habitName}
              className='habitItem'
              value={habitName}
              control={<Checkbox checked={habitsByDate[currentDate.toDateString()]?.[habitName] || false} onChange={() => handleCheckboxChange(habitName)} iconStyle={{ fill: 'white' }} />}
              label={habitName}
              labelPlacement="start"
            />
          ))}
        </FormGroup>
      </FormControl>
    </Grid>
  );
}

export default Sidebar;
